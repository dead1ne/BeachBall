var DeadExt = {}
DeadExt.enable = true;
DeadExt.buyQubes = false;
DeadExt.unlockToZero = true;
DeadExt.keyType = 0;
DeadExt.keyTypeArray = ['Crate Key', 'Vault Key'];
DeadExt.lockTypeArray = ['Locked Crate', 'Locked Vault'];
DeadExt.buyQubesLog = false;
DeadExt.buyQubesCb = function() {
    if (DeadExt.buyQubes) {
        if (DeadExt.unlockToZero && Molpy.Has('Sand', Infinity)) {
            var lock = Molpy.Boosts[DeadExt.lockTypeArray[DeadExt.keyType]];
            var key = Molpy.Boosts[DeadExt.keyTypeArray[DeadExt.keyType]];
            if (lock.unlocked) {
                if (lock.bought > 0) {
                    if (key.unlocked) {
                        if (DeadExt.buyQubesLog) console.log("Buying " + key.name);
                        key.buy();
                    }
                    else {
                        if (DeadExt.buyQubesLog) console.log("Opening Qube for " + key.name);
                        Molpy.Spend({QQ:1});Molpy.RewardLogicat(Molpy.Level('QQ'));
                    }
                }
                else {
                    if (DeadExt.buyQubesLog) console.log("Buying " + lock.name);
                    lock.buy();
                }
            }
            else {
                if (DeadExt.buyQubesLog) console.log("Opening Qube for " + lock.name);
                Molpy.Spend({QQ:1});Molpy.RewardLogicat(Molpy.Level('QQ'));
            }
        } else {
            if (DeadExt.buyQubesLog) console.log("Opening Qube");
            Molpy.Spend({QQ:1});Molpy.RewardLogicat(Molpy.Level('QQ'));
        }
        setTimeout(DeadExt.buyQubesCb, 50);
    }
};
DeadExt.buyQubesCreateOptions = function() {
    if (!Molpy.Options['BB.DeadExtBuyQubes']) {
        new Molpy.Option({
            name: 'BB.DeadExtBuyQubes',
            title: 'Buy Qubes',
            defaultval: 0,
            range: 1,
            onchange: function() {
                DeadExt.buyQubes = Molpy.options['BB.DeadExtBuyQubes'] == 1;
                if (DeadExt.buyQubes) {
                    DeadExt.buyQubesCb();
                }
            },
            text: function() { return DeadExt.buyQubes ? 'Enabled' : 'Disabled'; },
        });
    }
    Molpy.options['BB.DeadExtBuyQubes'] = Molpy.Options['BB.DeadExtBuyQubes'].defaultval;

    if (!Molpy.Options['BB.DeadExtUnlockToZero']) {
        new Molpy.Option({
            name: 'BB.DeadExtUnlockToZero',
            title: 'Unlock to Zero',
            defaultval: 1,
            range: 1,
            onchange: function() {
                DeadExt.unlockToZero = Molpy.options['BB.DeadExtUnlockToZero'] == 1;
            },
            text: function() { return DeadExt.unlockToZero ? 'Enabled' : 'Disabled'; },
        });
    }
    Molpy.options['BB.DeadExtUnlockToZero'] = Molpy.Options['BB.DeadExtUnlockToZero'].defaultval;

    if (!Molpy.Options['BB.DeadExtKeyType']) {
        new Molpy.Option({
            name: 'BB.DeadExtKeyType',
            title: 'Key Type',
            defaultval: 0,
            range: 1,
            onchange: function() {
                DeadExt.keyType = Molpy.options['BB.DeadExtKeyType'];
            },
            text: function() { return DeadExt.keyTypeArray[DeadExt.keyType]; },
        });
    }
    Molpy.options['BB.DeadExtKeyType'] = Molpy.Options['BB.DeadExtKeyType'].defaultval;
};
DeadExt.SetFaves = function(input) {
    if (input) {
        var list = input.split(',');
        for(var i in list) {
            var obj = Molpy.Boosts[list[i]]; // first checking if it's a alias

            if(!obj) {
                obj = Molpy.Boosts[Molpy.BoostAKA[list[i]]] // otherwise searching by name (which is anyways converted to alias)
            }

            if(obj/*  && obj.unlocked && obj.bought */) {
                Molpy.lootAddToFav(obj);
            }
        }
    }
};
DeadExt.RemoveFaves = function(input) {
    if (input) {
        var list = input.split(',');
        for(var i in list) {
            var obj = Molpy.Boosts[list[i]];

            if(!obj) {
                obj = Molpy.Boosts[Molpy.BoostAKA[list[i]]]  // otherwise searching by name (which is anyways converted to alias)
            }

            if(obj) {
                Molpy.lootRemoveFromFav(obj);
            }
        }
    }
};

