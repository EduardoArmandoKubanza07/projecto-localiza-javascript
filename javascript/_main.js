// Código para verificar se existe um usuário logado  //
function checkUser(){
    if(localStorage.getItem('token') === null){
        alert('Você precisa estar logado para acessar esta página');
        window.location.href ='_login.html';
    }
    else{
        document.querySelector('.hidden').style.display = 'none';
    }
}
checkUser();

// Código para o usuário logado sair //
let outBtn = document.querySelector('#out');
outBtn.addEventListener('click', ()=>{
    localStorage.removeItem('token');
    window.location.href ='_login.html';
});

// Código para renderizar os dados do usuário logado na tela //
function renderUserData(){
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
    const date = new Date();
    const year = date.getFullYear();
    document.querySelector('#age').setAttribute('max', year);
}
window.addEventListener('load', renderUserData);

//  Código para voltar ao top //
function animaScroll(){
    const elevator = document.querySelector('.elevator');
    const postCard = document.querySelector('#post-card');
    const windowTop = window.pageYOffset;

    if(windowTop > postCard.offsetTop){
        elevator.style.display = 'block';
    } 
    else{
        elevator.style.display = 'none';
    }
}
window.addEventListener('scroll', ()=>{
    animaScroll();
});
document.querySelector('.elevator').addEventListener('click', ()=>{
    window.scroll({
        top: 0,
        left:0 ,
        behavior: 'smooth'
    });
});
// Código para pesquisar 
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', function(){
    const searchResult = document.querySelector('.search-result');
    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];
    if(this.value.trim()){
        searchResult.style.display = 'block';
        const result = allPosts.filter(post =>{
            return  (post.full_name.toString().toLowerCase().includes(this.value.toString().toLowerCase()));
        });
        renderSearchResults(result);
    }
    else {
        searchResult.style.display = 'none';
    }
}); 

function renderSearchResults(result){
    const results = document.querySelector('#results');
    results.innerHTML = '';
    if(result.length == 0){
        results.innerHTML = `<legend> Pesquisa não encontrada </legend>`;
    }
    else{  
        result.forEach( res =>{
            const li = document.createElement('li');
                const a = document.createElement('a');
                    const img = document.createElement('img');
                    img.setAttribute('src', res.avatar);
                    const p = document.createElement('p');
                    p.innerHTML = `${res.full_name}`;
                a.appendChild(img);
                a.appendChild(p);
                a.addEventListener('click', ()=>{
                    renderSearchData(res);
                });    
            li.appendChild(a);
            results.appendChild(li)
        });
    }
}

function toggleSearchData() {
    document.querySelector('.search-result-details').classList.toggle('hide');
    document.querySelector('.search-details-modal').classList.toggle('hide');
}
document.querySelector('.search-result-details #close').addEventListener('click', toggleSearchData);

function renderSearchData(res) {
    document.querySelector('.search-result-details').classList.toggle('hide');
    document.querySelector('.search-details-modal').classList.toggle('hide');
    const content = document.querySelector('.search-result-details .content');
    content.innerHTML = '';

    content.innerHTML = `<p>Nome : ${res.full_name} </p>`;
    content.innerHTML += `<p>Idade : ${res.age} anos </p>`;
    content.innerHTML += `<p>Sexo : ${res.gender} </p>`;
    content.innerHTML += `<p>Contactos : ${res.contact} </p>`;
    content.innerHTML += `<p>Morada : ${res.adress} </p>`;
    content.innerHTML += `<p id="des"> ${res.description} </p>`;
    content.innerHTML += `<img id="img" src="${res.avatar}"/>`;
}
// Código para notificações //
function renderNotifications(){
    const allNotifications = JSON.parse(localStorage.getItem('allNotifications')) ?? [];
    const notifications = document.querySelector('#notifications');
    const userValid = JSON.parse(localStorage.getItem('userValid')) ?? [];
    notifications.innerHTML = '';

    allNotifications.forEach( notification =>{
        if(notification.loged != userValid.id) {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.setAttribute('src', notification.avatar);
            const a = document.createElement('a');
            a.setAttribute('href', '#'+notification.postIdentificator);
            const p = document.createElement('p');
            p.innerHTML = `<span> ${notification.name}</span> fez uma publicação recentemente. `;
            a.appendChild(p);

            li.appendChild(img);
            li.appendChild(a);

            notifications.appendChild(li);
        }
    });
}
window.addEventListener('load', renderNotifications);

