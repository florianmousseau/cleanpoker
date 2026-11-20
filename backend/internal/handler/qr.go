package handler

import (
	"net/http"
	"regexp"
	"strings"

	qrcode "github.com/skip2/go-qrcode"
)

var roomPath = regexp.MustCompile(`^/[A-Za-z0-9_-]{1,64}$`)

// qrRows encodes the address of a room as QR modules, one string of 0 and 1
// per row, with no quiet zone: the page draws it, so no image is fetched from
// another origin and the content security policy stays as it is. Only a room
// address on one of the site's own origins is encoded.
func qrRows(allowed map[string]bool, target string) ([]string, bool) {
	i := strings.Index(target, "://")
	if i < 0 {
		return nil, false
	}
	slash := strings.IndexByte(target[i+3:], '/')
	if slash < 0 {
		return nil, false
	}
	origin, path := target[:i+3+slash], target[i+3+slash:]
	if !allowed[origin] || !roomPath.MatchString(path) {
		return nil, false
	}
	code, err := qrcode.New(target, qrcode.Medium)
	if err != nil {
		return nil, false
	}
	code.DisableBorder = true
	bitmap := code.Bitmap()
	rows := make([]string, len(bitmap))
	for y, line := range bitmap {
		var b strings.Builder
		for _, dark := range line {
			if dark {
				b.WriteByte('1')
			} else {
				b.WriteByte('0')
			}
		}
		rows[y] = b.String()
	}
	return rows, true
}

func qrHandler(allowed map[string]bool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, ok := qrRows(allowed, r.URL.Query().Get("url"))
		if !ok {
			http.Error(w, "url must be a room address of this site", http.StatusBadRequest)
			return
		}
		w.Header().Set("Cache-Control", "public, max-age=86400")
		writeJSON(w, map[string][]string{"rows": rows})
	}
}
