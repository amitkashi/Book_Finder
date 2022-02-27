const searchBtn = document.getElementById("search-btn");
const bookList = document.getElementById("book");

// event listenners
searchBtn.addEventListener("click", getBookList);

// get book list
function getBookList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputTxt}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.items[1].volumeInfo);
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
                <p>${item.volumeInfo.description}</p>
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
