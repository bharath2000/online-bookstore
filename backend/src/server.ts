import express, { Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { BookService } from './BookService';
import passport from 'passport';
import authRouter from './router/authRouter';
import initPassport from './passport';

const app = express();
const PORT = 8000;

app.use(cors({
    origin: 'http://localhost:5173', // frontend base url
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

const bookService = new BookService();

app.use(session({
    secret: 'keyboard cat', // Replace with a strong, unique secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using https in production
}));

initPassport()
app.use(passport.initialize())
app.use(passport.session());

app.use('/auth', authRouter);

app.get('/books', async (req, res) => {
    const data = await bookService.getBooks();
    res.json(data);
    // console.log(data);
});

// app.get('/books', getBooks)

app.get('/books/:bookId', async (req, res: Response) => {
    const { bookId } = req.params
    const data = await bookService.getBook(bookId);
    res.json(data);
});

app.get('/test', (req, res) => {
    console.log(req.user);
    res.send("Hey")
});

app.post('/books/create', (req, res) => {
    const { title, authors, shortDescription, longDescription, categories, thumbnailUrl} = req.body;
    try {
        bookService.createBook(title, authors, shortDescription, longDescription, categories, thumbnailUrl);
        res.sendStatus(200);
    } catch {
        console.log("Unable to create the book");
        res.status(500).json({message: "Internal Service Error"});
    }
    
});

app.post('/books/addbook/user', async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        await bookService.addBookOfUser(userId, bookId);
        res.json({message: "Book successfully Added"});
    } catch {
        console.error("Unable to add book for user");
        res.status(500).json({message: "Internal Service Error"});
    }
    
})

app.get('/books/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const data = await bookService.getBooksOfUser(userId);
        res.json(data);
    } catch {
        console.error("Unable to get books of the user");
        res.status(500).json({message: "Internal Service Error"});
    }
    
})

app.get('/books/category/:category', async (req, res) => {
    const { category } = req.params;
    // console.log(category);
    const data = await bookService.getBookCategory(category);
    res.json(data);
});

app.get('/books/byAuthor/:author', async (req, res) => {
    const { author } = req.params;
    const data = await bookService.getBooksByAuthor(author);
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});