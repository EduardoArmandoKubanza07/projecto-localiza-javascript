const btn = document.querySelector('#seePassword');
const btnConfirm = document.querySelector('#seeConfirmPassword');

btn.addEventListener('click', ()=>{
    let inputPassword = document.querySelector('#password');

    if(inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text');
    } else {
        inputPassword.setAttribute('type', 'password')
    }
});

btnConfirm.addEventListener('click', ()=>{
    let inputPassword = document.querySelector('#confirmPassword');

    if(inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text');
    } else {
        inputPassword.setAttribute('type', 'password')
    }
});

const image = document.querySelector('#image');
image.addEventListener('change', ()=>{
    if(image.files[0]) {
        document.querySelector('#image-name').innerHTML = image.files[0].name;
    }
});
const form = document.querySelector('#account-form');
form.addEventListener('submit', createAccount);

function createAccount(event) {
    event.preventDefault();

    const date = new Date();
    const year = date.getFullYear();
    const allUsers = JSON.parse(localStorage.getItem('allUsers')) ?? [];
    const name = document.querySelector('#full-name');
    const email = document.querySelector('#email');
    const gender = document.querySelector('#gender').value;
    const age = (year -  document.querySelector('#age').value);
    const avatar = document.querySelector('#image');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirmPassword');
    let control = 0;

    allUsers.forEach(user => {
        if(user.email == email.value) {
            control++;
        }
    });

    if(control != 0) {
        alert('Já existe um usário com este email');
    } else {
        if(password.value != confirmPassword.value) {
            alert('Os campos senha e confirmar senha devem se iguais!');
        } else {
            const newUser = {
                id : allUsers.length,
                name : name.value,   
                email : email.value,
                gender : gender,
                age : age,
                password : password.value,           
                adress : '',
                posts :[],
                messages: []
            };

            const reader = new FileReader();
            reader.addEventListener('load', ()=>{
                newUser.avatar = reader.result;
                allUsers.push(newUser);
                saveUsers(allUsers);
            });
            reader.readAsDataURL(avatar.files[0])           
            name.value = '';
            email.value = '';
            password.value = '';
            confirmPassword.value = '';
            document.querySelector('#image-name').innerHTML = 'Seleccione uma fotografia';
            document.querySelector('#age').value = '';
            alert('Cadastrado com sucesso');
            setTimeout(()=>{
                window.location.href = '_login.html';
            }, 2000);
        }
    }
}

function saveUsers(element) {
    localStorage.setItem('allUsers', JSON.stringify(element));
}