if(localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark-theme');

} else {
    document.body.classList.remove('dark-theme');
}


function renderUserData() {
    const userValid = JSON.parse(localStorage.getItem('userValid')) ?? [];
    const userAvatar = document.querySelectorAll('.user-avatar');
    const userName = document.querySelectorAll('.user-name');
    const userEmail = document.querySelectorAll('.user-email');

    userAvatar.forEach(avatar =>{
        avatar.setAttribute('src', userValid.avatar);
        avatar.setAttribute('title',userValid.name);
    });

    userName.forEach(_name =>{
        _name.innerHTML = userValid.name;   
    });
    userEmail.forEach( email =>{
        email.innerHTML = userValid.email;
    });
}

window.addEventListener('load', renderUserData);

// Código para o usuário logado sair //
let outBtn = document.querySelector('#out');
outBtn.addEventListener('click', ()=> {
    localStorage.removeItem('token');
    window.location.href ='_login.html';
});
