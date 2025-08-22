import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router";
import auth from "../firebase/firebase.init";

const Login = () => {
    const [loginError, setLogInError] = useState('');
    const [loginSuccess, setLogInSuccess] = useState('');
    const emailRef = useRef(null);
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
    // handle forget password
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        console.log("🚀 ~ handleForgetPassword ~ email:", email);
        // validate email before sending reset link
        if(!email){
            setLogInError('Please enter your email to reset password!');
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            setLogInError("Please enter a valid email address!");
            return;
        }
        setLogInError('') // reset error state on each render

        // send password reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setLogInSuccess("Password reset email sent! Please check your email.");
            })
            .catch(error => {
                setLogInError(error.message);
            })
    }
    return (
        <div className=" mx-auto w-96">
            <form onSubmit={handleLogIn}>
                <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Log In</legend>

                <label className="label">Email</label>
                <input 
                ref={emailRef}
                type="email" 
                name="email" 
                className="input" 
                placeholder="Email" required />

                <label className="label">Password</label>
                <input 
                type='password'
                name="password" 
                className="input" 
                placeholder="Password" 
                required />
                <label onClick={handleForgetPassword} className="label">
                    <span className="label-text-alt link link-hover">Forget Password</span>
                </label>

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