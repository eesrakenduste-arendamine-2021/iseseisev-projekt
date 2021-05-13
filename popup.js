document.addEventListener('DOMContentLoaded', function() {


    var rautofill = document.getElementById('rautofill');
    var sautofill = document.getElementById('sautofill');


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


    document.querySelector('#go-to-options').addEventListener('click', function() {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });


});