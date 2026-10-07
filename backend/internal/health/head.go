package health

import (
	"context"
	"encoding/xml"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"
)

// MainFeed is the public Atom feed of main. The repository is public, so the
// head is read without a token and outside the API's hourly quota.
const MainFeed = "https://github.com/florianmousseau/cleanpoker/commits/main.atom"

const commitIDPrefix = "tag:github.com,2008:Grit::Commit/"

type atomFeed struct {
	Entries []struct {
		ID      string `xml:"id"`
		Updated string `xml:"updated"`
	} `xml:"entry"`
}

// FeedHead reads the newest commit of the feed at url.
func FeedHead(url string, client *http.Client) func(ctx context.Context) (Head, error) {
	return func(ctx context.Context) (Head, error) {
		ctx, cancel := context.WithTimeout(ctx, walkTimeout)
		defer cancel()
		req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
		if err != nil {
			return Head{}, err
		}
		resp, err := client.Do(req)
		if err != nil {
			return Head{}, err
		}
		defer func() { _ = resp.Body.Close() }()
		if resp.StatusCode != http.StatusOK {
			return Head{}, fmt.Errorf("HTTP %d : %s", resp.StatusCode, url)
		}
		var feed atomFeed
		if err := xml.NewDecoder(resp.Body).Decode(&feed); err != nil {
			return Head{}, fmt.Errorf("flux illisible : %w", err)
		}
		return headOf(feed)
	}
}

func headOf(feed atomFeed) (Head, error) {
	if len(feed.Entries) == 0 {
		return Head{}, errors.New("flux sans aucun commit")
	}
	first := feed.Entries[0]
	sha := strings.TrimPrefix(first.ID, commitIDPrefix)
	if sha == first.ID || len(sha) < 7 {
		return Head{}, fmt.Errorf("identifiant de commit inattendu %q", first.ID)
	}
	date, err := time.Parse(time.RFC3339, first.Updated)
	if err != nil {
		return Head{}, fmt.Errorf("date de commit illisible %q", first.Updated)
	}
	return Head{SHA: sha, Date: date}, nil
}
