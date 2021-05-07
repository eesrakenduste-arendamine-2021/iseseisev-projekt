
var uid = null;
var user = null;
firebase.auth().onAuthStateChanged(function(u) {
    if (u) {
      // User is signed in.
      console.log("stay");;
      console.log(u.uid);
      console.log(u.displayName);
      user = u.email.replace("@chat.com", "");
      document.querySelector("#loggedUser").innerHTML = "Welcome, " + user + ".";
    } else {
      // No user is signed in.
      console.log("redirect");
      window.location.replace("index.html");
    }
  });

function logOut() {
    firebase.auth().signOut();
}

let emoticon = document.querySelectorAll(".emoticons div");

for (let i = 0; emoticon.length > i; i++) {
    emoticon[i].addEventListener("click", () => {
        console.log(emoticon[i].innerHTML);
        document.querySelector("#message").value += ` ${emoticon[i].innerHTML}`;
    });
}

let placeholderRemoved = false;

var element = document.querySelector("#messages");
element.scrollTop = element.scrollHeight;

function updateScroll() {
    var element = document.querySelector("#messages");
    element.scrollTop = element.scrollHeight;
}

function sendMessage() {
    let message = document.querySelector('#message').value;
    firebase.database().ref("messages").push().set({ "sender": user, "message": message, "date": getTime() });
    document.querySelector('#message').value = "";
    return false;
}

function getTime() {
    let date = new Date();
    let result = `${date.getHours()}:${date.getMinutes()} | ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    return result;
}

firebase.database().ref("messages").on("child_added", function (snapshot) {
    if (!placeholderRemoved) {
        document.querySelector(".placeholder").remove();
        placeholderRemoved = true;
    }
    let button = "";
    if (snapshot.val().sender == user) {
        button = `<button class="deleteBtn" data-id="${snapshot.key}" onclick="deleteMessage(this);">Delete</button>`
    }
    let html = `<li id="message-${snapshot.key}"><span class="smallFont">${snapshot.val().date}</span><br>${button} <b>${snapshot.val().sender}:</b> ${snapshot.val().message} </li>`;
    document.querySelector("#messages").innerHTML += html;
    updateScroll();
});

function deleteMessage(self) {
    console.log("aaa");
    let messageId = self.getAttribute("data-id");
    firebase.database().ref("messages").child(messageId).remove();
    firebase.database().ref("messages").on("child_removed", function (snapshot) {
        console.log("bbbb");
        // document.getElementById(`message-${snapshot.key}`).innerHTML = "<i>This message has been removed<i>";
        document.getElementById("message-" + snapshot.key).innerHTML = "<i>This message has been removed<i>";
    });
}