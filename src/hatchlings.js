globalThis.DeadExt ??= {};

const DE = globalThis.DeadExt;

// if(Molpy.Spend({Bonemeal: Molpy.EggCost().bonemeal, Princesses: Molpy.EggCost().princess}))Molpy.Add('Eggs',1);
// !Molpy.Got('Eggs') || Molpy.Boosts['Eggs'].Level

// var nestProps = DE.parseNestProps(Molpy.Boosts['Nest'].nestprops());
DE.parseNestProps = function(arr) {
    var nestProps = {};
    nestProps.attack = arr[0];
    nestProps.defence= arr[1];
    nestProps.dig    = arr[2];
    nestProps.breath = arr[3];
    nestProps.magic1 = arr[4];
    nestProps.magic2 = arr[5];
    nestProps.magic3 = arr[6];
    return nestProps;
}

DE.fledgeQueue = [1];

DE.updateFledgeQueue = function() {
    if (DE.fledgeQueue.length > 1) {
        DE.fledgeQueue.shift();
    }
}

DE.findLowestDragonFreeNP = function() {
    var maxNP = Math.abs(Molpy.highestNPvisited);
    for (var i = DE.fledgeQueue[0]; i <= maxNP; i++) {
        var npd = Molpy.NPdata[i];
        if (!npd || npd.amount == 0) return i;
    }
    return 0;
}

DE.doHatchlings = function() {
    me = Molpy.Boosts['Hatchlings'];
    if (!me.Level) return;
    for (var cl in me.clutches) {
        if (me.age[cl] < 1000) {
            if (Molpy.Boosts.DQ.overallState != 3) {
                var np = DE.findLowestDragonFreeNP();
                if (np == 0) {
                    console.log('No dragon free NPs');
                    continue;
                }
                var oldNP = Molpy.newpixNumber;
                Molpy.TTT(np, 1);
                Molpy.DragonFledge(cl);
                Molpy.TTT(oldNP, 1);
                // TODO verify fledging before advancing queue
                DE.updateFledgeQueue();
                // TODO fix return hack to deal with clutches mutation
                return;
                // or
                /* if (Molpy.Got('Cryogenics')) Molpy.DragonsToCryo(cl) */
            }
            else {
                // partying?
            }
        }
        else if (me.diet[cl]) {
            // maturing ready to fledge in (me.age[cl] - 1000)
        }
        else {
            var cls = me.clutches[cl];
            if (Molpy.Has('Goats', cls * 1e6)) {
                Molpy.DragonFeed(cl, 1);
                // TODO fix return hack to deal with clutches mutation
                return;
            }
            /* if (Molpy.Has('Princesses', cls * 10)) {
                Molpy.DragonFeed(cl, 3)
            }*/
        }
    }
}

DE.doHatchlingsCB = function() {
    doHatchlings();
    setTimeout(DE.doHatchlingsCB, 10000);
}
DE.doHatchlingsCB();
