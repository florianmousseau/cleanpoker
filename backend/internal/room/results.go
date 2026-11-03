package room

import (
	"math"
	"strconv"
	"strings"
)

// maxNumericVote bounds what counts as a number. ParseFloat also accepts NaN,
// Inf and 1e308: one NaN card poisons the average, two 1e308 votes overflow
// the sum, and both would be shown as an estimate.
const maxNumericVote = 1e6

// numericVote reads a vote as a number, or reports that it is a label.
func numericVote(v string) (float64, bool) {
	n, err := strconv.ParseFloat(v, 64)
	if err != nil || math.IsNaN(n) || math.Abs(n) > maxNumericVote {
		return 0, false
	}
	return n, true
}

// computeResults calcule avg, mode, min, max sur les votes numériques.
// Les votes non numériques ("?", "XS"...) sont ignorés dans avg/min/max mais comptés dans mode/dist.
// votes est une liste et non une table indexée par joueur : deux participants
// peuvent porter le même nom, et leurs deux voix doivent compter.
func computeResults(votes []string, cards []string) Results {
	dist := map[string]int{}
	var nums []float64

	for _, v := range votes {
		dist[v]++
		if n, ok := numericVote(v); ok {
			nums = append(nums, n)
		}
	}

	// Mode = valeur la plus fréquente (selon l'ordre des cartes)
	mode := ""
	maxCount := 0
	for _, card := range cards {
		if c, ok := dist[card]; ok && c > maxCount {
			maxCount = c
			mode = card
		}
	}

	if len(nums) == 0 {
		return Results{Avg: "N/A", Mode: mode, Min: "N/A", Max: "N/A", Dist: dist}
	}

	sum, min, max := 0.0, nums[0], nums[0]
	for _, n := range nums {
		sum += n
		if n < min {
			min = n
		}
		if n > max {
			max = n
		}
	}
	avg := sum / float64(len(nums))

	return Results{
		Avg:  formatAverage(avg, nums),
		Mode: mode,
		Min:  exactNumber(min),
		Max:  exactNumber(max),
		Dist: dist,
	}
}

// exactNumber writes a card value as it was voted: 0.01 stays 0.01.
func exactNumber(f float64) string {
	return strconv.FormatFloat(f, 'f', -1, 64)
}

// decimalsOf counts the decimals a vote was written with.
func decimalsOf(f float64) int {
	s := exactNumber(f)
	if i := strings.IndexByte(s, '.'); i >= 0 {
		return len(s) - i - 1
	}
	return 0
}

// formatAverage rounds the average to one decimal, or to the finest decimal a
// vote carries: two votes of 0.01 and 0.04 must not average to 0.0.
func formatAverage(avg float64, nums []float64) string {
	decimals := 1
	for _, n := range nums {
		decimals = max(decimals, decimalsOf(n))
	}
	if avg == math.Trunc(avg) {
		return exactNumber(avg)
	}
	s := strconv.FormatFloat(avg, 'f', decimals, 64)
	if strings.Contains(s, ".") {
		s = strings.TrimRight(strings.TrimRight(s, "0"), ".")
	}
	return s
}
