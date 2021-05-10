document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');

    menuToggle.addEventListener('click', () => {
        if(menuToggle.innerText == ('Ava menüü')){
            menuToggle.innerText = 'Peida menüü';
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        } else {
            menuToggle.innerText = 'Peida menüü';
            menuToggle.innerText = 'Ava menüü';
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";

        }
    })
})

//https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp