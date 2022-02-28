const searchBtn = document.getElementById("search-btn");
const bookList = document.getElementById("book");
const bookDetailsContent = document.querySelector(".book-details-content");
const detailsCloseBtn = document.getElementById("details-close-btn");

// event listenners
searchBtn.addEventListener("click", getBookList);
bookList.addEventListener("click", getBookDetails);
detailsCloseBtn.addEventListener("click", () => {
  bookDetailsContent.parentElement.classList.remove("showDetails");
});

// get book list
function getBookList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputTxt}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.items) {
        data.items.forEach((item) => {
          html += `
        <div class="book-item" data-id = "${item.id}">
            <div class="book-img">
                <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="book">
            </div>
             <div class="book-title">
                <h2>${item.volumeInfo.title}</h3>
                <a href="#" class="details-btn">Description</a>
            </div>
        </div>
      `;
        });
        bookList.classList.remove("notFound");
      } else {
        html = "sorry, we didn't find any book";
        bookList.classList.add("notFound");
      }

      bookList.innerHTML = html;
    });
}

// get book details
function getBookDetails() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputTxt}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.items) {
        data.items.forEach((item) => {
          html = `
            <div class="book-desc">
            <p>${item.volumeInfo.description}</p>
            </div>
      `;
        });
      }
      bookDetailsContent.innerHTML = html;
      bookDetailsContent.parentElement.classList.add("showDetails");
    });
}
