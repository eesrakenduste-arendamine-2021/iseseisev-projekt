var user = null;
let placeholderRemoved = false;

// checks if logged in
firebase.auth().onAuthStateChanged(function(u) {
    if (u) {
        // User is signed in.
        user = u.displayName;
        document.querySelector("#loggedUser").innerHTML = "Welcome, " + user + ".";
    } else {
        // No user is signed in.
        window.location.replace("index.html");
    }
});

// logs out
function logOut() {
    firebase.auth().signOut();
}

// repo button
function goToRepo() {
    window.location = 'https://github.com/Uptaker/iseseisev-projekt';
}

// selects all emoticons, applies event listener
let emoticon = document.querySelectorAll(".emoticons div");
for (let i = 0; emoticon.length > i; i++) {
    emoticon[i].addEventListener("click", () => {
        console.log(emoticon[i].innerHTML);
        document.querySelector("#message").value += ` ${emoticon[i].innerHTML}`;
    });
}

// scrolled down by default
var element = document.querySelector("#messages");
element.scrollTop = element.scrollHeight;

// automatically scrolls down
function updateScroll() {
    var element = document.querySelector("#messages");
    element.scrollTop = element.scrollHeight;
}

// sends message upon submit
function sendMessage() {
    let message = document.querySelector('#message').value;
    if (message > 400) {
        pushMessageError("Maximum message limit is 400 characters.");
        return false;
    }
    if (message.length == 0 || message == "") {
        pushMessageError("Message cannot be empty.");
        return false;
    }
    firebase.database().ref("messages").push().set({ "sender": user, "message": message, "date": getTime() });
    document.querySelector('#message').value = "";
    return false;
}

// notification pusher
function pushMessageError(message) {
    let element = document.querySelector("#errorMessage");
    element.innerHTML = message;
    element.classList.remove("hidden");
    setTimeout(() => {
        element.innerHTML ="";
        element.classList.add("hidden");
    }, 3000);
}

// applies the current time to msg
function getTime() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let days = date.getDate();
    let mins = date.getMinutes();
    let hours = date.getHours();
    if (date.getMinutes() < 10) {
        mins = `0${date.getMinutes()}`;
    }
    if (date.getHours() < 10) {
        hours = `0${date.getHours()}`;
    }
    if (date.getDate() < 10) {
        days = `0${date.getDate()}`;
    }
    if (date.getMonth() < 10) {
        month = `0${date.getMonth() + 1}`;
    }
    let result = `${hours}:${mins} | ${days}.${month}.${date.getFullYear()}`
    return result;
}

// loads the messages
firebase.database().ref("messages").on("child_added", function (snapshot) {
    if (!placeholderRemoved) {
        document.querySelector(".placeholder").remove();
        placeholderRemoved = true;
    }
    let button = "";
    if (snapshot.val().sender == user) {
        button = `<button class="deleteBtn" data-id="${snapshot.key}" onclick="deleteMessage(this);"><i class="fas fa-trash-alt"></i></button>`
    }
    let html = `<li class="message" id="message-${snapshot.key}">
                <div>
                <p class="smallFont">${snapshot.val().date}</p>
                <b>${snapshot.val().sender}:</b>
                <span>${snapshot.val().message}<span>
                </div>
                ${button}
                </li>`;
    document.querySelector("#messages").innerHTML += html;
    updateScroll();
});

// deletes messages (half-broken)
function deleteMessage(self) {
    console.log("aaa");
    let messageId = self.getAttribute("data-id");
    console.log(messageId);
    firebase.database().ref("messages").child(messageId).remove();
    firebase.database().ref("messages").child(messageId).remove();
    document.getElementById("message-" + messageId).innerHTML = "<i>This message has been removed<i>";
    firebase.database().ref("messages").on("child_removed", function (snapshot) {
        console.log("deleted");
        document.getElementById("message-" + snapshot.key).innerHTML = "<i>This message has been removed<i>";
        document.getElementById("message-" + messageId).innerHTML = "<i>This message has been removed<i>";
    });
}