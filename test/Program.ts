import Round from "../src/Round";
import Sheet from "../src/Sheet";

export default class Program {
    prelims: Round;
    finals: Round;

    constructor() {
        this.prelims = new Round([
            new Sheet([3, 3, 3], 0),
            new Sheet([3, 1, 2], 1),
            new Sheet([3, 1, 1], 2),
            new Sheet([1, 1, 1], 3),
            new Sheet([3, 2, 2], 4)
        ]);
        this.prelims.sort();

        this.finals = new Round([
            new Sheet([5, 1, 4, 1, 4], 0),
            new Sheet([2, 4, 1, 5, 3], 1),
            new Sheet([3, 2, 5, 4, 1], 2),
            new Sheet([4, 3, 3, 3, 2], 3),
            new Sheet([1, 5, 2, 2, 5], 4)
        ]);
        this.finals.sort();
    }
}