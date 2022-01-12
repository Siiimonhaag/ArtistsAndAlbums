let artistId = +location.search.slice(1)
let albums;
async function getAlbums() {
  albums = await (await fetch('api/where/albums?order=releaseDate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      where: 'artistId = ' + artistId
    })
  })).json();
  renderAlbums();
}

function renderAlbums() {
  let html = '';
  for (let album of albums) {
    html +=
      `
      
      <h2><a class="artistLink" href="edit-album.html?${album.id}">${album.albumName}</a></h2>
      <p class="releaseDate">Release date: ${album.releaseDate}</p>
      `
  }
  document.querySelector('.albumlist').innerHTML = html;
}

getAlbums();