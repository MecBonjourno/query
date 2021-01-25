const list = document.querySelector('.infos');

// setup guides
const setupUserInfo = (data) => {

  let html = '';
  data.forEach(doc => {
    const info = doc.data();
    console.log(info);
    const li = `
      <li>
        <h1> ${info.texto} </h1>
      </li>
    `;
    html += li;
  })
  list.innerHTML = html;

};

document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  });