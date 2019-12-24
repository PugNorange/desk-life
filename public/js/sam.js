
// $(document).ready(function() {
//     $('#demo').click(function() {
//         animateScrollTo('#demo-service')
//     })
// })
//
//
// function animateScrollTo(id) {
//     $('html, body').animate({
//         scrollTop: $(id).offset().top
//     }, 800, 'swing');
// }
//
// function onLoad() {
// 	gapi.load('auth2', function() {
// 		gapi.auth2.init();
// 	});
// }
// first time sign In //
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    // auth2 is initialized with gapi.auth2.init() and a user is signed in.
    console.log('ID         : ' + profile.getId());
    console.log('Full Name  : ' + profile.getName());
    console.log('Given Name : ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL  : ' + profile.getImageUrl());
    console.log('Email      : ' + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token   : " + id_token);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://desk-life.herokuapp.com/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        console.log('Signed in as: ' + xhr.responseText);
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
