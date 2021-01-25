auth.onAuthStateChanged( user => {
if (user) {
    userId = user.uid;
    window.location = "../ProfileN/templateProfileReady.html";
    } else {
    console.log('no user');
    
    }
})

// var user = firebase.auth().currentUser;
//     if (user) {
//     window.location = "../ProfileN/templateProfileReady.html";
//     } else {
//     console.log('no user');
//     }