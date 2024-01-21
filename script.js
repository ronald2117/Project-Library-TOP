const dialog = document.querySelector('dialog');
const addBookBtn = document.querySelector('.add-book-btn');
const booksContainer = document.querySelector('.books-container');
const cancelDialogBtn = document.querySelector('.cancel-dialog-btn');
const submitDialogBtn = document.querySelector('.submit-dialog-btn');
const form = document.querySelector('form');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPage = document.querySelector('#book-pages');
const ifRead = document.querySelector('#book-if-read');

let library = [];

function Book(title, author, page, ifRead) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.ifRead = ifRead;
}

function displayBooks(books) {
    booksContainer.innerHTML = '';
    for (let book of books) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const cardBookTitle = document.createElement('p');
        cardBookTitle.textContent = book.title
        bookCard.appendChild(cardBookTitle);

        const cardBookAuthor = document.createElement('p');
        cardBookAuthor.textContent = book.author;
        bookCard.appendChild(cardBookAuthor);

        const cardBookPage = document.createElement('p');
        cardBookPage.textContent = 'Pages: ' + book.page;
        bookCard.appendChild(cardBookPage);

        const ifReadButton = document.createElement('button');
        ifReadButton.classList.add('if-read-button');
        if (book.ifRead == true) {
            ifReadButton.textContent = 'Read';
        } else {
            ifReadButton.textContent = 'Not read yet'
        }
        bookCard.appendChild(ifReadButton);

        const deleteCardBtn = document.createElement('button');
        deleteCardBtn.classList.add('delete-card-button');
        deleteCardBtn.textContent = 'Delete';
        bookCard.appendChild(deleteCardBtn);

        booksContainer.appendChild(bookCard);
    }
}

addBookBtn.addEventListener('click', () => {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPage.value = '';
    ifRead.checked = false;
    dialog.showModal();
})

cancelDialogBtn.addEventListener('click', () => {
    dialog.close();
})

submitDialogBtn.addEventListener('click', () => {

    if (bookTitle.value == '' || bookAuthor.value == '' || bookPage.value == '') {
        alert("Please fill out all fields");
        return;
    }
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPage.value, ifRead.checked);
    library.push(newBook);
    dialog.close()
    
    displayBooks(library);
})





