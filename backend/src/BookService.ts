import { Book } from "./Book";
import db from './db';

export class BookService {
    private books: Book[];
    private db;

    constructor(){
        this.books = [];
        this.db = new db();
    }

    async getBooks(): Promise<Book[]> {
        const res = await this.db.getBooks();
        return res;
    }

    async getBook(bookId: string) {
        const res = await this.db.getBook(bookId);
        return res;
    }

    async getBooksOfUser(userId: string): Promise<Book[]> {
        const res = await this.db.getBooksOfUser(userId);
        return res;
    }

    async addBookOfUser(userId: string, bookId: string): Promise<Book[]> {
        const res = await this.db.addBookOfUser(userId, bookId);
        return res;
    }

    async getBookCategory(bookCategory: string): Promise<Book[]> {
       
        const res = await this.db.getBooksByCategory(bookCategory);
        return res;
    }
    
    async getBooksByAuthor(bookAuthor: string): Promise<Book[]> {
        
        const res = await this.db.getBooksByAuthor(bookAuthor);
        return res;
    }
    async createBook(
        title: string,
        authors: string, 
        shortDescription: string,
        longDescription: string, 
        categories: string,
        thumbnailUrl: string,
    ) {
        await this.db.createBook(title, authors, shortDescription, longDescription, categories, thumbnailUrl);
    }


}