DeadExt.RateTracker = {
    targets: {},
    refresh_interval: 50,
    max_values: 10000,
    add: function(name, obj, prop) {
        this.targets[name] = {
            obj: obj,
            prop: prop,
            last: -1,
            avg: 0,
            rate: 0,
            rolling: 0,
            values: [],
        }
    },
    remove: function(target) {
        delete this.targets[target];
    },
    updateTarget: function(name) {
        var target = this.targets[name];
        if (target) {
            var val = target.obj[target.prop];
            var delta = val - target.last;
            if (target.values.length >= this.max_values) {
                target.rolling -= target.values.shift();
            }
            if (target.last == -1) {
                return;
            }
            target.last = val;
            target.rolling += delta;
            target.values.push(delta);
            target.avg = target.rolling / target.values.length;
            target.rate = target.avg * (1000 / this.refresh_interval);
        }
    },
    update: function() {
        for (var name in this.targets) {
            this.updateTarget(name);
        }
        setTimeout( () => this.update(), this.refresh_interval);
    },
};

DeadExt.LogiTracker = {
    refresh_interval: 50,
    values: [],
    update: function() {
        var cur = Molpy.Boosts["LogiPuzzle"].Level;
        if (cur != this.values[this.values.length - 1]) {
            this.values.push(cur);
        }
        if (this.values.length > 100) {
            this.values.shift();
        }
        setTimeout( () => this.update(), this.refresh_interval);
    }
}

// Molpy.ClearFaves()
DeadExt.favesCreateOption = function() {
    var faves = [
        'Between the Cracks',
        'Rosetta',
        'CfB',
        'Time Lord',
        'Temporal Rift',
        'Question Qube',
        'Now Where Was I?',
        'Vacuum Cleaner',
        'Italian Plumber',
        'Void Vault',
        'This Sucks',
        'Ninja Ritual',
    ];
    var shoppers = [
        'Shopping Assistant',
        'Robotic Shopper',
        'Shopping Assistant,Robotic Shopper',
    ];
    if (!Molpy.Options['BB.DeadExtFaves']) {
        new Molpy.Option({
            name: 'BB.DeadExtFaves',
            title: 'Faves',
            defaultval: 2,
            range: 2,
            onchange: function() {
                var shopper = shoppers[Molpy.options['BB.DeadExtFaves']];
                Molpy.ClearFaves();
                DeadExt.SetFaves(faves.concat(shopper).join(','));
            },
            text: function() {
                if (Molpy.options['BB.DeadExtFaves'] == 2) {
                    return 'Both';
                }
                return shoppers[Molpy.options['BB.DeadExtFaves']];
            },
        });
    }
    Molpy.options['BB.DeadExtFaves'] = Molpy.Options['BB.DeadExtFaves'].defaultval;
    var shopper = shoppers[Molpy.options['BB.DeadExtFaves']];
    Molpy.ClearFaves();
    DeadExt.SetFaves((faves.concat(shopper)).join(','));
}
DeadExt.buyQubesCreateOptions();
DeadExt.favesCreateOption();
Molpy.RefreshOptions();

document.addEventListener("mousedown", e => {
    if (e.target.closest('#lootSearchBox')) return

    let click = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    });

    e.target.dispatchEvent(click);

    e.preventDefault();
    e.stopImmediatePropagation();
}, true);

document.addEventListener("click", e => {
    if (e.target.closest('#lootSearchBox, #navPerPage, #navPageNum')) return

    if (e.isTrusted) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}, true);
