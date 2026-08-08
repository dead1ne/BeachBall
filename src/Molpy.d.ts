declare namespace Molpy {
    function Notify(text: string, importance: number, nolog?: boolean): void;
    class Boost {
        readonly name: string;
        readonly group: string;
        Level: number;
    }
    interface Hatchlings extends Boost {
        clutches: number[];
        diet: number[];
        age: number[];
        properties: number[];
    }
    interface Eggs extends Boost {
        countdown: number;
    }
    interface DragonQueen extends Boost {
        overallState: number;
    }
    const Boosts: {
        Hatchlings: Hatchlings,
        Eggs: Eggs,
        DQ: DragonQueen,
        [key: string]: Boost,
    };
    type OptionArgs = Partial<Omit<Option, "id" | "name">> & Pick<Option, "name">;
    class Option {
        id: number;
        name: string;
        title: string;
        defaultval: number;
        visability: boolean;
        onchange: (click: boolean) => void;
        range: number;
        text: () => string;
        breakafter: boolean;
        constructor(args: OptionArgs);
    }
    const Options: {
        [key: string]: Option,
    }
    const options: {
        [key: string]: number,
    }
    const newpixNumber: number;
    const highestNPvisited: number;
    function TTT(newpixNumber: number, one: number): void;
    function RefreshOptions(): void;
    function Has(name: string, amount: number): boolean;
    function Got(name: string): boolean;

    function DragonFeed(clutch: number, food: number): void;
    function DragonFledge(clutch: number): void;
    function DragonsToCryo(clutch: number): void;
    function DragonsFromCryo(): void;

    interface INPdata {
        DragonType: number;
        amount: number;
        defence: number;
        attack: number;
        dig: number;
        breath: number;
        magic1: number;
        magic2: number;
        magic3: number;
    }
    const NPdata: {
        [key: number]: INPdata,
    }
}
