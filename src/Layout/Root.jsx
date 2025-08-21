import { Outlet } from "react-router";
import Nav from "../components/Nav";

const Root = () => {
    return (
        <div>
            <Nav />
            <div className="container mx-auto p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Root;