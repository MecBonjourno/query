const updateForm = document.querySelector('#content-form');

function showMenu(){
    document.getElementById('menu').style.display = 'block';
}

function closeMenu(){
    document.getElementById('menu').style.display = 'none';
}

function logout(){
    firebase.auth().signOut();
}

function logInWithGoogle(){
    if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        
        // [END signin]
      } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      }
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in').disabled = true;
}

const loggedInLinks = document.querySelectorAll('.logged-in');

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        setupUI(user);
        
    }else{
        setupUI();
        
    }
})

const setupUI = (user) => {
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
   
    // console.log(loggedInLinks);
    // loggedOutLinks.forEach(item => item.style.display = 'none');
     } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    // loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};


