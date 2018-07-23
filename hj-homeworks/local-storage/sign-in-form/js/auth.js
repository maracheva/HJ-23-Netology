'use strict';

const formSignIn = document.querySelector('.sign-in-htm');
const formSignUp = document.querySelector('.sign-up-htm');
const messageSignIn = formSignIn.querySelector('.error-message');
const messageSignUp = formSignUp.querySelector('.error-message');

initFormSubmit(formSignIn, 'https://neto-api.herokuapp.com/signin', messageSignIn, 'signin');
initFormSubmit(formSignUp, 'https://neto-api.herokuapp.com/signup', messageSignUp, 'signup');

function initFormSubmit(form, url, message, type) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = {};

        for (const [key, value] of formData) {
            data.key = value;
        }

        const request = fetch(url, {
            body: JSON.stringify(data),
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });

        request
            .then((result) => {
                if (200 <= result.status && result.status < 300) {
                    return result;
                }
                throw new Error(response.statusText);
            })
            .then((result) => result.json())
            .then((data) => {
                const inputMessage = type === 'signin' ? `Пользователь ${data.name} успешно авторизован` : `Пользователь ${data.name} успешно зарегистрирован`;
                message.value = data.error ? data.message : inputMessage;
            });

    });
}
