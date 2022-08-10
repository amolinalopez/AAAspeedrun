console.log('Le tombeau des Lucioles Team')

// NAVBAR Mobile ------- avec icones pour fermer et ouvrir menu burger
const icone = document.querySelector('.navbar-mobile i');
const modal = document.querySelector('.modal');

icone.addEventListener('click', function(){
    modal.classList.toggle('change-modal')
    icone.classList.toggle('fa-times')
})



//LOG IN ------- Voir en text le MDP 
let passwordInput = document.getElementById('typedPwd')
let toggle = document.getElementById('show-pwd-btn')
let icon = document.getElementById('eyeToggle');

function MyPwdShow(){
      if( passwordInput.type === 'password') {
        passwordInput.type ='text';
        icon.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = 'password';
        icon.classList.remove("fa-eye-slash");
      }
    }
        
    // function check_Pwd_Similarities() {
    //     coming soon ...
    // }
    
    