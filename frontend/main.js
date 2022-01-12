
let artists

async function readJson() {

  let rawData = await fetch(
    '/api/artists?order=artistName'
  );
  artists = await rawData.json();
  renderFrontpage();
}

function renderFrontpage() {

  let html = '';

  for (let row of artists) {
    html += `
      
      <h2><a class="artistLink" href="album-list.html?${row.id}">${row.artistName}</a></h2>
      <p><b>Description:</b>${row.artistDescription}</p>
      `;
  }
  document.querySelector('.artists').innerHTML = html;
}

// Start
readJson();