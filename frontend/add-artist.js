document.querySelector('form[name="addArtist"]')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let requestArtist = {};
    let formElements = document.forms.addArtist.elements;

    for (let element of formElements) {
      if (element.type == 'submit') { continue }
      requestArtist[element.name] = element.value;
    }

    let result = await (await fetch('/api/artists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestArtist)
    })).json();
    console.log(result)
    location.href = 'index.html';
  });