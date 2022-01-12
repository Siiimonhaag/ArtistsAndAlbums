async function getCategories() {
  let categories = await (await fetch('api/artists?order=artistName')).json();
  let optionsHTML = '';
  for (let category of categories) {
    optionsHTML += `
    <option value="${category.id}">${category.artistName}</option>
    `;
  }
  document.querySelector('select[name="id"]').innerHTML += optionsHTML;
}
getCategories();


document.querySelector('input[name="remove"]').addEventListener('click', async function () {
  let id = document.forms.editArtist.elements.id.value;
  if (!id) {
    return;
  }
  await fetch('api/artists/' + id, {
    method: "DELETE"
  })
  async function getArtistsId() {
    let artistsData = await (await fetch('api/artists')).json();
    for (let row of artistsData) {
      if (row.id === +id) {
        alert('You have to remove all the albums before you can remove the artist.');
        break;
      }
    }
  }
  getArtistsId();
  location.href = 'index.html';
})


document.querySelector('form[name="editArtist"]')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let requestEditArtist = {};
    let elements = document.forms.editArtist.elements;
    let artistMenuId;
    for (let element of elements) {
      if (element.name === 'id') {
        artistMenuId = element.value;
        continue;
      }
      if (element.type === 'submit') { continue }
      if (element.type === 'button') { continue }
      requestEditArtist[element.name] = element.value;
    }

    await (await fetch('api/artists/' + artistMenuId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestEditArtist)
    })).json();

    location.href = "index.html";
  });