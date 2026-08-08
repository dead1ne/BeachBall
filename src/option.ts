interface OptionButtonBaseArgs {
    name: string;
    title: string;
    defaultval?: number;
    range?: number;
    text?: () => string;
    onchange?: (click: boolean) => void;
    visibility?: boolean;
    breakafter?: boolean;
}

class OptionButtonBase {
    readonly name: string;
    readonly moption: Molpy.Option;
    constructor({
            name,
            title,
            defaultval,
            range,
            text,
            onchange,
            visibility,
            breakafter,
        }: OptionButtonBaseArgs) {
        if (!Molpy.Options[name]) {
            this.moption = new Molpy.Option({
                name: name,
                title: title,
                defaultval: defaultval,
                range: range,
                text: text,
                onchange: onchange,
                visability: visibility,
                breakafter: breakafter,
            })
        } else {
            console.log('Warning: Option ' + name + ' already exists');
            this.moption = Molpy.Options[name];
        }
        this.name = name;
        Molpy.options[name] = Molpy.Options[name].defaultval;
        Molpy.RefreshOptions();
    }
    get value(): number {
        return Molpy.options[this.name];
    }
    set value(val: number) {
        Molpy.options[this.name] = val;
        Molpy.RefreshOptions();
    }
}

export interface OptionButtonToggleArgs {
    name: string;
    title: string;
    defaultval?: number;
    options?: string[];
    text?: () => string;
    onchange?: (click: boolean) => void;
    visibility?: boolean;
    breakafter?: boolean;
}

export class OptionButtonToggle extends OptionButtonBase {
    constructor({
            name,
            title,
            defaultval,
            options,
            text,
            onchange,
            visibility,
            breakafter,
    }: OptionButtonToggleArgs) {
        options = options ?? [ 'Off', 'On' ];
        const range = options.length - 1;
        if (typeof defaultval === 'string') {
            defaultval = options.indexOf(defaultval);
        } else if (typeof defaultval !== 'number') {
            defaultval = 0;
        }
        if (defaultval > range || defaultval < 0) {
            defaultval = 0;
        }
        text = text ?? (() => options[defaultval]);
        super({
            name: name,
            title: title,
            defaultval: defaultval,
            range: range,
            text: text,
            onchange: onchange,
            visibility: visibility,
            breakafter: breakafter,
        });
    }
}
