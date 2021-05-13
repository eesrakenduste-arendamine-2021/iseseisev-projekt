function namegen() {
    $.get("file://~/fname.txt", function(data) {
        var fnamesbyline = data.split("\n")
        const randomFnameN = Math.floor((Math.random() * 3519) + 0);
        var randfname = fnamesbyline[randomFnameN];
        return randfname;
    });
}

module.exports = namegen();