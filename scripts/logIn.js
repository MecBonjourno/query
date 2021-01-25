//tentativa de uso log out
const logout = document.querySelector('#logoutbtn');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location="../index.html";
  console.log('user signed out');
});

function userSignUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
   auth.createUserWithEmailAndPassword(email , password).then(() =>  {
    window.location="../HTML/thanks.html";
    });
}

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // if(cred.user.uid)window.location="../HTML/thanks.html";
    console.log(cred.user);
  });
});


