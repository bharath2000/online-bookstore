import BooksCard from "./BooksCard";

const BooksPage = ({books, isHomePage, addBook}: {books: ({
    id: string,
    title: string,
    authors: string[], 
    shortdescription: String | null,
    longdescription: String | null, 
    categories: string[] | null,
    thumbnailurl: string | null,
})[], 
isHomePage: boolean,
addBook : (bookId: string) => void}) => {

    return (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            {books.map(book => {
                return <BooksCard key={book.title} book={book} isHomePage={isHomePage} addBook={addBook}/>
            })}
        </div>
    );
};

export default BooksPage;