import { useEffect, useState } from "react";
import BooksPage from "../components/BooksPage";
import axios from "axios";
import { useUser } from "../hooks/useUser";

const MyBooks = () => {
    const user = useUser();
    const [myBooks, setMyBooks] = useState([]);
    useEffect(() => {
        if(!user){
            window.location.href = "/v1/signin";
        }
    }, [user])
    useEffect(() => {
        const dataLoader = async () => {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`http://localhost:8000/books/user/${user.id}`);
            setMyBooks(response.data);
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
    
    // if(!myBooks.length) {
    //     return (
    //         <div className="flex-grow pl-5 overflow-y-auto"><span className="font-bold text-3xl p-6">No books Added for {user.username}!!</span> </div>
    //     )
    // }
    return (
        <div className="flex-grow pl-5 overflow-y-auto">
            <BooksPage books={myBooks} isHomePage={false} addBook={addBook}/>
        </div>
    )
}

export default MyBooks;