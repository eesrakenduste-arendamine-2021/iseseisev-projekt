chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.method == "rautofill") {

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


            var email = '';
            var name = '';
            chrome.storage.local.get(['name', 'email'], (data) => {
                console.log(data.name);
                console.log(data.email);
            });

            var password = pwdgen();

            $('input').each(
                function() {
                    var input = $(this);


                    if (input.attr('type') == 'text') {
                        input.val(name);
                    }

                    if (input.attr('type') == 'email') {
                        input.val(email);
                    }
                    if (input.attr('type') == 'password') {
                        input.after('<a>' + password + '</a>');
                        input.val(password);
                    }
                }
            );
        }
    });



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