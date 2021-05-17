chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.method == "rautofill") {

            //kasutasin fakerit nimede genereerimiseks, sest extensionid jookseksid juba
            //uuele koodireale, enne kui nimi saaks ise tehtud genekaga tehtud.
            var fname = faker.name.firstName();
            var lname = faker.name.lastName();
            var password = pwdgen();

            $('input').each(
                function() {
                    var input = $(this);


                    if (input.attr('type') == 'text') {
                        input.val(fname + lname);
                    }

                    if (input.attr('type') == 'email') {
                        input.val(fname + lname + "@gmailnator.com");
                    }
                    if (input.attr('type') == 'password') {
                        input.after('<a>' + password + '</a>');
                        input.val(password);
                    }
                }
            );
            var emailURL = "https://www.gmailnator.com/inbox/#" + fname + lname + "@gmailnator.com";
            window.open(emailURL);
        }

        if (request.method == "sautofill") {


            var password = pwdgen();

            chrome.storage.local.get(['name', 'email'], (data) => {
                $('input').each(
                    function() {
                        var input = $(this);


                        if (input.attr('type') == 'text') {
                            input.val(data.name);
                        }

                        if (input.attr('type') == 'email') {
                            input.val(data.email);
                        }
                        if (input.attr('type') == 'password') {
                            input.after('<a>' + password + '</a>');
                            input.val(password);
                        }
                    }
                );
            });



        }
    });



function pwdgen() {
    var pwdresult = [];
    var symb = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789',
        '!@#$%^&*()_+~`|}{[]:;?><,./-='
    ];

    for (var i = 0; i < 2; i++) {
        for (var x = 0; x < 4; x++) {
            pwdresult.push(symb[Math.floor(Math.random() *
                symb.length)].charAt(Math.floor(Math.random() *
                symb[x].length)));
            pwdresult.push(symb[x].toString().charAt(Math.floor(Math.random() *
                symb[x].length)));
        }


    }
    pwdresult = pwdresult.join('');
    return pwdresult;
}