import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.init";

const Login = () => {
    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log("🚀 ~ handleLogIn ~ loggedInUser:", loggedInUser)
            })
            .catch(error => {
                console.error("Error logging in:", error);
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
                <span>Show</span>

                <button className="btn btn-neutral mt-4">Log In</button>
            </fieldset>
            </form>
        </div>
    );
};

export default Login;