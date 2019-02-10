import Cascade, { Component } from 'cascade';

import Round from "../src/Round";

export interface IRoundViewProps {
    round: Round;
}

export default class RoundView extends Component<IRoundViewProps> {
    render() {
        let {
            round
        } = this.props;

        let judgeCount = 0;
        if (round.sheets[0] && round.sheets[0].scores) {
            judgeCount = round.sheets[0].scores.length;
        }

        return (
            <table className='round-view'>
                <thead>
                    <th>Rank</th>
                    <th>Competitor</th>
                    {(() => {
                        let headers = [];
                        for (let index = 0; index < judgeCount; index++) {
                            headers.push(<th>Judge {index + 1}</th>);
                        }
                        return headers;
                    })()}
                    <th></th>
                    {(() => {
                        let headers = [];
                        for (let index = 0; index < judgeCount; index++) {
                            headers.push(<th>1 - {index + 1}</th>);
                        }
                        return headers;
                    })()}
                    <th>Total</th>
                </thead>
                <tbody>
                    {round.sheets.map((sheet, index) => (
                        <tr>
                            <th>{index + 1}</th>
                            <th>{sheet.competitorId}</th>
                            {sheet.scores.map(score => <td>{score}</td>)}
                            <td></td>
                            {sheet.counts.map(count => <td>{count}</td>)}
                            <td>{sheet.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}