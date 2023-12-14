pageNumber = 1;
// keyword = "batman";

const apiListFilm = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${pageNumber}`;
const apiSearch = `https://ophim9.cc/_next/data/s4OlXy8jONoHVWAT5vg7b/tim-kiem.json`;

// const apiSearch = `https://ophim.tv/_next/data/EdPTJFKDsGXjfsHhzTxX1/tim-kiem.json?keyword=${keyword}`;

function dataFilm(callback) {
  fetch(apiListFilm)
    .then((response) => response.json())
    .then(callback);
}

const listFilm = document.querySelector(".list-film");
// const listFilm = document.createElement('div');
// listFilm.classList.add('list-film');

const Main = document.querySelector("#main");

// function render list film
function renderListFilm(item) {
  // const poster = `https://img.ophim.tv/uploads/movies/${item.slug}-poster.jpg`

  // const poster = `https://img.ophim.tv/uploads/movies/${item.slug}-thumb.jpg`
  const nameFilm = item.name;
  const originName = item.origin_name;
  const year = item.year;

  // Create item
  const itemFilm = document.createElement("div");
  itemFilm.classList.add("item-film");
  // Add img to item
  const itemImg = document.createElement("div");
  itemImg.classList.add("item-img");
  itemImg.setAttribute("id", item.slug);
  itemFilm.appendChild(itemImg);
  // get img from api
  fetch(`https://ophim1.com/phim/${item.slug}`)
    .then((response) => response.json())
    .then(function (data) {
      const poster = data.movie.poster_url;
      itemImg.innerHTML = `<img src="${poster}" alt="">`;
    });
  // Add info to item
  const itemInfo = document.createElement("div");
  itemInfo.classList.add("item-info");
  itemFilm.appendChild(itemInfo);
  const itemTitle = document.createElement("h3");
  itemTitle.classList.add("item-title");
  itemTitle.setAttribute("id", item.slug);
  itemTitle.innerHTML = `${nameFilm}`;
  itemInfo.appendChild(itemTitle);
  const itemDesc = document.createElement("div");
  itemDesc.classList.add("item-desc");
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
    const slug = item.getAttribute("id");
    const filmModal = document.createElement("div");
    filmModal.classList.add("film-modal");
    // When click film, episode 1st will show (index 0)
    filmModal.setAttribute("id", 0);

    const epsBtn = document.createElement("div");
    epsBtn.classList.add("btn-eps");
    epsBtn.innerText = "Danh sách tập phim";

    const apiFilm = `https://ophim1.com/phim/${slug}`;

    fetch(apiFilm)
      .then((response) => response.json())
      .then(function (data) {
        const srcVideo = data.episodes[0].server_data[0].link_embed;
        //
        const listEps = data.episodes[0].server_data;
        //
        console.log(srcVideo);
        filmModal.innerHTML = `
                <iframe class="video-block" src="${srcVideo}" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                >
                </iframe>
                `;
        Main.appendChild(filmModal);
        Main.appendChild(epsBtn);
        const listEpsEl = document.createElement("div");
        listEpsEl.classList.add("list-eps");

        // list eps of film
        listEps.forEach(function (item) {
          const itemEp = document.createElement("div");
          itemEp.classList.add("item-ep");
          itemEp.setAttribute("id", listEps.indexOf(item));
          itemEp.innerText = `${item.name}`;
          // /////////////// ------- ///////////////
          if (itemEp.getAttribute("id") === filmModal.getAttribute("id")) {
            itemEp.classList.add("current-ep");
          }
          listEpsEl.appendChild(itemEp);
          // const itemEp = `<div class="item-ep">${item.name}</div>`;
          // itemEps.push(itemEp);
        });

        // Handle click button eps
        epsBtn.onclick = function () {
          Main.appendChild(listEpsEl);

          // Handle click item ep
          const itemEps = document.querySelectorAll(".item-ep");
          itemEps.forEach(function (item) {
            item.onclick = function () {
              const index = item.getAttribute("id");
              const srcVideo = data.episodes[0].server_data[index].link_embed;
              filmModal.innerHTML = `
                            <iframe class="video-block" src="${srcVideo}">
                            </iframe>
                            `;
              filmModal.setAttribute("id", index);
              listEpsEl.remove();
            };
          });
        };

        ////////////////
        // Click close
        ///////////////
        filmModal.onclick = function () {
          // filmModal.remove();
          // epsBtn.remove();
          if (Main.contains(listEpsEl)) {
            listEpsEl.remove();
            // epsBtn.remove();
          } else {
            filmModal.remove();
            epsBtn.remove();
          }
        };
      });
  };
}

