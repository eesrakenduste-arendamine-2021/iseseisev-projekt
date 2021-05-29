document.addEventListener('DOMContentLoaded', function() {


    var rautofill = document.getElementById('rautofill');
    var sautofill = document.getElementById('sautofill');
    var options = document.getElementById('go-to-options');
    var github = document.getElementById('git');


    rautofill.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "rautofill" });
        });
    });


    sautofill.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "sautofill" });
        });
    });


    options.addEventListener('click', function() {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

    github.addEventListener('click', function() {
        window.open('https://github.com/karljanar/iseseisev-projekt');
    });


});