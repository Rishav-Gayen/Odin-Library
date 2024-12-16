const modal = document.querySelector("#myModal");
const btn = document.querySelector(".header-add-book");
const span = document.querySelector(".close");
const bookName = document.querySelector("#name");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector('#read');
const bookForm = document.querySelector('#modalForm');

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


// When the user clicks the button, open the modal
btn.addEventListener('click', function() {
  modal.style.display = "block";
})

//When the user clicks the form add the book
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();



    console.log(bookName.value);
    console.log(author.value);
    console.log(pages.value);
    console.log(read.value);
})

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
    modal.style.display = "none";
  }) 

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}) 