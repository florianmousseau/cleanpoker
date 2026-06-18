package room

import (
	"fmt"
	"strconv"
)

// computeResults calcule avg, mode, min, max sur les votes numériques.
// Les votes non numériques ("?", "XS"...) sont ignorés dans avg/min/max mais comptés dans mode/dist.
func computeResults(votes map[string]string, cards []string) Results {
	dist := map[string]int{}
	var nums []float64

	for _, v := range votes {
		dist[v]++
		if n, err := strconv.ParseFloat(v, 64); err == nil {
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
		return Results{Avg: "—", Mode: mode, Min: "—", Max: "—", Dist: dist}
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
