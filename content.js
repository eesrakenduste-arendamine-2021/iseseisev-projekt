var em;
var pwd;

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.method == "changePage") {
            var fname = fnamegen();
            var password = pwdgen();

            $('input').each(
                function() {
                    var input = $(this);

                    try {
                        if (input.attr('name').indexOf('name') >= 0) { input.val(fname); }
                    } catch (e) {
                        //
                    }
                    try {
                        if (input.attr('name').indexOf('nimi') >= 0) { input.val(fname); }
                    } catch (e) {
                        //
                    }
                    try {
                        if (input.attr('placeholder').indexOf('name') >= 0) { input.val(fname); }
                    } catch (e) {
                        //
                    }
                    try {
                        if (input.attr('placeholder').indexOf('nimi') >= 0) { input.val(fname); }
                    } catch (e) {
                        //
                    }

                    if (input.attr('type') == 'email') {
                        input.val(fname + "@gmailnator.com");
                    }
                    if (input.attr('type') == 'password') {
                        $("label[for*='password']").html(password);
                        input.val(password);
                    }
                }
            );
            var emailURL = "https://www.gmailnator.com/inbox/#" + fname + "@gmailnator.com";
            window.open(emailURL);
        }
    }
);


function fnamegen() {
    var fnameresult = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < 10; i++) {
        fnameresult.push(characters.charAt(Math.floor(Math.random() *
            characters.length)));
    }
    fnameresult = fnameresult.join('');
    return fnameresult;
}



function pwdgen() {
    var pwdresult = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    for (var i = 0; i < 16; i++) {
        pwdresult.push(characters.charAt(Math.floor(Math.random() *
            characters.length)));
    }
    pwdresult = pwdresult.join('');
    return pwdresult;
}