let albumId = +location.search.slice(1)
console.log(albumId);

let albums;

async function readJson() {

  let rawData = await fetch('/api/albums');
  albums = await rawData.json();
  renderAlbumTitle();
}

function renderAlbumTitle() {

  let html = '';

  for (let row of albums) {
    if (row.id === albumId) {
      html += `
      <h2>Album: ${row.albumName}</h2>
      `;
    }
  }
  document.querySelector('.albumHtml').innerHTML = html;
}

document.querySelector('input[name="remove"]').addEventListener('click', async function () {

  await fetch('api/albums/' + albumId, {
    method: "DELETE"
  })
  location.href = 'index.html';
})


document.querySelector('form[name="editAlbum"]')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let updateAlbum = {};
    let elements = document.forms.editAlbum.elements;
    for (let element of elements) {
      if (element.name === 'change') { continue }
      if (element.name === 'remove') { continue }
      updateAlbum[element.name] = element.value;
    }

    let result = await (await fetch('api/albums/' + albumId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateAlbum)
    })).json();
    console.log(result)
    console.log(updateAlbum)

    //location.href = "index.html";
  });


readJson();

