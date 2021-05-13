chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "mailtime") {
            var summary = [];

            $('input').each(
                function() {
                    var input = $(this);
                    summary.push('Type: ' + input.attr('type') + 'Name: ' + input.attr('name') + ' Placeholder: ' + input.attr('placeholder'));
                    if (input.attr('type') == 'email') {
                        input.val("ssss");
                    }
                    if (input.attr('type') == 'password') {
                        input.val("123");
                    }
                }
            );
            var emailURL = "https://www.guerrillamail.com/inbox";
            window.open(emailURL);
            window.addEventListener('load', (event) => {
                console.log('page is fully loaded');
            });

            console.log(summary);
            chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true, 'currentWindow': true }, function(tabs) {
                var url = tabs[0].url;
                console.log(url);
            });


        }
    }
);