// Código para postar //
const openPosCard = document.querySelector('#poster');
const closePostCard = document.querySelector('#post-close-btn');
const postCard = document.querySelector('.post-section');
const postModal = document.querySelector('.post-modal');

openPosCard.addEventListener('focus', ()=>{
    postCard.classList.toggle('hide');
    postModal.classList.toggle('hide');
});
closePostCard.addEventListener('click',()=>{
    postModal.classList.toggle('hide');
    postCard.classList.toggle('hide');
    document.querySelector('#post-img-name').innerHTML = 'Imagem do desaparecido ';
});

const postImgName = document.querySelector('#post-img-name');
const postImag = document.querySelector('#post-img');

postImag.addEventListener('change', ()=>{
    if(postImag.files[0]){
        postImgName.innerHTML = postImag.files[0].name; 
    }
});

function renderPosts(){
    const userValid = JSON.parse(localStorage.getItem('userValid')) ?? [];
    const postsContainer = document.querySelector('.posts-container');
    postsContainer.innerHTML = '';
    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];
    allPosts.forEach(post => {
        const date = new Date();
        const year = date.getFullYear();
        const day = date.getDate();
        var month = date.getMonth();
        month = switchMonth(month);
        const postContainer = document.createElement('div');
        postContainer.setAttribute('class', 'post-container');
        postContainer.setAttribute('id', post.id);
        // Cabeçalho do post
        const postHeader = document.createElement('div');
        postHeader.setAttribute('class', 'post-header');
       

        const posterInfo = document.createElement('div');
        posterInfo.setAttribute('class', 'poster-info');
        const posterAvatar = document.createElement('img');
        posterAvatar.setAttribute('class', 'poster-avatar');
        posterAvatar.setAttribute('src', post.posterImg);
        const div = document.createElement('div');
        const posterName = document.createElement('p');
        posterName.setAttribute('class', 'poster-name');
        posterName.innerHTML = `${post.posterName}`;
        const postDate = document.createElement('small');
        postDate.setAttribute('class', 'post-date');
        postDate.innerHTML = `${day} de ${month} de ${year}`;
        div.appendChild(posterName);
        div.appendChild(postDate);
        posterInfo.appendChild(posterAvatar);
        posterInfo.appendChild(div)

        postHeader.appendChild(posterInfo);
    
        // Conteúdo prrincipal 
        const postMainContent = document.createElement('div');
        postMainContent.setAttribute('class', 'post-main-content');

        const missingName = document.createElement('p');
        missingName.setAttribute('class', 'missing-name');
        missingName.innerHTML = `Nome: ${post.full_name}`;
        const missingAge = document.createElement('p');
        missingAge.setAttribute('class', 'missing-age');
        missingAge.innerHTML = `Idade: ${post.age} anos`;
        const missingGender = document.createElement('p');
        missingGender.setAttribute('class', 'missing-gender');
        missingGender.innerHTML = `Sexo: ${post.gender}`;
        const contacts = document.createElement('p');
        contacts.setAttribute('class', 'contacts');
        contacts.innerHTML = `Contactos: ${post.contact}`;
        const adress = document.createElement('p');
        adress.setAttribute('class', 'adresss');
        adress.innerHTML = `Morada: ${post.adress}`;
        const missingDescription = document.createElement('legend');
        missingDescription.setAttribute('class', 'missing-description');
        missingDescription.innerHTML = `${post.description}`;
        const missingMmg = document.createElement('img');
        missingMmg.setAttribute('class', ' missing-img');
        missingMmg.setAttribute('src', post.avatar);
        
        postMainContent.appendChild(missingName);
        postMainContent.appendChild(missingAge);
        postMainContent.appendChild(missingGender);
        postMainContent.appendChild(contacts);
        postMainContent.appendChild(adress);
        postMainContent.appendChild(missingDescription);
        postMainContent.appendChild(missingMmg);
        // Zona de botões
        const postBtns = document.createElement('div');
        postBtns.setAttribute('class', 'post-btns');

        const reactBtn = document.createElement('button');
        reactBtn.setAttribute('class', 'react');
        reactBtn.innerHTML = 'Coragem';
        const commentBtn = document.createElement('button');
        commentBtn.setAttribute('class', 'comment');
        commentBtn.innerHTML = 'Comentar';
        commentBtn.addEventListener('click', ()=>{
            postComments.classList.toggle('hide');
        });
        const shareBtn = document.createElement('button');
        shareBtn.setAttribute('class', 'share');
        shareBtn.innerHTML = 'Partilhar';
        postBtns.appendChild(reactBtn);
        postBtns.appendChild(commentBtn);
        postBtns.appendChild(shareBtn)

        // Zona de comentários
        const postComments = document.createElement('div');
        postComments.setAttribute('class', 'post-comments');
        postComments.classList.add('hide');

        const commented= document.createElement('div');
        commented.setAttribute('class', 'comments');
       commented.innerHTML = '';
        post.comments.forEach( com =>{
            const li = document.createElement('li');

            const img = document.createElement('img');
            img.setAttribute('src', com.avatar);

            const div = document.createElement('div');
            const par = document.createElement('p');
            par.innerHTML = `${com.name}`;
            const content = document.createElement('div');
            content.innerHTML = `${com.content}`;

            div.appendChild(par);
            div.appendChild(content);

            li.appendChild(img);
            li.appendChild(div);
            commented.appendChild(li);
        });
        const commentBox = document.createElement('div');
        commentBox.setAttribute('class', 'comment-box');

        const commentArea = document.createElement('textarea');
        commentArea.setAttribute('class', 'comment-area');
        commentArea.setAttribute('placeholder', 'Fazer comentário ');
        const commentButton = document.createElement('button');
        commentButton.setAttribute('class', 'comment-btn');
        commentButton.innerHTML = 'Comentar';

        commentButton.addEventListener('click', ()=>{
            makeComment(post, commentArea);
            setTimeout(()=>{
                commented.innerHTML = '';

                let posters = JSON.parse(localStorage.getItem('allPosts')) ?? [];
                posters.forEach( poster =>{
                    poster.comments.forEach( com =>{
                        const li = document.createElement('li');
            
                        const img = document.createElement('img');
                        img.setAttribute('src', com.avatar);
            
                        const div = document.createElement('div');
                        const par = document.createElement('p');
                        par.innerHTML = `${com.name}`;
                        const content = document.createElement('div');
                        content.innerHTML = `${com.content}`;
            
                        div.appendChild(par);
                        div.appendChild(content);
            
                        li.appendChild(img);
                        li.appendChild(div);
                        commented.append(li);
                    });
                });
            }, 300);
        });
        commentBox.appendChild(commentArea);
        commentBox.appendChild(commentButton);

        postComments.appendChild(commented);
        postComments.appendChild(commentBox);
        // Adicionar a publicação a tela //
        postContainer.appendChild(postHeader);
        postContainer.appendChild(postMainContent);
        postContainer.appendChild(postBtns);
        postContainer.appendChild(postComments);
        postsContainer.appendChild(postContainer);
    });
}
window.addEventListener('load', renderPosts);

