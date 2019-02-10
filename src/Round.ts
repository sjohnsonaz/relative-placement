import Sheet from './Sheet';

export default class Round {
    sheets: Sheet[];

    constructor(sheets: Sheet[] = []) {
        this.sheets = sheets;
    }

    sort() {
        for (let sheet of this.sheets) {
            sheet.init();
        }
        this.sheets.sort(Sheet.compare);
    }
}