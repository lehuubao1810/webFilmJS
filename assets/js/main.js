pageNumber = 1;
// keyword = "batman";

var apiListFilm = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${pageNumber}`;

// var apiSearch = `https://ophim.tv/_next/data/EdPTJFKDsGXjfsHhzTxX1/tim-kiem.json?keyword=${keyword}`;

function dataFilm(callback) {
    fetch(apiListFilm)
        .then(response => response.json())
        .then(callback)
}

const listFilm = document.querySelector('.list-film');
// var listFilm = document.createElement('div');
// listFilm.classList.add('list-film');

const Main = document.querySelector('#main');

// function render list film
function renderListFilm(item) {
        // var poster = `https://img.ophim.tv/uploads/movies/${item.slug}-poster.jpg`
        
        // var poster = `https://img.ophim.tv/uploads/movies/${item.slug}-thumb.jpg`
        var nameFilm = item.name;
        var originName = item.origin_name;
        var year = item.year;

        // Create item
        var itemFilm = document.createElement('div');
        itemFilm.classList.add('item-film');
        // Add img to item
        var itemImg = document.createElement('div');
        itemImg.classList.add('item-img');
        itemImg.setAttribute('id', item.slug);
        itemFilm.appendChild(itemImg);
        // get img from api
        fetch(`https://ophim1.com/phim/${item.slug}`)
            .then(response => response.json())
            .then(function (data) {
                var poster = data.movie.poster_url;
                itemImg.innerHTML = `<img src="${poster}" alt="">`;
            })
        // Add info to item
        var itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');
        itemFilm.appendChild(itemInfo);
        var itemTitle = document.createElement('h3');
        itemTitle.classList.add('item-title');
        itemTitle.setAttribute('id', item.slug);
        itemTitle.innerHTML = `${nameFilm}`;
        itemInfo.appendChild(itemTitle);
        var itemDesc = document.createElement('div');
        itemDesc.classList.add('item-desc');
        itemDesc.innerHTML = `
            <p>
            <span>${originName}</span>
            <span>(${year})</span>
            </p>
        `;
        itemInfo.appendChild(itemDesc);
        // Add to list
        listFilm.appendChild(itemFilm);
}

// Click film item 
function renderFilm(item) {
    // Click film to watch
    item.onclick = function () {
        var slug = item.getAttribute('id');
        var filmModal = document.createElement('div');
        filmModal.classList.add('film-modal');

        var epsBtn = document.createElement('div');
        epsBtn.classList.add('btn-eps');
        epsBtn.innerText = 'Danh sách tập phim';
        
        var apiFilm = `https://ophim1.com/phim/${slug}`;

        fetch(apiFilm) 
            .then(response => response.json())
            .then(function (data) {
                var srcVideo = data.episodes[0].server_data[0].link_embed;
                // 
                var listEps = data.episodes[0].server_data;
                // 
                console.log(srcVideo);
                filmModal.innerHTML = `
                <iframe class="video-block" src="${srcVideo}">
                </iframe>
                `;
                Main.appendChild(filmModal);
                Main.appendChild(epsBtn);
                var listEpsEl = document.createElement('div');
                listEpsEl.classList.add('list-eps');

                // list eps of film
                listEps.forEach(function (item) {
                    var itemEp = document.createElement('div');
                    itemEp.classList.add('item-ep');
                    itemEp.setAttribute('id', listEps.indexOf(item));
                    itemEp.innerText = `${item.name}`;
                    listEpsEl.appendChild(itemEp);
                    // var itemEp = `<div class="item-ep">${item.name}</div>`;
                    // itemEps.push(itemEp);
                })

                // Handle click button eps
                epsBtn.onclick = function () {
                    Main.appendChild(listEpsEl);

                    // Handle click item ep
                    var itemEps = document.querySelectorAll('.item-ep');
                    itemEps.forEach(function (item) {
                        item.onclick = function () {
                            var index = item.getAttribute('id');
                            var srcVideo = data.episodes[0].server_data[index].link_embed;
                            filmModal.innerHTML = `
                            <iframe class="video-block" src="${srcVideo}">
                            </iframe>
                            `;
                            listEpsEl.remove();
                        }
                    })
                }

                ////////////////
                // Click close
                ///////////////
                filmModal.onclick = function () {
                    // filmModal.remove();
                    // epsBtn.remove();     
                    if ( Main.contains(listEpsEl) ) {
                        listEpsEl.remove();
                        // epsBtn.remove();
                    } else {
                        filmModal.remove();
                        epsBtn.remove();
                    }
                }
            })
    }
}

// 
dataFilm(function (datas) {    
    var dataItems = datas.items;
    // render list film
    dataItems.forEach(function(item) {
        renderListFilm(item);
    })

    var itemTitle = document.querySelectorAll('.item-title');
    console.log(itemTitle);
    
    itemTitle.forEach(function (item) {
        renderFilm(item);
    })

    var itemImg = document.querySelectorAll('.item-img');
    itemImg.forEach(function (item) {
        renderFilm(item);
    })


    ////////////////
    // Chức năng tìm kiếm
    ////////////////
    searchBtn.onclick = function () {
        listFilm.innerHTML = '';
        var apiSearch = `https://ophim.tv/_next/data/EdPTJFKDsGXjfsHhzTxX1/tim-kiem.json?keyword=${inputBox.value}`;
        function dataFilm(callback) {
            fetch(apiSearch)
                .then(response => response.json())
                .then(callback)
        }
        dataFilm(function (datas) {
            var dataItems = datas.pageProps.data.items;
            // var dataItems = datas.items;
            dataItems.forEach(function (item) {
                renderListFilm(item);
            })
        
            var itemTitle = document.querySelectorAll('.item-title');
            console.log(itemTitle);
            itemTitle.forEach(function (item) {
                renderFilm(item);
            })
            var itemImg = document.querySelectorAll('.item-img');
            itemImg.forEach(function (item) {
                renderFilm(item);
            })
        })
    }
})

// var apiSearch = `https://ophim.tv/_next/data/EdPTJFKDsGXjfsHhzTxX1/tim-kiem.json?keyword=${keyword}`;

var inputBox = document.querySelector('.input-box');
var searchBtn = document.querySelector('.icon-search');

