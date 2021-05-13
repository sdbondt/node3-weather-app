console.log('client side is running');


    const weatherForm = document.querySelector('form');
    const searchInput = document.querySelector('input');
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2')

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const address = searchInput.value || '';

        messageOne.textContent = 'Loading';
        messageTwo.textContent = '...';

        fetch(`http://localhost:3000/weather?address=${address}`)
    .then( res => {
        return res.json()
    })
    .then( ({ location, forecastData, error, address }) => {
        if(error) {
            messageOne.textContent = error;
            messageTwo.textContent = '';
        } else {
            messageOne.textContent = location;
            messageTwo.textContent = address +  ': ' + forecastData;
        }
    });
    })