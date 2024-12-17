const modal = document.querySelector("#myModal");
const btn = document.querySelector(".header-add-book");
const span = document.querySelector(".close");
const bookName = document.querySelector("#name");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector('#read');
const bookForm = document.querySelector('#modalForm');
const bookGrid = document.querySelector('.books');



function storeElement() {
  // Remove already Existing Items
  localStorage.removeItem('storedElement');

  // Store in the Local Storage

  let element = bookGrid.innerHTML;
  localStorage.setItem('storedElement', element);
}

function loadElement() {
  let storedElement = localStorage.getItem('storedElement');

  if(storedElement) {
    bookGrid.innerHTML = storedElement;
    reattachEventListeners();
  }
}

function removeEventListeners(element, event, handler) {
  element.removeEventListener(event, handler);
}

function reattachEventListeners() {
  const readBookButtons = document.querySelectorAll('.book-read');
  const removeBookButtons = document.querySelectorAll('.book-remove')


  readBookButtons.forEach(button => {

    const toggleRead = () => {
      button.classList.toggle('not');
      button.textContent = button.textContent === 'Read' ? 'Not read' : 'Read';
      storeElement(); // Store the updated state immediately
    };

    removeEventListeners(button, 'click', toggleRead)
    button.addEventListener('click', toggleRead);
  });

  removeBookButtons.forEach(button => {
    const removeBookHandler = (e) => {
      const bookName = e.target.parentElement.querySelector('.book-title').textContent;
      e.target.parentElement.remove();
      Lib.removeBook(bookName);
      storeElement();
    };

    removeEventListeners(button, 'click', removeBookHandler);
    button.addEventListener('click', removeBookHandler);
  });

}

function Book(name = 'unknown', author = 'unknown', pages = '0', read = false) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function Library() {
  this.books = [];

  this.addBook = function(newBook) {
    if(!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  this.getBook = function(bookName) {
    return this.books.find((book) => book.name == bookName);
  }

  this.removeBook = function(bookName) {
    this.books = this.books.filter((book) => book.name !== bookName);
  }

  this.isInLibrary = function(newBook) {
    return this.books.some((book) => book.name == newBook.name)
  }
}

Lib = new Library()


// When the user clicks the button, open the modal
btn.addEventListener('click', function() {
  bookForm.reset();
  modal.style.display = "block";
})

//When the user clicks the form add the book
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(read.value);
    newBook = new Book(bookName.value, author.value, pages.value, read.checked ? true : false);

    Lib.addBook(newBook);

    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('h2');
    const bookPages = document.createElement('h2');
    const readBook = document.createElement('button');
    const removeBook = document.createElement('button');

    bookCard.classList.add('book-card');
    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    bookPages.classList.add('book-pages');
    readBook.classList.add('book-read');
    removeBook.classList.add('book-remove');

    bookTitle.textContent = newBook.name;
    bookAuthor.textContent = newBook.author;
    bookPages.textContent = newBook.pages;
    removeBook.textContent = 'Remove Book';

    const toggleRead = () => {
      readBook.classList.toggle('not');
      readBook.textContent = readBook.textContent === 'Read' ? 'Not read' : 'Read';
      storeElement(); // Store the updated state immediately
    };

    const removeBookHandler = (e) => {
      const bookName = bookCard.querySelector('.book-title').textContent;
      bookCard.remove();
      Lib.removeBook(bookName);
      storeElement();
    };

    readBook.addEventListener('click', toggleRead);

    readBook.textContent = newBook.read ? 'Read' : 'Not Read';
    if (!newBook.read) {
      readBook.classList.add('not');
    }

    removeBook.addEventListener('click', removeBookHandler);

    readBook.textContent = newBook.read ? 'Read' : 'Not Read';
    if (!newBook.read) {
      readBook.classList.add('not');
    }

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(readBook);
    bookCard.appendChild(removeBook);
    bookGrid.appendChild(bookCard);

    storeElement()

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

window.addEventListener('load', loadElement);

