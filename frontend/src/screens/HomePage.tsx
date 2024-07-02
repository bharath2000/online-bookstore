import { useEffect, useState } from "react";
import BooksPage from "../components/BooksPage";
import axios from "axios";
import { useUser } from "../hooks/useUser";

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const user = useUser();
    useEffect(() => {
        const dataLoader = async () => {
            axios.defaults.withCredentials = true;
            const response = await axios.get("http://localhost:8000/books/");
            setBooks(response.data);
            // console.log(response.data);
            
        }
        dataLoader();
    }, []);

    const addBook = async (bookId: string) => {
        if(!user) {
            alert("User is not logged In");
            return;
        }
        const payload = {
            userId: user.id,
            bookId: bookId
        }
        try {
            await axios.post("http://localhost:8000/books/addbook/user", payload);
            alert("book added");
        } catch {
            alert("Error Adding the Book");
        }
    }
    return (
        <div className="flex-grow pl-5 overflow-y-auto">
            <BooksPage books={books} isHomePage={true} addBook={addBook}/>
        </div>
    )
}

export default HomePage;