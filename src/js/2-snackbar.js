import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delay = document.querySelector(".form-input");
const radioInputs = document.querySelectorAll('fieldset input[type="radio"]');
const submitBtn = document.querySelector(".form-btn")


form.addEventListener("submit", handelSubmit);

function handelSubmit(event) {
    event.preventDefault();
    const delayValue = Number(delay.value);
    const selectedRadio = Array.from(radioInputs).find(input => input.checked);


    const state = selectedRadio.value;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            state === "fulfilled" ? resolve() : reject();
        }, delayValue);
        
    })
        .then(() => {
            iziToast.success({
                title: "Fulfilled",
                message: `Promise in ${delayValue}ms`,
                position: "topRight",
            })
            console.log(`Fulfilled promise in ${delayValue}ms`);
            
        })
        .catch(() => {
            iziToast.error({
                title: "Rejected",
                message: `Promise in ${delayValue}ms`,
                position: "topRight",
            })
            console.log(`Rejected promise in ${delayValue}ms`);
            
        })
        
            form.reset();
       
    
}