console.log('Le tombeau des Lucioles Team')

const icone = document.querySelector('.navbar-mobile i');
const modal = document.querySelector('.modal');

icone.addEventListener('click', function(){
    modal.classList.toggle('change-modal')
    icone.classList.toggle('fa-times')
})

