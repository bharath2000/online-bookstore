"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const db_1 = __importDefault(require("./db"));
class BookService {
    constructor() {
        this.books = [];
        this.db = new db_1.default();
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.getBooks();
            return res;
        });
    }
    getBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.getBook(bookId);
            return res;
        });
    }
    getBooksOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.getBooksOfUser(userId);
            return res;
        });
    }
    addBookOfUser(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.addBookOfUser(userId, bookId);
            return res;
        });
    }
    getBookCategory(bookCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.getBooksByCategory(bookCategory);
            return res;
        });
    }
    getBooksByAuthor(bookAuthor) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.getBooksByAuthor(bookAuthor);
            return res;
        });
    }
    createBook(title, authors, shortDescription, longDescription, categories, thumbnailUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.createBook(title, authors, shortDescription, longDescription, categories, thumbnailUrl);
        });
    }
}
exports.BookService = BookService;
