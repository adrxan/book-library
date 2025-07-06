const dialog = document.getElementById("book-dialog");
const form = document.getElementById("book-form");
const addBtn = document.getElementById("add-btn");
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

addBtn.addEventListener("click", () => {
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
  countBooks();
});

const myLibrary = [
  {
    id: "4c88ce4c-2375-4e15-9f1f-f1fa6f16e2f4",
    title: "The Metamorphosis",
    author: "Franz Kafka",
    pages: 70,
    read: true,
    selectedColor: "var(--cover-blue)",
  },
  {
    id: "d77326b5-b997-4c73-84c7-dee40ef7a3b0",
    title: "A Little Life",
    author: "Hanya Yanagihara",
    pages: 832,
    read: false,
    selectedColor: "var(--cover-green)",
  },
  {
    id: "d9da8853-754d-41c6-b441-e3df7956df19",
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
    pages: 480,
    read: true,
    selectedColor: "var(--cover-grey)",
  },
];

displayBooks();
countBooks();

class Book {
  constructor(title, author, pages, read, selectedColor) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.selectedColor = selectedColor;
  }
}

function displayBooks() {
  const isEditing = document
    .getElementById("edit-btn")
    .classList.contains("active-state");

  const bookLibrary = document.getElementById("library-grid");
  bookLibrary.innerHTML = "";
  let lastAddedBook;
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const bookItem = document.createElement("div");
    bookItem.innerHTML = `
      <div class="book book-frame" data-book-id="${book.id}">
          <p class="delete-btn">Delete</p>
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
                  <p class="book-read">${book.read ? "Finished" : "Unread"}</p>
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

  if (isEditing) {
    setEditMode(true);
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
  if (myLibrary.length > 0) {
    editButton.classList.remove("inactive-state");
  }
  displayBooks();
}

function countBooks() {
  const unreadCount = myLibrary.filter((book) => book.read === false).length;
  const totalCount = myLibrary.length;
  document.getElementById("book-count").innerHTML =
    `${unreadCount} Unread, ${totalCount} Total`;
}

const editButton = document.getElementById("edit-btn");
const bookLibrary = document.getElementById("library-grid");

function setEditMode(isEditing) {
  const books = document.querySelectorAll(".book");

  books.forEach((book) => {
    book
      .querySelector(".book-read-status")
      ?.classList.toggle("active-state", isEditing);
    book.querySelector(".delete-btn")?.classList.toggle("visible", isEditing);
  });

  editButton.textContent = isEditing ? "Done" : "Edit";
  editButton.classList.toggle("active-state", isEditing);
  addBtn.classList.toggle("inactive-state", isEditing);
}

editButton.addEventListener("click", () => {
  const isEditing = !editButton.classList.contains("active-state");
  setEditMode(isEditing);
});

bookLibrary.addEventListener("click", (e) => {
  if (!editButton.classList.contains("active-state")) return;

  const bookElement = e.target.closest(".book");
  if (!bookElement) return;

  const bookId = bookElement.dataset.bookId;

  if (e.target.closest(".book-read-status")) {
    const book = myLibrary.find((b) => b.id === bookId);
    if (book) {
      book.read = !book.read;
      updateUI();
    }
    return;
  }

  if (e.target.classList.contains("delete-btn")) {
    const bookIndex = myLibrary.findIndex((b) => b.id === bookId);
    if (bookIndex === -1) return;

    myLibrary.splice(bookIndex, 1);
    updateUI();

    if (myLibrary.length === 0) {
      setEditMode(false);
      editButton.classList.add("inactive-state");
    }
  }
});

function updateUI() {
  displayBooks();
  countBooks();
}
