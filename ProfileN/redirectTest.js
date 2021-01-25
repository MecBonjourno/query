auth.onAuthStateChanged( user => {
    // console.log(user);
if (user) {
    userId = user.uid;
    // console.log(user.uid);
    // console.log('LOGADO!')
    // window.location = "../ProfileN/test.html";
 } else {
    console.log('no user, redirecting');
    window.location = "../cadastro.html";
  }
})

// var user = firebase.auth().currentUser;
//     if (user) {
//     // window.location = "../uniqueProfile/template.html";
//     } else {
//     console.log('no user, redirecting');
//     window.location = "../cadastro.html";
//     }