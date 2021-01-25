//const uid = firebase.auth().currentUser;
const linkList = document.querySelector('#link-list');
const form = document.querySelector('#add-link');
// const updateForm = document.querySelector('#content-form');
var selectedFile;


//creating list of elements
function renderList(doc){
    let li = document.createElement('li');
    let twitter = document.createElement('span');
    let insta = document.createElement('span');
    let face = document.createElement('span');
    let whats = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    twitter.textContent = doc.data().twitter;
    insta.textContent = doc.data().insta;
    face.textContent = doc.data().face;
    ocupacao.textContent = doc.data().ocupacao;
    whats.textContent = doc.data().whats;
    cross.textContent = 'x';

    li.appendChild(twitter);
    li.appendChild(insta);
    li.appendChild(face);
    li.appendChild(whats);
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
    db.collection('users').doc(user.uid).set({
        twitter: form.twitter.value,
        insta: form.insta.value,
        face: form.face.value,
        whats: form.whats.value,
        ocupacao: form.ocupacao.value
    });
        }
    });
});



//data ao vivo
db.collection('users').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    // console.log(changes);
});

function uploadImage(){
    var filename = selectedFile;

    var storageRef = firebase.storage().ref(user +'/userProfilePhoto/'+filename);
    
    var uploadTask = storageRef.put(selectedFile);

	uploadTask.on('state_changed', function(snapshot){

	}, function(error) {

	}, function() {

    var downloadURL = uploadTask.snapshot.downloadURL;
    console.log(downloadURL);

      })
}

