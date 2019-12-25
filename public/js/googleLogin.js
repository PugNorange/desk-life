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
    // console.log('ID         : ' + profile.getId());
    // console.log('Full Name  : ' + profile.getName());
    // console.log('Given Name : ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log('Image URL  : ' + profile.getImageUrl());
    // console.log('Email      : ' + profile.getEmail());

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/tokensignin');
    // xhr.open('POST', 'http://localhost:3000/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        const response = xhr.responseText
        console.log('Server returned: ' + response);
        // location.reload();
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
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
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
