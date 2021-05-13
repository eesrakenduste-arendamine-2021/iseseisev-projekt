function save_options() {
    var uname = $('#name').val();
    var uemail = $('#email').val();
    console.log(uname);
    console.log(email);
    chrome.storage.local.set({
        name: uname,
        email: uemail
    }, () => {
        alert('Options saved!');
    });
}

function restore_options() {
    chrome.storage.local.get(['name'], (result) => {
        console.log('Retrieved name: ' + result.name);
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);