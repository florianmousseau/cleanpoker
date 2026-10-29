package room

import (
	"fmt"
	"math"
	"strconv"
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

	fmtNum := func(f float64) string {
		if f == float64(int(f)) {
			return fmt.Sprintf("%d", int(f))
		}
		return fmt.Sprintf("%.1f", f)
	}

	return Results{
		Avg:  fmtNum(avg),
		Mode: mode,
		Min:  fmtNum(min),
		Max:  fmtNum(max),
		Dist: dist,
	}
}
