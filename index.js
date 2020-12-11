// var goFS = document.getElementById("goFS");
// goFS.addEventListener("click", function() {
//     document.body.requestFullscreen();
// }, false);


const el = document.querySelector('#extfullscreen');
el.addEventListener("click", e => {

        document.exitFullscreen().then(d => {}).catch(e => {
            document.body.requestFullscreen();
        });

})


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

const url="https://rajkumar-blog.herokuapp.com/";
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

    try {
        const obj = {name: form.name.value, email: form.email.value, subject: form.subject.value, text: form.text.value};
        console.log(obj);
        const user = form.name.value;
        const res = await fetch(url+"blog/add/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(obj)
        });

        const resData = await res.json();

        console.log(resData);

        if(res.status>=400) {
            alert("Something went wrong...Please try again...");
            spinnerHandler.style.display = "none";
            return;
        }
        form.name.value="";
        form.email.value="";
        form.subject.value="";
        form.text.value="";
        const labels = document.querySelectorAll('form label');
        labels.forEach(lab => {
            lab.classList.remove('active');
        });

        const modeltxt = document.querySelector('.modal-content');
        const modelfoot = document.querySelector('.modal-footer');
        modelfoot.innerHTML='';
        modeltxt.innerHTML = `<br>
        <h5>Rajkumar's Blog...</h5>
        <span>Thank you ${user} for your feedback... Have a nice day :)</span>
        <br>
        <br>
      </div>`;

      modelfoot.innerHTML = `<a href="#form" class="modal-close waves-effect waves-green btn-flat red-text">close</a>`;

        var Modalelem = document.querySelector('.modal');
        var instance = M.Modal.init(Modalelem);
        instance.open();


    } catch(err) {
        alert("Something went wrong...Please try again...");
        spinnerHandler.style.display = "none";
    }
    
    spinnerHandler.style.display = "none";
});


// background image changer 
const arr = ['/images/pexels-david-besh-884788.jpg', '/images/pexels-lukas.jpg', '/images/pexels-luis-quintero-1624881.jpg', '/images/pexels-no-name-66997.jpg'];
const im = document.querySelector('.main-image');
let i=0;
setInterval(() => {
    im.style.backgroundImage = 'url(".'+arr[i]+'")';
    i=(i+1)%4;
}, 3000);


// skills pop overs 
const winHeight = window.innerHeight;
const skill = document.querySelector('.skillset');
const skillPosition = skill.offsetTop;
const func = (e) => {
    let pgy = window.pageYOffset;
    let y = skill.getBoundingClientRect().y;
    if(pgy > skillPosition - winHeight/2.5 || y < winHeight/2.5) {
        const lis = document.querySelectorAll('.determinate');
        let j=0;
        lis.forEach(el => {
            if(j===0) el.style.width = '95%';
            if(j===1 || j===2) el.style.width = '65%';
            if(j===3) el.style.width = '75%';
            if(j===4) el.style.width = '60%';
            if(j===5) el.style.width = '85%';
            j+=1;
        });
        window.removeEventListener('scroll', func, true);
        
    }
}
window.addEventListener('scroll', func, true);


// cards fades stylings tranformations 
const cardsList = document.querySelectorAll('.card');
let h=0;
cardsList.forEach(card => {
    h+=1;
    if(h%2===0) card.style.left='100px';
    else card.style.right='100px';
    const cardTop = card.offsetTop;
    
    const funcq = (e) => {
        let y = card.getBoundingClientRect().y;
        const pgy = window.pageYOffset;
        if(pgy > cardTop - winHeight/2.0 || y < winHeight/2.0) {
            card.style.opacity=1;
            card.style.left=0;
            window.removeEventListener('scroll', funcq, true);
        }
    };
    window.addEventListener('scroll', funcq, true);
});

// cards initial left and right position 
