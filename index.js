const dialog = document.getElementById("book-dialog");
const form = document.getElementById("book-form");
const openBtn = document.getElementById("add-btn");
const closeBtn = document.getElementById("cancel-btn");

document.getElementById("title").addEventListener("input", function () {
  document.getElementById("dialog-cover-title").textContent = this.value;
});

document.querySelectorAll('input[name="selected_color"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("dialog-cover").style.backgroundColor = this.value;
  });
});

openBtn.addEventListener("click", () => {
  dialog.showModal(); // Opens the dialog
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

// const myLibrary = [
//   {
//     id: ,
//     title: ,
//     authos: ,
//     pages: ,
//     read:
//   },
//   {},
//   {},
// ];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}
