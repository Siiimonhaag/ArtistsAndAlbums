async function getCategories() {
  let categories = await (await fetch('api/artists?order=artistName')).json();
  let optionsHTML = '';
  for (let category of categories) {
    optionsHTML += `
    <option value="${category.id}">${category.artistName}</option>
    `;
  }
  document.querySelector('select[name="artistId"]').innerHTML += optionsHTML;
}
getCategories();

document.querySelector('form[name="addAlbum"]')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let requestAlbum = {};
    let elements = document.forms.addAlbum.elements;
    for (let element of elements) {
      if (element.type === 'submit') { continue }
      requestAlbum[element.name] = element.value;
    }

    let result = await (await fetch('/api/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestAlbum)
    })).json();
    console.log(result);
    location.href = 'index.html';
  });