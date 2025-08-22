import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router";
import auth from "../firebase/firebase.init";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // handle form submission
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // check password strength
        if(password.length < 6){
            setRegisterError("Password should be at least 6 characters");
            return;
        }
        else if(!/([A-Z])/.test(password)){
            setRegisterError("Password should contain at least one uppercase letter");
            return;
        }

        setRegisterError(''); // reset error state on each render
        setRegisterSuccess(''); // reset success state on each render
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log("🚀 ~ handleSubmit ~ loggedInUser:", loggedInUser)

                // send verification email
                sendEmailVerification(loggedInUser)
                    .then(() => {
                        alert("Please check your email for verification!");
                    })
                    .catch(error => {
                        alert("Error sending email verification: ", error);
                    })
                setRegisterSuccess("User Register Successfully!");
            })
            .catch(error => {
                console.error("Error creating user:", error);
                setRegisterError(error.message);
            })
    }
    return (
        <div className=" mx-auto w-96">
            <form onSubmit={handleSubmit}>
                <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Register</legend>

                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required />

                <label className="label">Password</label>
                <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                className="input" 
                placeholder="Password" 
                required />
                <span onClick={()=> setShowPassword(!showPassword)}>Show</span>

                <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
            </form>
            {
                registerError && <p className="text-red-600 font-bold">{registerError}</p>
            }
            {
                registerSuccess && <p className="text-green-600 font-bold">{registerSuccess}</p>
            }
            <p>Already have an account? Please <Link className='text-violet-600' to='/login'>Login</Link></p>
        </div>
    );
};

export default Register;