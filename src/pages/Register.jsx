import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.init";

const Register = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log("🚀 ~ handleSubmit ~ loggedInUser:", loggedInUser)
            })
            .catch(error => {
                console.error("Error creating user:", error);
            })
    }
    return (
        <div className=" mx-auto w-96">
            <form onSubmit={handleSubmit}>
                <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Register</legend>

                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" />

                <label className="label">Password</label>
                <input type="password" name="password" className="input" placeholder="Password" />

                <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
            </form>
        </div>
    );
};

export default Register;