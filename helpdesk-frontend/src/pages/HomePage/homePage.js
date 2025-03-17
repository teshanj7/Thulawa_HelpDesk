import { useContext } from "react";
import MainComponent from "../../componets/MainComponent/mainComponent";
import SearchBar from "../../componets/SearchComponent/searchComponent";
import HelpCenter from "../../componets/HelpCenterComponent/helpCenterComponent";
import Knowledgebase from "../../componets/KnowledgebaseComponent/knowledgebaseComponent";
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
                    <div className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400">
                        <SearchBar/>
                        <HelpCenter/> <br/>
                        <MainComponent /> <br/>
                        <Knowledgebase/>
                    </div>
                </>
            )}
        </>
    );
}