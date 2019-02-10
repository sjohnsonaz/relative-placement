import Sheet from './Sheet';

export default class Round {
    sheets: Sheet[];

    constructor(sheets: Sheet[] = []) {
        this.sheets = sheets;
    }

    sort(places?: number) {
        if (!places) {
            places = this.sheets.length;
        }
        for (let sheet of this.sheets) {
            sheet.init(places);
        }
        this.sheets.sort(Sheet.compare);
    }
}