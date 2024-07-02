import axios from "axios";
import { useState } from "react";

/*
Book requires
        title: String,
        authors: String[], 
        shortDescription: String | null,
        longDescription: String | null, 
        categories: String[] | null,
        thumbnailUrl: String | null,
*/
const CreateBook = () => {

    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [categories, setCategories] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    
    const addBook = async () => {
        const authorsList = authors.split(",").map(item => item.trim());
        const categoriesList = categories.split(",").map(item => item.trim());
        if(!title) {
            return
        }
        const payload = {
            "title": title,
            "authors": authorsList,
            "categories": categoriesList,
            "thumbnailUrl": thumbnailUrl,
            "shortDescription": shortDescription,
            "longDescription": longDescription
        }
        const res = await axios.post("http://localhost:8000/books/create", payload);
        console.log(res);
        setTitle('');
        setAuthors('');
        setCategories('');
        setShortDescription('');
        setLongDescription('');
        setThumbnailUrl('');
    }

    return (
        <div className="w-screen justify-center">
            <div className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Book Title</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" value={authors} onChange={e => setAuthors(e.target.value)} name="authors" id="authors" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Authors , seperated</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" value={categories} onChange={e => setCategories(e.target.value)} name="categories" id="categories" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Categories , seperated</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="url" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} name="thumbnailUrl" id="thumbnailUrl" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thumbnail Url</label>
            </div>
            
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Description</label>
                <textarea id="large-input" value={shortDescription} onChange={e => setShortDescription(e.target.value)} className="block w-full h-20 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Long Description</label>
                <textarea id="large-input" value={longDescription} onChange={e => setLongDescription(e.target.value)} className="block w-full h-32 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <button type="submit" onClick={addBook} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>

        </div>
    )
}

export default CreateBook;