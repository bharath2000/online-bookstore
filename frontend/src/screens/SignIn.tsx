import axios from "axios";
import { useState } from "react";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    // const [name, setName] = useState('');

    const login =  async (e : React.SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            "username" : email,
            "password" : password,
        }
        try {
            axios.defaults.withCredentials = true;
            const response  = await axios.post('http://localhost:8000/auth/login/password', payload);
            // console.log(response);
            if(response.data.message == "Login Successful"){
                const redirectUrl = response.data.location || "/v1/home";
                window.location.href = redirectUrl;
            }else{
                // console.log(response.data.message);
                setErrorMessage(response.data.message);
            }
        } catch(error) {
            console.log(error);
        }
        
    }
    return (
        <div className="w-screen justify-center">
            <div className="max-w-md mx-auto">
                {errorMessage && <span className="text-red-400">{errorMessage}</span>}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <button type="submit" onClick={login} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </div>
    )
}

export default SignIn;