// const form=document.getElementsByClassName("registraition")[0];
// form.addEventListener("submit", event=>{
//     event.preventDefault();
// })

const signInBtn = document.getElementsByClassName("button")[0];
const wrapperForm=document.querySelector("section");
var flag = true;

signInBtn.addEventListener("click", ()=>{
    if (flag === true) {
        signInBtn.innerHTML = "Sign up";
        flag = false;
        wrapperForm.classList.toggle('active');

      } else {
        signInBtn.innerHTML = "Log in";
        flag = true;
        wrapperForm.classList.toggle('active');
      }
});


