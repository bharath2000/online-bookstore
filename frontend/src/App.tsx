
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./screens/HomePage";
import CreateBook from "./screens/CreateBook";
import SideBar from "./components/SideBar";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import MyBooks from "./screens/MyBooks";
import { Suspense } from "react";
import { Loader } from "./components/Loader";
import Book from "./screens/Book";

function App() {
  
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter basename="/v1">
        <div className="flex pt-3 w-screen h-screen">
          <div className="flex">
              <SideBar />
          </div>
          <div className="flex pt-3">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/addBook" element={<CreateBook />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/myBooks" element={<MyBooks />} />
            <Route path="/book/:bookId" element={<Book />} />
          </Routes>
          </div>
        </div>
        
      </BrowserRouter>
    </Suspense>
    
  )
}

export default App
