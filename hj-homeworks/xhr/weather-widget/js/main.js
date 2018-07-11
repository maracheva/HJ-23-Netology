const request = new XMLHttpRequest();

request.addEventListener('load', onload);
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.send();

function onload({target}) {
  if (target.status === 200) {
    const response = JSON.parse(target.responseText);
    setData(response);
  }
}


