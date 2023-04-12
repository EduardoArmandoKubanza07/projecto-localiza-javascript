// Código para o usuário logar
document.querySelector('#login').addEventListener('submit', login);

function login(event) {
    event.preventDefault();

    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const allUsers = JSON.parse(localStorage.getItem('allUsers')) ?? [];
    let control = 0;
    allUsers.forEach(user => {
        if(email.value == user.email && password.value == user.password){
            const userValid = {
                name : user.name,
                age : user.age,
                avatar : user.avatar,
                email : user.email,
                gender : user.gender,
                id: user.id,
                location : user.location,
                password : user.password,
                posts : user.posts,
            };

            window.location.href ='_main.html';
            let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
            localStorage.setItem('token', token);
            localStorage.setItem('userValid', JSON.stringify(userValid));
            control++;
        } 
    });

    if( control == 0) {
        alert('Dados incorrectos!');
        email.value ='';
        password.value ='';
        email.focus();
    }
}

// Código para ver senha 
const eyeIcon = document.querySelector('#visible');
const passwordBox = document.querySelector('#password-box');
const passwordInput = document.querySelector('#password');

passwordBox.addEventListener('mouseenter', ()=>{
    eyeIcon.style.display = 'inline';
});
passwordBox.addEventListener('mousemove', ()=>{
    eyeIcon.style.display = 'inline';
});
passwordBox.addEventListener('mouseout', ()=>{
    eyeIcon.style.display = 'none';
});
eyeIcon.addEventListener('click', ()=>{
    if(passwordInput.type === 'password'){
        passwordInput.type = 'text';
    }
    else {
        passwordInput.type = 'password';
    }
});