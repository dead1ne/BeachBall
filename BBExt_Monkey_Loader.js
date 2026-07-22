// ==UserScript==
// @name         Beachball Loader
// @namespace    https://github.com/dead1ne/BeachBall
// @version      1.1
// @description  Beachball Extension autoloader for Sandcastle Builder - SSL patch.
// @author       seraphina985
// @match        https://crashsnowdon.com/sandtest/castle.html
// @match        https://crashsnowdon.com/sandtest/classic.html
// @grant        none
// ==/UserScript==

setTimeout(loadBBExt, 5000);

function loadBBExt() {
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', 'https://dead1ne.github.io/BeachBall/BBExt.js');
    document.head.appendChild(js);
}

// Loader patch by seraphina985 all other credit bellongs to the people bellow

// CodeRitter Beachball location
// https://github.com/codeRitter/BeachBall

// Xenko Beachball location - previous version.
// http://xenko.github.io/BeachBall/BeachBall.js
