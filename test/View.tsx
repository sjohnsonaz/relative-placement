import Cascade, { Component } from 'cascade';

import Program from './Program';
import RoundView from './RoundView';

export interface IViewProps {
    program: Program;
}

export default class View extends Component<IViewProps> {
    render() {
        let {
            program
        } = this.props;
        return (
            <div>
                <h2>Prelims</h2>
                <RoundView round={program.prelims} />

                <h2>Finals</h2>
                <RoundView round={program.finals} />
            </div>
        );
    }
}