const postForm = document.querySelector('.post-section');
postForm.addEventListener('submit', makePost);

function makePost(event){
    event.preventDefault();
    const date = new Date();
    const year = date.getFullYear();

    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];
    const postName = document.querySelector('#post-name');
    const postDescription = document.querySelector('#post-description');
    const postAvatar = document.querySelector('#post-img');
    const postContact = document.querySelector('#post-contact');
    const postAdress = document.querySelector('#post-location');
    const postAge = (year - document.querySelector('#age').value);
    const postGender = document.querySelector('#gender')
   
    let control = 0;
    let conf = false;
    allPosts.forEach(post =>{
        if(post.full_name == postName.value){
            control++;
        }
    });

    if(control != 0){
        conf = confirm('Já existe um usuário cadastrado com este nome , clica no cancelar caso deseje cancelar e no confirmar caso deseje continuar com a publicaçao');
    } 

    if((conf) || (control == 0)){
        const userValid = JSON.parse(localStorage.getItem('userValid'));

        const newPost = {
            posterName : userValid.name,
            posterImg : userValid.avatar,
            posterId : userValid.id,
            id : allPosts.length,
            full_name : postName.value,
            description : postDescription.value,
            contact : postContact.value,
            adress : postAdress.value,
            age : postAge,
            gender : postGender.value,
            comments:[],
        }
         // Código para salvar imagem   
        const reader = new FileReader();
        reader.addEventListener('load', ()=>{
            newPost.avatar = reader.result;
            allPosts.unshift(newPost);
            savePosts(allPosts);
        });
        reader.readAsDataURL(postAvatar.files[0]);

        // Código para adicionar o post na lista de posts do usuário logado 
        const allUsers = JSON.parse(localStorage.getItem('allUsers'));
        allUsers[userValid.id].posts.unshift(newPost);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));

        // Notificar os usuários sobre a publicação
        const allNotifications = JSON.parse(localStorage.getItem('allNotifications')) ?? [];
        const newNotification = {
            loged : userValid.id,
            id : allNotifications.length,
            avatar : userValid.avatar,
            name : userValid.name,
            postIdentificator : newPost.id
        };
        allNotifications.unshift(newNotification);
        saveNotification(allNotifications);

        // Limpar os campos
        postName.value = '';
        postAdress.value = '';
        postDescription.value = '';
        postContact.value = '';
        document.querySelector('#age').value = '';
        document.querySelector('#post-img-name').innerHTML = 'Imagem do desaparecido ';
        alert('Publicação criada com sucesso');
        
        // Rendezizar o post e a notificação na tela
        setTimeout(()=>{
            document.querySelector('.post-modal').classList.add('hide');     
            document.querySelector('.post-section').classList.add('hide');
            renderPosts();      
            renderNotifications(); 
        }, 2000);
    }
}

