
import * as OptionButtonToggle from './option';

class DeadExt {
    b: OptionButtonToggle.OptionButtonToggle;
    constructor() {
        this.b = new OptionButtonToggle.OptionButtonToggle({
            name: 'test',
            title: 'Test',
            defaultval: 0,
            options: ['Off', 'On'],
            text: () => 'Test',
        });
    }
}

const DE = new DeadExt();
