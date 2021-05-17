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


document.getElementById('save').addEventListener('click', save_options);