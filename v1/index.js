
function alerter()
{
    alert('laravel genereerib kypsiseid')
}

function validateForm(){
    let username = document.forms["login"]["username"].value
    let password = document.forms["login"]["password"].value
    if (username == "" || password == "") {
        alert("Molemad valjad peavad olema taidetud")
        return false
    }
    else{
        window.location.href("/table.html")
    }
}