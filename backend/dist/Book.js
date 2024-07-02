"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(title, authors, shortDescription, longDescription, categories, thumbnailUrl) {
        this.title = title;
        this.authors = authors;
        this.shortDescription = shortDescription;
        this.longDescriiption = longDescription;
        this.categories = categories;
        this.thumbnailUrl = thumbnailUrl;
    }
}
exports.Book = Book;
