import { useNavigate } from "react-router-dom";

const BooksCard = ({book, isHomePage, addBook}: {
    book: {
        id: string,
        title: string,
        authors: string[], 
        shortdescription: String | null,
        longdescription: String | null, 
        categories: string[] | null,
        thumbnailurl: string | null,
    },
    isHomePage: boolean,
    addBook : (bookId: string) => void
}) => {
    const navigate = useNavigate();
    const onAdd = () => {
        addBook(book.id);
    }
    const handleClick = () => {
        navigate(`/book/${book.id}`)
        console.log(`${book.id}`)
    }

    return (
        <div {...(isHomePage === false && { onClick: handleClick })} className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ` + (isHomePage === true ? "" : "cursor-pointer")}>
            <div className="flex justify-center h-60 w-35">{book.thumbnailurl && <img src={book.thumbnailurl} /> }</div>
            <p className="text-xs text-gray-700 text-center h-8">{book.title}</p>
            {
                isHomePage === true &&
                <div className="flex justify-center">
                    <button onClick={onAdd} className="inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add
                    </button>
                    
                </div>
            }
            
        </div>

    )
};

export default BooksCard;