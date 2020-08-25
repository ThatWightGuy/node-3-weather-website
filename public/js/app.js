const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    
    message1.textContent = 'Searching Location Weather...';
    message2.textContent = '';

    const url = '/weather?address=' + location;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (!data.error) {
                message1.textContent = data.forcast;
                message2.textContent = data.location;
            }
            else {
                message1.textContent = data.error;
            }
        });
    });

});