//
dataFilm(function (datas) {
  const dataItems = datas.items;
  // render list film
  dataItems.forEach(function (item) {
    renderListFilm(item);
  });

  const itemTitle = document.querySelectorAll(".item-title");
  console.log(itemTitle);

  itemTitle.forEach(function (item) {
    renderFilm(item);
  });

  const itemImg = document.querySelectorAll(".item-img");
  itemImg.forEach(function (item) {
    renderFilm(item);
  });

  ////////////////
  // Chức năng tìm kiếm
  ////////////////
  searchBtn.onclick = function () {
    listFilm.innerHTML = "";
    const apiSearch = `${apiSearch}?keyword=${inputBox.value}`;
    function dataFilm(callback) {
      fetch(apiSearch)
        .then((response) => response.json())
        .then(callback);
    }
    dataFilm(function (datas) {
      const dataItems = datas.pageProps.data.items;
      // const dataItems = datas.items;
      dataItems.forEach(function (item) {
        renderListFilm(item);
      });

      const itemTitle = document.querySelectorAll(".item-title");
      console.log(itemTitle);
      itemTitle.forEach(function (item) {
        renderFilm(item);
      });
      const itemImg = document.querySelectorAll(".item-img");
      itemImg.forEach(function (item) {
        renderFilm(item);
      });
    });
  };
});

// const apiSearch = `https://ophim.tv/_next/data/EdPTJFKDsGXjfsHhzTxX1/tim-kiem.json?keyword=${keyword}`;

const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector(".icon-search");

document.addEventListener("DOMContentLoaded", function () {
  const totalPages = 20;
  const paginationElement = document.getElementById("pagination");

  function renderPagination(currentPage) {
    paginationElement.innerHTML = "";

    const visiblePages = 2;
    const startPage = Math.max(1, currentPage - visiblePages);
    const endPage = Math.min(totalPages, currentPage + visiblePages);

    // Add first page
    createPageElement(1, currentPage);

    // Add '...' if there are hidden pages before the startPage
    if (startPage > 2) {
      const ellipsisElement = createEllipsis();
      ellipsisElement.addEventListener("click", function () {
        renderPagination(startPage - 1);
      });
      paginationElement.appendChild(ellipsisElement);
    }

    // Add pages between startPage and endPage
    for (let i = startPage; i <= endPage; i++) {
      createPageElement(i, currentPage);
    }

    // Add '...' if there are hidden pages after the endPage
    if (endPage < totalPages - 1) {
      const ellipsisElement = createEllipsis();
      ellipsisElement.addEventListener("click", function () {
        renderPagination(endPage + 1);
      });
      paginationElement.appendChild(ellipsisElement);
    }

    // Add last page
    createPageElement(totalPages, currentPage);
  }

  function createPageElement(pageNumber, currentPage) {
    const pageElement = document.createElement("div");
    pageElement.classList.add("page");
    if (pageNumber === currentPage) {
      pageElement.classList.add("active");
    }
    pageElement.textContent = pageNumber;
    pageElement.addEventListener("click", function () {
      console.log("Clicked page:", pageNumber);
      renderPagination(pageNumber);
    });
    paginationElement.appendChild(pageElement);
  }

  function createEllipsis() {
    const ellipsisElement = document.createElement("div");
    ellipsisElement.textContent = "...";
    ellipsisElement.classList.add("ellipsis");
    return ellipsisElement;
  }

  // Initial rendering with the first page active
  renderPagination(1);
});