function savePosts(element){
    localStorage.setItem('allPosts', JSON.stringify(element));
}
function saveNotification(element){
    localStorage.setItem('allNotifications', JSON.stringify(element));
}
//Comentários
function makeComment(post, com) {
    
    if(com.value.trim()) {
       const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];
        const userValid = JSON.parse(localStorage.getItem('userValid')) ?? [];
        allPosts.forEach( pos => {
            if(pos.id == post.id) {
                const newComment = {
                    content : com.value,
                    avatar : userValid.avatar,
                    name : userValid.name, 
                    id : post.id
                };
                pos.comments.push(newComment);
                savePosts(allPosts);    
            }
        });
        com.value ='';

    }
}

// Achados

function renderAchados(allAchados){
    const content = document.querySelector('.achados-content ul');
    content.innerHTML ='';
    if(allAchados.length != 0){
        allAchados.forEach( achado =>{
            const li = document.createElement('li');
                const img = document.createElement('img');
                img.setAttribute('src', achado.avatar);
                const p = document.createElement('p');
                p.innerHTML = `${achado.name}`;
                li.appendChild(img);
                li.appendChild(p);
                li.addEventListener('click' ,()=>{

                });
            content.appendChild(li);
        });
    }
    else {
        content.innerHTML = `<legend> Nenhum resultado encontrado. </legend>`;
    }
}
function searchAchados(){
    const input = document.querySelector('.achados-search-box input');
    const allAchados = JSON.parse(localStorage.getItem('allAchados')) ?? [];
    if(input.value.trim()){
        const newAllAchados = allAchados.filter( achado =>{
            return (achado.name.toString().toLowerCase().includes(input.value.toString().toLowerCase()));
        });
        renderAchados(newAllAchados);
    }

    if(input.value == '') {
        renderAchados(allAchados);
    }
}
document.querySelector('#form-achados').addEventListener('submit',createAchados); 
function createAchados(event) {
    event.preventDefault();
    const date = new Date();
    const year = date.getFullYear();
    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];
    const allAchados = JSON.parse(localStorage.getItem('allAchados')) ?? [];
    const name = document.querySelector('#achado-name');
    const description = document.querySelector('#achado-description');
    const age =(year - document.querySelector('#achado-age').value); 
    const gender = document.querySelector('#achado-gender').value;
    const img = document.querySelector('#achado-img');
    const contact = document.querySelector('#achado-contact');
    const adress = document.querySelector('#achado-adress');

    let conf = true;
    allPosts.forEach( post =>{
        if(post.full_name.toString().toLowerCase() == name.value.toString().toLowerCase()) {
            conf = confirm('Existe uma pessoa na lista de desaparecidos com estas características, clica no OK para continuar o cadastro e CANCELAR para parar como cadastro');
        }
    });

    if(conf){
        let control = 0;
        let con = null;
        allAchados.forEach( achado =>{
            if(name.value.toString().toLowerCase() == achado.name.toString().toLowerCase()) {
                control++;
            }
        });
        if( control != 0) {
            con = confirm('Já existe um achado com estas características,  clica no OK para continuar o cadastro e CANCELAR para parar como cadastro')
        }
        if( (con) ?? (control == 0)){
            const newAchado = {
                name : name.value,
                description : description.value,
                age : age,
                gender : gender,
                contact: contact.value,
                adress : adress.value
            }
            const reader = new FileReader();
            reader.addEventListener('load', ()=>{
                newAchado.avatar = reader.result;
                allAchados.push(newAchado);
                saveAchados(allAchados);
            });

            reader.readAsDataURL(img.files[0]);
            alert('Cadastrado com sucesso')
        }

        if((con)){
            alert('Cancelado com suceso');
            setTimeout( ()=>{
                document.querySelector('.achados-form-modal').classList.toggle('hide');
                document.querySelector('.achados-form').classList.toggle('hide');
            }, 1000);
        }
    } else {
        alert('Cancelado com suceso');
        setTimeout( ()=>{
            document.querySelector('.achados-form-modal').classList.toggle('hide');
            document.querySelector('.achados-form').classList.toggle('hide');
        }, 1000);
    }
    
}

