import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import UserContext from "../ContextComponent/ContextComponent";

const useViewIssueById = (userId) => {
    const [issueData, setIssueData] = useState(null);
    
    // Get token from UserContext outside useEffect
    const { token } = useContext(UserContext);

    useEffect(() => {
        const viewIssues = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/issue/getAllIssuesByUserId/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token here
                    }
                });

                if (response.status === 200) {
                    setIssueData(response.data);
                }
            } catch (error) {
                console.error("Error fetching user issues:", error);
            }
        };

        if (token) {
            viewIssues();
        }

    }, [userId, token]); // Add token to dependency array

    return { issueData };
};

export default useViewIssueById;
