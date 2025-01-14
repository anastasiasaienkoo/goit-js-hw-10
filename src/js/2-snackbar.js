import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";


const form = document.querySelector('form');
const button = form.querySelector('button');
const input = form.querySelector('input[name="delay"]');
const radiusbtn = form.querySelectorAll('input[name="state"]');
let delay;
let stateRadiobtn = ' ';
form.addEventListener('submit', event => {
    event.preventDefault();
    const delay = input.value;

    let stateRadiobtn;
    radiusbtn.forEach(el => {
        if(el.checked){
           stateRadiobtn = el.value;
        }
    });

    const makePromise = (delay, stateRadiobtn) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (stateRadiobtn === 'fulfilled') {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        });
    };

    makePromise(delay, stateRadiobtn)
        .then(success => {
            iziToast.success({
                title:'OK',
                titleColor: 'white',
                message: `Fulfilled promise in ${delay}ms`,
                messageSize: '16p',
                messageColor: 'white',
                backgroundColor: '#59A10D',
                position: 'topRight',
                width: '383',
            });
            console.log(`✅ Fulfilled promise in ${delay}ms`);
            event.target.reset();
        })
        .catch(error => {
            iziToast.error({
                title:'Error',
                titleColor: 'white',
                message: `Rejected promise in ${delay}ms`,
                messageSize: '16p',
                messageColor: 'white',
                backgroundColor: '#EF4040',
                position: 'topRight',
                width: '383',
                color: 'white',
            })
            console.error(`❌Rejected promise in ${delay}ms`);
            event.target.reset();
        });
});






