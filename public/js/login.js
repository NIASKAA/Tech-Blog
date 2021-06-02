const { DOUBLE } = require("sequelize/types");

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = docuement.querySelector('#password-login').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const passsword = document.querySelector('#password-signup').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sing up.');
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