document.querySelector('#achados-close').addEventListener('click', ()=>{
    document.querySelector('.achados-modal').classList.toggle('hide');
    document.querySelector('.achados').classList.toggle('hide');
});
document.querySelector('#achados-open').addEventListener('click', ()=>{
    document.querySelector('.achados-modal').classList.toggle('hide');
    document.querySelector('.achados').classList.toggle('hide');
    const allAchados = JSON.parse(localStorage.getItem('allAchados')) ?? [];
    renderAchados(allAchados);
});
document.querySelector('#achados-form-open').addEventListener('click', ()=>{
    document.querySelector('.achados-form-modal').classList.toggle('hide');
    document.querySelector('.achados-form').classList.toggle('hide');
});
document.querySelector('#achados-form-close').addEventListener('click', ()=>{
    document.querySelector('.achados-form-modal').classList.toggle('hide');
    document.querySelector('.achados-form').classList.toggle('hide');
});

function achadosDetails(achado){
}
function saveAchados(element) {
    localStorage.setItem('allAchados', JSON.stringify(element));
}
document.querySelector('#achado-img').addEventListener('change', function(){
    if(this.files[0]) {
        document.querySelector('#img-zone #achado-img-name').innerHTML = this.files[0].name;
    }
});
function switchMonth(option){
    switch (option){
        case 0:
            return 'Janeiro';
        case 1:
            return 'Fevereiro';
        case 2: 
            return 'Março';
        case 3:
            return 'Abril';
        case 4: 
            return 'Maio';
        case 5:
            return 'Junho';
        case 6: 
            return 'Julho';
        case 7:
            return 'Agosto';
        case 8:
            return 'Setembro';
        case 9:
            return 'Outubro';
        case 10 : 
            return 'Novembro';
        case 11:
            return 'Dezembro';                   
        default:
            return 'Inválido';
    }
}

document.querySelector('.left-sidebar #mans').addEventListener('click', ()=>{
    document.querySelector('#man-ul').classList.toggle('hide')
});
document.querySelector('.left-sidebar #womans').addEventListener('click', ()=>{
    document.querySelector('#woman-ul').classList.toggle('hide')
});
