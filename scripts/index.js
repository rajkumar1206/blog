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
    }
    // localStorage.setItem('theme', 'light-theme');
    
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

const sendName = document.querySelector('.sendName');

sendName.addEventListener('click', (e) => {
    const name = document.querySelector('.sendNameForm');
    console.log(name.value);
});

const form = document.querySelector('form');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const obj = {name: form.name.value, email: form.email.value, subject: form.subject.value, text: form.text.value};
    console.log(obj);
})