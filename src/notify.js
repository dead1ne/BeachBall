globalThis.DeadExt ??= {};

const DE = globalThis.DeadExt;

DE.notify_ignore = [
    'You accidentally slip through the temporal rift!',
    'Ninja Forgiven',
    'Ninja Unstealthed',

    'One less lock on the crate',
    'One less lock on the vault',
    'You wonder when you are',
    'You don\'t notice anything especially notable.',
    'ONG!',
    'Boost Locked: Temporal Rift',
    'VITSSÅGEN, JA!',
    'Not Lucky!',
    'Lucky Twin!',
    'You are doubly not Lucky!',
    'You are not Lucky (which is good)',
    'Lightning struck the same place twice: 10% power bonus!',
    'Boost Unlocked: Monty Haul Problem',
    'Blast Furnace in Operation!',
    'The DoRD has produced:',
    'Your Ranger caught a wild logicat!',
    'Panther Poke: Keeps the Caged Logicat awake a little longer.',
    'Only 2mNP of discounts remain!',
    'Boost Locked: Affordable Swedish Home Furniture',
    'Boost Unlocked: Locked Vault',
    'Boost Unlocked: Vault Key',
    'Boost Locked: Locked Vault',
    'Boost Locked: Vault Key',
    'Boost Locked: Glassed Lightning',
    'The DoRD has provided:',
    'Affordable Swedish Home Furniture: 60% off all items for 10mNP',
    'Boost Locked: Blitzing',
    'You have not saved in over a NewPix!!',
];

DE.notify_ignore_re = [
    /^Time Travel successful! Welcome to NewPix/,
    /^Warped back in time/,

    /^Great Scott/,
    /^\d+ answers? correct/,
    /^You already have this Discovery/,
    /^During the last 100 digs, the dragons have found: (?:[0-9.,]+(?:K|M|G|T|P|E|Z|Y|U|S|H|F|L)?W*Q? (?:Copper|Silver|Gold|Diamonds|Coal)(?: and |, )?)+$/,
    /^Activating Factory Automation/,
    /^Blitzing:/,
    /^Glassed Lightning:/,
    /^You found .+ flux crystals\.$/,
    /^The Shadow Dragon was (?:greedy|generous) and turned .+ Bonemeal\.$/,
];

DE.Molpy_Notify ??= Molpy.Notify;

/* DE.NotifyTypo = function(text) {
    if (Molpy.options.typo) return text; // typo = 1 = off

	var squirpy = eternalf[gainned];
	if(squirpy) return squirpy;

    return text;
}; */

Molpy.Notify = function(text, importance, nolog) {
    for (var i = 0; i < DE.notify_ignore.length; i++) {
        if (DE.notify_ignore[i] == text) return;
    }

    for (var i = 0; i < DE.notify_ignore_re.length; i++) {
        if (DE.notify_ignore_re[i].test(text)) return;
    }

    console.log(text);
    DE.Molpy_Notify(text, importance, nolog);
};
