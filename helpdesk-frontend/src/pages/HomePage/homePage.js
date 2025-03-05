import { useContext } from "react";
import MainComponent from "../../componets/MainComponent/mainComponent";
import AdminPage from "../../componets/AdminComponent/adminComponent";
import UserContext from "../../ContextComponent/ContextComponent";

export default function HomePage() {

    const { user } = useContext(UserContext);

    // Check if user is an admin
    const isAdmin = user && user.UserType === "admin";

    return (
        <>
            {isAdmin ? (
                <AdminPage />
            ) : (
                <>
                    <MainComponent />
                </>
            )}
        </>
    );
}