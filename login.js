$(function() {
  let errorMessage;
  $('.form').click(function() {
    firebase.auth().signOut();
    let username = $('#username').val();
    const password = $('#password').val();

    if (!username.length > 0) {
      document.querySelector("#loginStatus").innerHTML ="Username cannot be blank";
    } else {
      if(!password.length > 0) {
        document.querySelector("#loginStatus").innerHTML ="Password cannot be blank";
      } else {
        username += "@chat.com";
        firebase.auth().signInWithEmailAndPassword(username, password).catch((error) => {
          errorMessage = error.message;
        });
        firebase.auth().onAuthStateChanged(function(user) {
          document.querySelector("#loginStatus").innerHTML = "Logging in...";
          if (user) {
            document.querySelector("#loginStatus").innerHTML = "Success";
            setTimeout(() => {
              window.location = "main.html";
            }, 500);
          } else {
            setTimeout(() => {
              changeLoginStatus("Invalid username or password");
            }, 1500);
          }
        });
      }
    }
  });

  $('.regForm').click(function() {
    let username = $('#regUsername').val();
    const password = $('#regPassword').val();

    if (!username.length > 25 || username.length < 3) {
      document.querySelector("#registerStatus").innerHTML = "Username must be between 3 to 25 characters!";
    } else {
      if(!filterUsername(username)) {
        document.querySelector("#registerStatus").innerHTML = "Username can only contain letters (A to Z) or numbers";
      } else {
        if(!password.length > 25 || password.length < 8) {
          document.querySelector("#registerStatus").innerHTML = "Password must be between 8 to 25 characters!";
        } else {
          let email = username + "@chat.com";
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((res) => {
            const user = firebase.auth().currentUser;
            switchForms();
            document.querySelector("#loginStatus").innerHTML = `Welcome, ${username}. You may now log in`;
            return user.updateProfile({displayName: username});
          })
          .catch((error) => {
            if (error.code == "auth/email-already-in-use") {
              document.querySelector("#registerStatus").innerHTML = "Username taken. Please choose another";
            } else {
              errorMessage = error.message;
              document.querySelector("#registerStatus").innerHTML = errorMessage;
            }
          });
        }
      }
    }
  });

  function filterUsername(username) {
    let filter = /^[a-z0-9]+$/i;
    return filter.test(username)
  }

  function changeLoginStatus(message) {
    document.querySelector("#loginStatus").innerHTML = message;
    setTimeout(() => {
      document.querySelector("#loginStatus").innerHTML ="";
    }, 3000);
  }

  let loginForm = true;
  $("#registerMessage").on("click", switchForms);

  function switchForms() {
    if (loginForm == true) {
      document.querySelector(".login").classList.add('hidden');
      document.querySelector(".register").classList.remove('hidden');
      document.querySelector("#registerMessage").innerHTML = "Log in instead";
      document.querySelector("#formMessage").innerHTML = "Register";
      loginForm = false;
    } else {
      document.querySelector(".register").classList.add('hidden');
      document.querySelector(".login").classList.remove('hidden');
      document.querySelector("#registerMessage").innerHTML = "Register now";
      document.querySelector("#formMessage").innerHTML = "Log In";
      loginForm = true;
    }
    document.querySelector("#registerStatus").innerHTML = "";
    document.querySelector("#loginStatus").innerHTML = "";
  }
});