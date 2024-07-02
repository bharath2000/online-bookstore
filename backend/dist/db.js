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
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = process.env.POSTGRESQL_USER;
const database = process.env.POSTGRESQL_DB;
const password = process.env.POSTGRESQL_PASSWORD;
class db {
    constructor() {
        // console.log("db constructor called");
        this.pool = new Pool({
            host: 'localhost',
            user: user,
            max: 10,
            database: database,
            password: password,
            port: 5432,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
    }
    getUser(query, values, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query(query, values);
                cb(null, result.rows);
                // return result.rows
            }
            catch (error) {
                cb(error, null);
                throw error;
            }
        });
    }
    createUser(email, password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'INSERT INTO users(email, password, name) VALUES($1, $2, $3)';
                const values = [email, password, username];
                const result = yield this.pool.query(query, values);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM books ORDER BY id ASC');
                return result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM books where id=$1', [bookId]);
                return result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBooksOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM books where books.id IN (SELECT book_id from user_book where user_id=$1)', [userId]);
                return result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addBookOfUser(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'INSERT into user_book(user_id, book_id) VALUES($1, $2)';
                const result = yield this.pool.query(query, [userId, bookId]);
                return result.rows;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getBooksByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM books WHERE $1 IN (SELECT unnest(categories))', [category]);
                return result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBooksByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM books WHERE $1 IN (SELECT unnest(authors))', [author]);
                return result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createBook(title, authors, shortDescription, longDescription, categories, thumbnailUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'INSERT INTO books(title, authors, shortDescription, longDescription, categories, thumbnailUrl) VALUES($1, $2, $3, $4, $5, $6)';
                const values = [title, authors, shortDescription, longDescription, categories, thumbnailUrl];
                const result = yield this.pool.query(query, values);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = db;
