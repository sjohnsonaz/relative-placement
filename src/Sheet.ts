import { PlacementError } from './PlacementError';

export default class Sheet {
    competitorId: number | string | undefined;
    scores: number[];
    counts: number[] = [];
    totals: number[] = [];
    rank!: number;

    constructor(
        scores: number[] = [],
        competitorId?: number | string
    ) {
        this.scores = scores;
        this.competitorId = competitorId;
    }

    getTotal(places: number) {
        let totals = [];
        for (let score = 1; score <= places; score++) {
            let total = 0;
            for (let value of this.scores) {
                if (value <= score) {
                    total += score;
                }
            }
            totals.push(total);
        }
        return totals;
    }

    getCounts(places: number) {
        let counts = [];
        for (let score = 1; score <= places; score++) {
            let count = 0;
            for (let value of this.scores) {
                if (value <= score) {
                    count++;
                }
            }
            counts.push(count);
        }
        return counts;
    }

    init(places: number) {
        this.counts = this.getCounts(places);
        this.totals = this.getTotal(places);
    }

    static compare(a: Sheet, b: Sheet) {
        if (a.scores.length !== b.scores.length) {
            throw new Error(PlacementError.ScoreCountMismatch);
        }

        let majority = Math.ceil(a.scores.length / 2);

        for (let index = 0, length = a.counts.length; index < length; index++) {
            let countA = a.counts[index];
            let countB = b.counts[index];
            let totalA = a.totals[index];
            let totalB = b.totals[index];

            if (countA >= majority) {
                // Does A have majority

                if (countB >= majority) {
                    // Do both have majority

                    if (countA > countB) {
                        // Does A have a bigger count

                        return -1;
                    } else if (countA < countB) {
                        // Does B have a bigger count

                        return 1;
                    } else if (totalA < totalB) {
                        // Does A have a smaller total

                        return -1;
                    } else if (totalA > totalB) {
                        // Does B have a smaller total

                        return 1;
                    } else {
                        // Run a per judge comparison

                        let judges = 0;
                        for (let scoreIndex = 0, scoreLength = a.scores.length; scoreIndex < scoreLength; scoreIndex++) {
                            let scoreA = a.scores[scoreIndex];
                            let scoreB = b.scores[scoreIndex];
                            if (scoreA < scoreB) {
                                // Does A have a better score

                                judges--;
                            } else if (scoreA > scoreB) {
                                // Does B have a better score

                                judges++;
                            }
                        }
                        return judges;
                    }
                    // If they are equal, iterate again
                } else {
                    return -1;
                }
            } else if (countB >= majority) {
                // Does B have majority
                return 1;
            }
        }
        return 0;
    }
}