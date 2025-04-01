const dialog = document.getElementById("book-dialog");
const form = document.getElementById("book-form");
const openBtn = document.getElementById("add-btn");
const closeBtn = document.getElementById("cancel-btn");

const bookId = document.getElementById("book-id");
const title = document.getElementById("title").value;
let dialogTitle = document.getElementById("title");
const author = document.getElementById("author").value;
const pages = document.getElementById("pages").value;
const read = document.getElementById("read").checked;
const bookColor = document.querySelectorAll('input[name="selected_color"]');

dialogTitle.addEventListener("input", function () {
  document.getElementById("dialog-cover-title").textContent = this.value;
});

bookColor.forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("dialog-cover").style.backgroundColor = this.value;
  });
});

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addBookToLibrary();
  form.reset();
  dialog.close();
});

dialog.addEventListener("close", () => {
  form.reset();
  document.getElementById("dialog-cover-title").textContent = "";
  document.getElementById("dialog-cover").style.backgroundColor =
    `var(--cover-white)`;
});

const myLibrary = [
  {
    id: "4c88ce4c-2375-4e15-9f1f-f1fa6f16e2f4",
    title: "The Metamorphosis",
    author: "Franz Kafka",
    pages: 70,
    read: true,
    selectedColor: "var(--cover-white)",
  },
  {
    id: "d77326b5-b997-4c73-84c7-dee40ef7a3b0",
    title: "A Little Life",
    author: "Hanya Yanagihara",
    pages: 832,
    read: false,
    selectedColor: "var(--cover-blue)",
  },
  {
    id: "d9da8853-754d-41c6-b441-e3df7956df19",
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
    pages: 480,
    read: true,
    selectedColor: "var(--cover-orange)",
  },
];

displayBooks();

function Book(title, author, pages, read, selectedColor) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.selectedColor = selectedColor;
}

function displayBooks() {
  const bookLibrary = document.getElementById("library-grid");
  bookLibrary.innerHTML = "";
  let lastAddedBook;
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i]);
    const book = myLibrary[i];
    const bookItem = document.createElement("div");
    bookItem.innerHTML = `
      <div class="book book-frame">
          <div class="book-cover-frame">
              <div class="book-cover" style="background-color: ${book.selectedColor}">
                  <h3
                      class="book-cover-title instrument-serif-regular"
                  >
                  ${book.title}
                  </h3>
              </div>
              <div class="page-count">
                  <p class="page-amount">${book.pages} pp.</p>
              </div>
          </div>
          <div class="book-info">
              <div class="book-info-name">
                  <h3 class="book-title">${book.title}</h3>
                  <h5 class="book-author">by ${book.author}</h5>
              </div>
              <div class="book-read-status">
                  <p class="book-read">${book.read ? "Read" : "Unread"}</p>
              </div>
          </div>
      </div>`;
    bookLibrary.appendChild(bookItem);

    if (i === myLibrary.length - 1) {
      lastAddedBook = bookItem;
    }
  }
  if (lastAddedBook) {
    lastAddedBook.scrollIntoView({ behavior: "smooth" });
  }
}

function addBookToLibrary() {
  let title = form.title.value;
  let author = form.author.value;
  let pages = form.pages.value;
  let read = form.read.checked;
  let selectedColor = document.querySelector(
    'input[name="selected_color"]:checked',
  ).value;
  const book = new Book(title, author, pages, read, selectedColor);
  myLibrary.push(book);
  displayBooks();
}
