import { PlacementError } from './PlacementError';

export default class Sheet {
    competitorId: number | string | undefined;
    scores: number[];
    counts: number[] = [];
    total!: number;
    rank!: number;

    constructor(
        scores: number[] = [],
        competitorId?: number | string
    ) {
        this.scores = scores;
        this.competitorId = competitorId;
    }

    getTotal() {
        let total = 0;
        for (let score of this.scores) {
            total += score;
        }
        return total;
    }

    getCount(score: number) {
        let count = 0;
        for (let value of this.scores) {
            if (value <= score) {
                count++;
            }
        }
        return count;
    }

    getCounts() {
        let counts = [];
        for (let score = 1, length = this.scores.length + 1; score < length; score++) {
            counts.push(this.getCount(score));
        }
        return counts;
    }

    init() {
        this.counts = this.getCounts();
        this.total = this.getTotal();
    }

    static compare(a: Sheet, b: Sheet) {
        if (a.scores.length !== b.scores.length) {
            throw new Error(PlacementError.ScoreCountMismatch);
        }

        let majority = Math.ceil(a.scores.length / 2);

        for (let index = 0, length = a.counts.length; index < length; index++) {
            let countA = a.counts[index];
            let countB = b.counts[index];

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
                    } else if (a.total < b.total) {
                        // Does A have a smaller total

                        return -1;
                    } else if (a.total > b.total) {
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