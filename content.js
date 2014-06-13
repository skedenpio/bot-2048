var s = document.createElement('script');

// TODO: add "game.js" to web_accessible_resources in manifest.json
s.setAttribute('src', chrome.extension.getURL('game.js'));
document.head.appendChild(s);