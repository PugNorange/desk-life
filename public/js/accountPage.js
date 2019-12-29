var query = location.search;
var value = query.split('=');
// console.log("check url  >> ", decodeURIComponent(value[1].split('?')[0]));
// console.log("check url  >> ", decodeURIComponent(value[2]));
// console.log("check url  >> ", decodeURIComponent(value[3]));

// Replace the placeholder with loaded info.

// User email
document.getElementById('u_e').innerHTML = 'Email : ' +  decodeURIComponent(value[1].split('?')[0]);

// User name
document.getElementById('u_n').innerHTML = 'User Name : ' +  decodeURIComponent(value[2].split('?')[0]);

// User icon
document.getElementById('u_i').setAttribute("src", decodeURIComponent(value[3]));
