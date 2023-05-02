const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = new URLSearchParams(formData);

    fetch('/login', {
        body: payload,
        method: "post"
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))


});
