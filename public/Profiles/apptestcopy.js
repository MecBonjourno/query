//const uid = firebase.auth().currentUser;
const linkList = document.querySelector('#link-list');
const form = document.querySelector('#add-link');
//const search = document.querySelector('#look-for');
var selectedFile;


//creating list of elements
function renderList(doc){
    let li = document.createElement('li');
    let twitter = document.createElement('span');
    let insta = document.createElement('span');
    let face = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    twitter.textContent = doc.data().twitter;
    insta.textContent = doc.data().insta;
    face.textContent = doc.data().face;
    cross.textContent = 'x';

    li.appendChild(twitter);
    li.appendChild(insta);
    li.appendChild(face);
    li.appendChild(cross);


    linkList.appendChild(li);

    //delting data
    cross.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('users').doc(id).delete();
    });
}

//saving data
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid);
    db.collection('users').doc(user.uid).set({
        twitter: form.twitter.value,
        insta: form.insta.value,
        face: form.face.value
    });
   form.twitter.value = '';
   form.insta.value = '';
   form.face.value = '';
        }
    });
});


//data ao vivo
db.collection('users').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderList(change.doc);
        } else if (change.type == 'removed'){
            let li = linkList.querySelector('[data-id=' + change.doc.id + ']');
            linkList.removeChild(li);
        }
    });
});



function uploadImage(){
    var filename = selectedFile;

    var storageRef = firebase.storage().ref(user +'/userProfilePhoto/'+filename);
    
    var uploadTask = storageRef.put(selectedFile);

	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
	  // Observe state change events such as progress, pause, and resume
	  // See below for more detail
	}, function(error) {
	  // Handle unsuccessful uploads
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	//   var postKey = firebase.database().ref('Posts/').push().key;
    var downloadURL = uploadTask.snapshot.downloadURL;
    console.log(downloadURL);
	//   var updates = {};
	//   var postData = {
	//   	url: downloadURL,
	//   	caption: $("#imageCaption").val(),
	//   	user: user.uid
      })
}

db.collection("users").doc("je0rlavcOwZjiInSrfUInM2LOeK2")
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
    });