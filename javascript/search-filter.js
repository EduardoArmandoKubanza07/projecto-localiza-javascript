document.querySelector('#man-child').addEventListener('click', ()=>{
    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];

    const manChild = allPosts.filter( post =>{
        return ( (post.gender == 'Masculino') && (post.age <= 12)) ; 
    });
    renderSearchFilter(manChild);
});

document.querySelector('#man-young').addEventListener('click', ()=>{
    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];

    const manYoung = allPosts.filter( post =>{
        return ((post.gender == 'Masculino') && ((post.age >= 13) && (post.age <= 35)));
    });
    renderSearchFilter(manYoung);
});

document.querySelector('#man-adult').addEventListener('click', ()=>{
    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];

    const manAdult = allPosts.filter( post =>{
        return ((post.gender == 'Masculino') && (post.age >= 36));
    });
    renderSearchFilter(manAdult);
});

document.querySelector('#woman-child').addEventListener('click', ()=>{
    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];
    
    const womanChild = allPosts.filter( post =>{
        return ((post.gender == 'Feminino') && (post.age <= 12));
    });
    renderSearchFilter(womanChild);
});

document.querySelector('#woman-young').addEventListener('click', ()=>{
    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];

    const womanYoung = allPosts.filter( post =>{
        return ((post.gender == 'Feminino') && ((post.age >= 13) && (post.age <= 35)));
    });
    renderSearchFilter(womanYoung);
});

document.querySelector('#woman-adult').addEventListener('click', ()=>{
    const allPosts = JSON.parse(localStorage.getItem('allPosts')) ?? [];

    const womanAdult = allPosts.filter( post =>{
        return ((post.gender == 'Feminino') && (post.age >= 36));
    });
    renderSearchFilter(womanAdult);
});

document.querySelector('#filter-close-btn').addEventListener('click', ()=>{
    const filterBox = document.querySelector('.filter');
    const filderModal = document.querySelector('.filter-modal')
    filderModal.classList.toggle('hide');
    filterBox.classList.toggle('hide');
});
function renderSearchFilter(filters) {
    const filterBox = document.querySelector('.filter');
    const filderModal = document.querySelector('.filter-modal');
    const filterResult = document.querySelector('.filter ul');

    filterResult.innerHTML = '';
    filderModal.classList.toggle('hide');
    filterBox.classList.toggle('hide');
    
    if(filters.length != 0) {
        filters.forEach(filter => {
            const li = document.createElement('li');
                const img = document.createElement('img');
                img.setAttribute('src', filter.avatar);
                const name = document.createElement('p');
                name.innerHTML = `${filter.full_name}`;
            li.appendChild(img);
            li.appendChild(name);
            li.addEventListener('click', ()=>{
                renderSearchFilterDetails(filter)
            });
            filterResult.appendChild(li)
        });
    }
    else {
        filterResult.innerHTML = `<legend> Nenhum resultado encontrado. </legend>`;
    }
}

function renderSearchFilterDetails(filter) {
    document.querySelector('#details').style.display = 'block';

    const det = document.querySelector('.det');
    det.innerHTML = '';

    det.innerHTML = `<p>Nome : ${filter.full_name} </p>`;
    det.innerHTML += `<p>Idade : ${filter.age} </p>`;
    det.innerHTML += `<p>Sexo : ${filter.gender} </p>`;
    det.innerHTML += `<p>Contactos : ${filter.contact} </p>`;
    det.innerHTML += `<p>Morada ${filter.adress} </p>`;
    det.innerHTML += `<p id="det"> ${filter.description} </p>`;
    det.innerHTML += `<img id="img" src="${filter.avatar}">`;
}

document.querySelector('#details #close').addEventListener('click', ()=>{
    document.querySelector('#details').style.display = 'none';
});