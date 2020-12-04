window.addEventListener('DOMContentLoaded', loadjs);

function loadjs () {
    
    const switchTheme = document.querySelector('input[type=checkbox]');
    const body = document.querySelector('body');
    if(localStorage.getItem('theme')) {
        let theme = localStorage.getItem('theme');
        if(theme==='dark-theme') {
            switchTheme.click();
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    } else {
        localStorage.setItem('theme', 'light-theme');
    }
    
    // console.log(switchTheme);
    
    switchTheme.addEventListener('change', (e) => {
        let theme = localStorage.getItem('theme');
        if(theme==="light-theme") {
            localStorage.setItem('theme', 'dark-theme');
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
        } else {
            localStorage.setItem('theme', 'light-theme');
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
        }
    });

    // $('#modal1').modal('open');

    var Modalelem = document.querySelector('.modal');
    var instance = M.Modal.init(Modalelem);
    instance.open();
    
}

const url="http://127.0.0.1:8000/";
const spinnerHandler = document.querySelector(".spinner");

const sendName = document.querySelector('.sendName');

sendName.addEventListener('click', async (e) => {
    e.preventDefault();
    spinnerHandler.style.display = "block";
    const name = document.querySelector('.sendNameForm');
    console.log(name.value);

    const res = await fetch(url+"blog/visit/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          }, 
        body: JSON.stringify({name: name.value})
    });

    const resData = await res.json();

    console.log(resData);
    name.value="";
    spinnerHandler.style.display = "none";

});

const form = document.querySelector('form');

form.addEventListener('submit', async (e)=> {
    e.preventDefault();
    spinnerHandler.style.display = "block";
    const obj = {name: form.name.value, email: form.email.value, subject: form.subject.value, text: form.text.value};
    console.log(obj);

    const res = await fetch(url+"blog/add/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          }, 
        body: JSON.stringify(obj)
    });

    const resData = await res.json();

    console.log(resData);
    form.name.value=none;
    form.email.value=none;
    form.subject.value=none;
    form.text.value=none;
    spinnerHandler.style.display = "none";
})