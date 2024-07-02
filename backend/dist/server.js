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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const BookService_1 = require("./BookService");
const passport_1 = __importDefault(require("passport"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const passport_2 = __importDefault(require("./passport"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // frontend base url
    credentials: true
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
const bookService = new BookService_1.BookService();
app.use((0, express_session_1.default)({
    secret: 'keyboard cat', // Replace with a strong, unique secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using https in production
}));
(0, passport_2.default)();
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/auth', authRouter_1.default);
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield bookService.getBooks();
    res.json(data);
    // console.log(data);
}));
// app.get('/books', getBooks)
app.get('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const data = yield bookService.getBook(bookId);
    res.json(data);
}));
app.get('/test', (req, res) => {
    console.log(req.user);
    res.send("Hey");
});
app.post('/books/create', (req, res) => {
    const { title, authors, shortDescription, longDescription, categories, thumbnailUrl } = req.body;
    try {
        bookService.createBook(title, authors, shortDescription, longDescription, categories, thumbnailUrl);
        res.sendStatus(200);
    }
    catch (_a) {
        console.log("Unable to create the book");
        res.status(500).json({ message: "Internal Service Error" });
    }
});
app.post('/books/addbook/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId } = req.body;
    try {
        yield bookService.addBookOfUser(userId, bookId);
        res.json({ message: "Book successfully Added" });
    }
    catch (_a) {
        console.error("Unable to add book for user");
        res.status(500).json({ message: "Internal Service Error" });
    }
}));
app.get('/books/user/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield bookService.getBooksOfUser(userId);
        res.json(data);
    }
    catch (_b) {
        console.error("Unable to get books of the user");
        res.status(500).json({ message: "Internal Service Error" });
    }
}));
app.get('/books/category/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    // console.log(category);
    const data = yield bookService.getBookCategory(category);
    res.json(data);
}));
app.get('/books/byAuthor/:author', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author } = req.params;
    const data = yield bookService.getBooksByAuthor(author);
    res.json(data);
}));
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
