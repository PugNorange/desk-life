//
// Google Signin / Login function and design
//
// first time sign In //
function onSignIn(googleUser) {
    console.log("Clicked google signin btn");
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token   : " + id_token);

    var profile = googleUser.getBasicProfile();
    // auth2 is initialized with gapi.auth2.init() and a user is signed in.
    // console.log('ID         : ' + profile.());


    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/tokensignin');
    // xhr.open('POST', 'http://localhost:3000/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        const response = xhr.responseText;
        console.log('Server returned: ' + response);

        // Change the nav
        var accountNav = document.getElementById("user_account");
        accountNav.innerHTML = "Hi, " + googleUser.getBasicProfile().getName();
        accountNav.style.textDecoration = "underline";

    };
    xhr.send('idtoken=' + id_token);

}

// for sign out //
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
function onSuccess(googleUser) {
    console.log("CHECK >>>>")
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    // Replace Signin/Login with username
    var accountNav = document.getElementById("user_account");
    accountNav.innerHTML = "Hi, " + googleUser.getBasicProfile().getName();
    accountNav.style.textDecoration = "underline";
    // accountNav.removeAttribute("data-nav-section");
    // accountNav.setAttribute('href', '/instructions');
    // accountNav.setAttribute('onclick', 'signOut();');
    // accountNav.classList.remove("data-nav-section");
    // accountNav.href = "/instructions";
    document.getElementById('my-signin2').style.display = 'none';
    document.getElementById('account_btn').style.display = 'flex';

}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}





//////////////////////////////////////////////////////

// // called by google client
// function onSignIn(googleUser) {
//   var id_token = googleUser.getAuthResponse().id_token;
//   // never log these out on a real app
//   console.log('id_token: ', id_token);
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId());
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail());
//   // verification
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/tokensignin');
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//   xhr.onload = function() {
//     console.log('Server returned: ' + xhr.responseText);
//   };
//   xhr.send('idtoken=' + id_token);
// }
// // on sign out
// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function() {
//     console.log('User signed out.');
//   });
// }
