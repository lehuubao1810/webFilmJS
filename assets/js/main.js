pageNumber = 1;
keyword = "batman";

var apiListFilm = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${pageNumber}`;

var apiSearch = `https://ophim.tv/_next/data/EdPTJFKDsGXjfsHhzTxX1/tim-kiem.json?keyword=${keyword}`;

function dataFilm(callback) {
    fetch(apiListFilm)
        .then(response => response.json())
        .then(callback)
}

const listFilm = document.querySelector('.list-film');

const Main = document.querySelector('#main');

function checkImg(imgLink) {

}

dataFilm(function (datas) {
    // var dataItems = datas.pageProps.data.items; -search
    var dataItems = datas.items;
    dataItems.forEach(function (item) {

        // var poster = `https://img.ophim.tv/uploads/movies/${item.slug}-poster.jpg`

        var poster = `https://img.ophim.tv/uploads/movies/${item.slug}-thumb.jpg`
        var nameFilm = item.name;
        var originName = item.origin_name;
        var year = item.year;

        // Create item
        var itemFilm = document.createElement('div');
        itemFilm.classList.add('item-film');
        var itemImg = document.createElement('div');
        itemImg.classList.add('item-img');
        itemImg.innerHTML = `<img src="${poster}" alt="">`;
        itemFilm.appendChild(itemImg);
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
        listFilm.appendChild(itemFilm);
    })

    var itemTitle = document.querySelectorAll('.item-title');
    console.log(itemTitle);
    itemTitle.forEach(function (item) {
        item.onclick = function () {
            var slug = item.getAttribute('id');
            var filmModal = document.createElement('div');
            filmModal.classList.add('film-modal');
            var apiFilm = `https://ophim1.com/phim/${slug}`;
            
            fetch(apiFilm) 
                .then(response => response.json())
                .then(function (data) {
                    var srcVideo = data.episodes[0].server_data[0].link_embed;
                    console.log(srcVideo);
                    filmModal.innerHTML = `
                    <iframe class="video-block" src="${srcVideo}">
                    </iframe>
                    `;
                    Main.appendChild(filmModal);

                })

            filmModal.onclick = function () {
                filmModal.remove();
            }
            
        }
    })
})


