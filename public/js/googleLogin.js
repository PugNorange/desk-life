//
// Google Signin / Login function and design
//
// first time sign In //
var authorizedAccount = {username: "Unauthorized account", email: "unauthorizedemail", photo:"non", token:"non"};
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

        var accountNav = document.getElementById("user_account");
        accountNav.innerHTML = "Hi, " + googleUser.getBasicProfile().getName();
        accountNav.style.textDecoration = "underline";
        // authorizedAccount.username  = "test name";
        // authorizedAccount.email     = "test email";
        // authorizedAccount.photo     = "test photo";
    };
    xhr.send('idtoken=' + id_token);

}

// for sign out //
function signOut() {
    console.log("signout clicked");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    // Replace Signin/Login with username
    var accountNav = document.getElementById("user_account");
    accountNav.innerHTML = "Hi, " + googleUser.getBasicProfile().getName();
    accountNav.style.textDecoration = "underline";


    document.getElementById('my-signin2').style.display = 'none';
    document.getElementById('account_btn').style.display = 'flex';
    document.getElementById('account_btn').value = String(googleUser.getBasicProfile().getEmail());
    authorizedAccount.username  = googleUser.getBasicProfile().getName();
    authorizedAccount.email     = googleUser.getBasicProfile().getEmail();
    authorizedAccount.photo     = googleUser.getBasicProfile().getImageUrl();
    authorizedAccount.token     = googleUser.getAuthResponse().id_token;
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

// Open account page using google account data.
function openAccountPage() {
    console.log("Check if function is called " , authorizedAccount);
    location.href = '/account?email=' + encodeURIComponent(authorizedAccount.email) + '?username='+encodeURIComponent(authorizedAccount.username) + '?icon=' + encodeURIComponent(authorizedAccount.photo);
}

function checkSignOut() {
    alert("Signuot functionality is not fully integrated. Next fix deployment is coming soon..");
    console.log("url >> ", location);

    if(('sessionStorage' in window) && (window.sessionStorage !== null)) {
        console.log('storage ari');
} else {
    console.log("storage nashi");
}
}
