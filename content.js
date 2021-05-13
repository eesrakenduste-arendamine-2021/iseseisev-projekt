var em;
var pwd;

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.method == "rautofill") {
            
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
                        input.after('<a>'+ password +'</a>');
                        input.val(password);
                    }
                }
            );
            var emailURL = "https://www.gmailnator.com/inbox/#" + fname + "@gmailnator.com";
            window.open(emailURL);
        }
    }
);


// function fnamegen() {
//     const fnameslink = chrome.runtime.getURL("/text/fname.txt");
    
//     $.get(fnameslink, (data) => {
//         const fnamelist = data.split('\n');
//         const randomName = Math.floor((Math.random() * 3519) + 0);
//         test(fnamelist[randomName]);
//     });
//     // console.log(rfname);
//     // return rfname; 
// }

// function test(t){
//     var fname;
//     fname = t;
//     console.log(t);
//     return fname;
// }


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