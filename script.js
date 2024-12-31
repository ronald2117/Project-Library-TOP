class Book {
    constructor(id, title, author, page, ifRead) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.page = page;
        this.ifRead = ifRead;
    }
}

class Dialog {
    static form = document.querySelector('form');
    static bookTitle = document.querySelector('#book-title');
    static bookAuthor = document.querySelector('#book-author');
    static bookPage = document.querySelector('#book-pages');
    static ifRead = document.querySelector('#book-if-read');
    static dialog = document.querySelector('dialog');
    static cancelBtn = document.querySelector('.cancel-dialog-btn');
    static submitBtn = document.querySelector('.submit-dialog-btn');


    static addBook() {
        if (this.bookTitle.value == '' || this.bookAuthor.value == '' || this.bookPage.value == '') {
            alert("Please fill out all fields");
            return;
        }
        const newBook = new Book(Math.random(), this.bookTitle.value, this.bookAuthor.value, this.bookPage.value, this.ifRead.checked);
        Library.library.push(newBook);
        this.dialog.close()
        
        Library.displayBookCards(Library.library);
    }

    static reset() {
        this.bookTitle.value = '';
        this.bookAuthor.value = '';
        this.bookPage.value = '';
        this.ifRead.checked = false;
    }
}

class Library {
    static library = [];
    addBookBtn = document.querySelector('.add-book-btn');
    static booksContainer = document.querySelector('.books-container');

    static displayBookCards(books) {
        this.booksContainer.innerHTML = '';
        for (let book of books) {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
    
            const cardBookTitle = document.createElement('p');
            cardBookTitle.textContent = `"${book.title}"`;
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
                ifReadButton.textContent = 'Finished';
            } else {
                ifReadButton.textContent = 'Not finished';
            }
            bookCard.appendChild(ifReadButton);
            ifReadButton.addEventListener('click', () => {
                if(book.ifRead == true) {
                    ifReadButton.textContent = 'Not finished';
                    book.ifRead = false;
                } else {
                    ifReadButton.textContent = 'Finished';
                    book.ifRead = true;
                }
            })
    
            const deleteCardBtn = document.createElement('button');
            deleteCardBtn.classList.add('delete-card-button');
            deleteCardBtn.textContent = 'Delete';
            bookCard.appendChild(deleteCardBtn);
            deleteCardBtn.addEventListener('click', () => {
                bookCard.remove();
                this.library = this.library.filter(item => item.id !== book.id);
            }) 
    
            this.booksContainer.appendChild(bookCard);
        }
    }

    start() {
        this.addBookBtn.addEventListener('click', () => {
            Dialog.reset();
            Dialog.dialog.showModal();
        })
        
        Dialog.cancelBtn.addEventListener('click', () => {
            Dialog.dialog.close();
        })
        
        Dialog.submitBtn.addEventListener('click', () => {
            Dialog.addBook();
        })
        
        Dialog.dialog.addEventListener('keydown', (e) => {
            if (e.key == "Enter") {
                Dialog.addBook();
            }
        })
    }
}

const library = new Library();
library.start();