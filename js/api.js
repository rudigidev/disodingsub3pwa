var urlBase = 'https://api.football-data.org/v2/'

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {

    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(urlBase + 'competitions/2021/standings',{
      method: 'GET',
      headers: { 
      'X-Auth-Token': '974141197a304fc7a220c094c7608828'
      } 
    })
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          preloading()
          var articlesHTML = "";
          var dataClubs = data.standings[0].table;
          dataClubs.forEach(function(article) {
            articlesHTML += `
                  <div class="card">
                  <a href="./article.html?id=${article.team.id}">
                    <div class="card-image waves-effect waves-block waves-dark">
                    <img src="${article.team.crestUrl}" width="100" height="100"/>
                    </div>
                  </a>
                  <div class="card-content">
                    <span class="card-title truncate">${article.team.name}</span>
                    <p>Positons : ${article.position}</p>
                    <p>Points : ${article.points}</p>
                  </div>
                </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("home-content").innerHTML += articlesHTML;
        });
      }
    });
  }

  fetch(urlBase + 'competitions/2021/standings' , {
    method: 'GET',
    headers: { 
    'X-Auth-Token': '974141197a304fc7a220c094c7608828'
    } 
    })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      var dataClubs = data.standings[0].table;
      // console.log(dataClubs);
      dataClubs.forEach(function(article) {
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.team.id}">
                  <div class="card-image waves-effect waves-block waves-dark">
                  <img src="${article.team.crestUrl}" width="100" height="100"/>
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.team.name}</span>
                  <p>Positons : ${article.position}</p>
                  <p>Points : ${article.points}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("home-content").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function(resolve, reject) {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(urlBase +'teams/'+ idParam,
      {
        method: 'GET',
        headers: { 
        'X-Auth-Token': '974141197a304fc7a220c094c7608828'
        } 
      }).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var dataSquad = data.squad;
          for(var i in dataSquad) {
          var articleHTML= '';
          articleHTML += `
              <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" width="100" height="100"/>
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                ${data.address}
                <p>Berdiri Pada Tahun : ${data.founded}</p>
                <p>Contact Clubs : ${data.phone}</p>
                <p>Stadion : ${data.venue}</p>
                <p>Website : ${data.website}</p>
              </div>
            </div>
          `;
          article2HTML = `
              <tr>
                <td>${dataSquad[i].name}</td>
                <td>${dataSquad[i].position}</td>
                <td>${dataSquad[i].nationality}</td>
              </tr>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articleHTML;
          document.getElementById("player").innerHTML += article2HTML;
          resolve(data);
          }//for
        });
      }
    });
}

  fetch(urlBase +'teams/'+ idParam,
    {
      method: 'GET',
      headers: { 
      'X-Auth-Token': '974141197a304fc7a220c094c7608828'
      } 
    })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      var dataSquad = data.squad;
        // console.log(dataSquad[i]);
      var articleHTML = '';
      var article2HTML = '';
      // Menyusun komponen card artikel secara dinamis
      articleHTML += `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" width="100" height="100"/>
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              ${data.address}
              <p>Berdiri Pada Tahun : ${data.founded}</p>
              <p>Contact Clubs : ${data.phone}</p>
              <p>Stadion : ${data.venue}</p>
              <p>Website : ${data.website}</p>
            </div>
          </div>
        `;
        for(var i in dataSquad) {
        article2HTML = `
            <tr>
              <td>${dataSquad[i].name}</td>
              <td>${dataSquad[i].position}</td>
              <td>${dataSquad[i].nationality}</td>
            </tr>
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articleHTML;
      document.getElementById("player").innerHTML += article2HTML;
      resolve(data);
       }//for   
     });
    });
}

function getSavedArticles() {
  getAll().then(function(articles) {
    // console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = '';
    articles.forEach(function(article) {
      // console.log(articles);
      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.tla}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.crestUrl}"  width="100" height="100" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.name}</span>
                      <p>${article.website}</p>
                        <a class="deletesavedteam btn-floating btn-meduim red" id="${article.tla}">
                        <i class="medium material-icons">delete</i>
                        </a>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("home-content").innerHTML = articlesHTML;
    var deleteButton = document.querySelectorAll(".deletesavedteam");
    console.log(deleteButton);
    for (let btn of deleteButton) {
      btn.addEventListener("click", function(e) {
        let teamId = e.target.parentElement.id;
        // console.log(teamId);
        deleteById(teamId).then(() => {
          console.log('Berhasil Di hapus');
        })
      })
    }
  });

}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(article) {
    var dataSquad = article.squad;
    // console.log(dataSquad);
    var articleHTML = '';
    var article2HTML = '';
    
    articleHTML += `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${article.crestUrl}"  width="100" height="100"/>
      </div>
      <div class="card-content">
        <span class="card-title">${article.name}</span>
        ${article.website}
        <p>Berdiri Pada Tahun : ${article.founded}</p>
        <p>Contact Clubs : ${article.phone}</p>
        <p>Stadion : ${article.venue}</p>
        <p>Website : ${article.website}</p>
      </div>
    </div>
  `;
  for (var i in dataSquad) {
  article2HTML += `
            <tr>
              <td>${dataSquad[i].name}</td>
              <td>${dataSquad[i].position}</td>
              <td>${dataSquad[i].nationality}</td>
            </tr>
        `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("articles").innerHTML = articleHTML;
    document.getElementById("player").innerHTML = article2HTML;
    }
  });
}