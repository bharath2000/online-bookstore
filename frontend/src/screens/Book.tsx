import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Book = () => {
    const { bookId } = useParams();
    type BookType = {id: string, title: string, authors: Array<string>, shortdescription: string, longdescription: string, categories: Array<string>, thumbnailurl: string}
    const [bookContent, setBookContent] = useState<BookType>();
    useEffect(() => {
        const dataLoader = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/books/${bookId}`);
                setBookContent(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        }
        dataLoader();
    }, []);
        
    return (
        <div className="flex flex-col p-2">
            <h2 className="text-4xl flex justify-center font-extrabold dark:text-white">{bookContent?.title}</h2>
            <div className="flex justify-center">
                <p className="my-4 text-lg text-gray-500 w-2/3">{bookContent?.longdescription}</p>
            </div>
        </div>
    )
}
export default Book;