import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router";
import auth from "../firebase/firebase.init";

const Login = () => {
    const [loginError, setLogInError] = useState('');
    const [loginSuccess, setLogInSuccess] = useState('');
    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setLogInError(''); // reset error state on each render
        setLogInSuccess(''); // reset success state on each render
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log("🚀 ~ handleLogIn ~ loggedInUser:", loggedInUser)
                setLogInSuccess("User Logged In Successfully!");
            })
            .catch(error => {
                console.error("Error logging in:", error);
                setLogInError(error.message);
            })
    }
    return (
        <div className=" mx-auto w-96">
            <form onSubmit={handleLogIn}>
                <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Log In</legend>

                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required />

                <label className="label">Password</label>
                <input 
                type='password'
                name="password" 
                className="input" 
                placeholder="Password" 
                required />

                <button className="btn btn-neutral mt-4">Log In</button>
            </fieldset>
            </form>
            {
                loginError && <p className="text-red-600 font-bold">{loginError}</p>
            }
            {
                loginSuccess && <p className="text-green-600 font-bold">{loginSuccess}</p>
            }
            <p>New to this website? Please <Link className="text-violet-600" to='/register'>Register</Link></p>
        </div>
    );
};

export default Login;