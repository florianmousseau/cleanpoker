package health

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

var t0 = time.Date(2026, 10, 7, 20, 0, 0, 0, time.UTC)

func checker(commit string, head Head, headErr error) *Checker {
	return &Checker{
		Walk:   func(context.Context) error { return nil },
		Head:   func(context.Context) (Head, error) { return head, headErr },
		Commit: commit,
		Since:  t0,
		Now:    func() time.Time { return t0 },
	}
}

func constat(r Report, nom string) Constat {
	for _, c := range r.Constats {
		if c.Nom == nom {
			return c
		}
	}
	return Constat{}
}

func TestDeploy_UpToDateIsGreen(t *testing.T) {
	r := checker("70044cc3595fed36", Head{SHA: "70044cc3595fed36e17a1581", Date: t0.Add(-72 * time.Hour)}, nil).Report(context.Background())
	if r.Alerte != OK || r.Deploye.Juge != "a jour" || !r.Deploye.Retard.Mesure {
		t.Fatalf("expected green and up to date, got %+v", r)
	}
}

// The lesbancs defect of 2026-10-07: four merged pull requests, never
// deployed, and nothing said so.
func TestDeploy_BehindMainForADayIsAttention(t *testing.T) {
	r := checker("ac104d1", Head{SHA: "70044cc3595fed36", Date: t0.Add(-25 * time.Hour)}, nil).Report(context.Background())
	c := constat(r, "deploiement")
	if r.Alerte != Attention || c.Niveau != Attention || r.Deploye.Juge != "en retard" {
		t.Fatalf("expected attention for a build a day behind main, got %+v", r)
	}
	if !strings.Contains(c.Detail, "ac104d1") || !strings.Contains(c.Detail, "70044cc") {
		t.Fatalf("expected both commits named, got %q", c.Detail)
	}
}

func TestDeploy_BehindMainForAnHourIsADeployUnderway(t *testing.T) {
	r := checker("ac104d1", Head{SHA: "70044cc3595fed36", Date: t0.Add(-time.Hour)}, nil).Report(context.Background())
	if r.Alerte != OK || r.Deploye.Juge != "en retard" {
		t.Fatalf("expected green while a deploy can still be running, got %+v", r)
	}
}

func TestDeploy_UnreadableHeadIsAFindingWithItsReason(t *testing.T) {
	r := checker("ac104d1", Head{}, errors.New("HTTP 429 : feed")).Report(context.Background())
	if r.Alerte != Attention || r.Deploye.Juge != "non juge" {
		t.Fatalf("expected attention and not judged, got %+v", r)
	}
	if len(r.Echecs) != 1 || !strings.Contains(r.Echecs[0], "HTTP 429") {
		t.Fatalf("expected the reason to travel, got %v", r.Echecs)
	}
}

func TestDeploy_UnknownCommitIsAttention(t *testing.T) {
	r := checker("inconnu", Head{SHA: "70044cc3595fed36", Date: t0}, nil).Report(context.Background())
	if r.Alerte != Attention || !strings.Contains(constat(r, "deploiement").Detail, "COMMIT") {
		t.Fatalf("expected attention naming the missing build argument, got %+v", r)
	}
}

func TestWalk_FailureIsRedWithItsReason(t *testing.T) {
	c := checker("70044cc", Head{SHA: "70044cc", Date: t0}, nil)
	c.Walk = func(context.Context) error { return errors.New("creation de salle : HTTP 503") }
	r := c.Report(context.Background())
	if r.Alerte != Rouge || len(r.Echecs) != 1 || r.Echecs[0] != "creation de salle : HTTP 503" {
		t.Fatalf("expected red with the reason, got %+v", r)
	}
}

func TestWalk_IsReusedForThirtySecondsAndNoLonger(t *testing.T) {
	now := t0
	calls := 0
	c := checker("70044cc", Head{SHA: "70044cc", Date: t0}, nil)
	c.Now = func() time.Time { return now }
	c.Walk = func(context.Context) error { calls++; return nil }
	c.Report(context.Background())
	now = now.Add(WalkMemo - time.Second)
	c.Report(context.Background())
	if calls != 1 {
		t.Fatalf("expected one walk inside the memo, got %d", calls)
	}
	now = now.Add(2 * time.Second)
	c.Report(context.Background())
	if calls != 2 {
		t.Fatalf("expected a new walk once the memo is over, got %d", calls)
	}
	if WalkMemo > 5*time.Minute {
		t.Fatal("a walk may not be reused for more than five minutes")
	}
}

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <id>tag:github.com,2008:Grit::Commit/70044cc3595fed36e17a158128abc53c012d5daa</id>
    <updated>2026-10-02T20:48:58Z</updated>
  </entry>
  <entry>
    <id>tag:github.com,2008:Grit::Commit/25396928a678b546008164b0fe813eb6f1fc70c3</id>
    <updated>2026-10-02T20:45:35Z</updated>
  </entry>
</feed>`

func serve(status int, body string) *httptest.Server {
	return httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(status)
		_, _ = w.Write([]byte(body)) // the client side is what is under test
	}))
}

func TestFeedHead_ReadsTheNewestCommit(t *testing.T) {
	srv := serve(http.StatusOK, feed)
	defer srv.Close()
	head, err := FeedHead(srv.URL, srv.Client())(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if head.SHA != "70044cc3595fed36e17a158128abc53c012d5daa" || !head.Date.Equal(time.Date(2026, 10, 2, 20, 48, 58, 0, time.UTC)) {
		t.Fatalf("unexpected head %+v", head)
	}
}

func TestFeedHead_RefusesWhatItCannotRead(t *testing.T) {
	cases := map[string]struct {
		status int
		body   string
		want   string
	}{
		"rate limited": {http.StatusTooManyRequests, "", "HTTP 429"},
		"not a feed":   {http.StatusOK, "<html>", "illisible"},
		"empty feed":   {http.StatusOK, `<feed xmlns="http://www.w3.org/2005/Atom"></feed>`, "aucun commit"},
		"foreign id":   {http.StatusOK, `<feed xmlns="http://www.w3.org/2005/Atom"><entry><id>x</id><updated>2026-10-02T20:48:58Z</updated></entry></feed>`, "inattendu"},
		"bad date":     {http.StatusOK, `<feed xmlns="http://www.w3.org/2005/Atom"><entry><id>tag:github.com,2008:Grit::Commit/70044cc3595f</id><updated>hier</updated></entry></feed>`, "date"},
	}
	for name, tc := range cases {
		t.Run(name, func(t *testing.T) {
			srv := serve(tc.status, tc.body)
			defer srv.Close()
			_, err := FeedHead(srv.URL, srv.Client())(context.Background())
			if err == nil || !strings.Contains(err.Error(), tc.want) {
				t.Fatalf("expected an error containing %q, got %v", tc.want, err)
			}
		})
	}
}

func TestHead_IsAskedOnceEveryTenMinutes(t *testing.T) {
	now := t0
	calls := 0
	c := checker("70044cc", Head{}, nil)
	c.Now = func() time.Time { return now }
	c.Head = func(context.Context) (Head, error) { calls++; return Head{SHA: "70044cc", Date: t0}, nil }
	c.Report(context.Background())
	now = now.Add(HeadMemo - time.Second)
	c.Report(context.Background())
	now = now.Add(2 * time.Second)
	c.Report(context.Background())
	if calls != 2 {
		t.Fatalf("expected two reads of main, got %d", calls)
	}
}
