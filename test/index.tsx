import Cascade, { Component } from 'cascade';

import Round from '../src/Round';
import Score from '../src/Sheet';

import Program from './Program';
import View from './View';

window.onload = () => {
    console.log('started');

    let program = new Program();
    (window as any)['program'] = program;

    Cascade.render('root', <View program={program} />);
}


