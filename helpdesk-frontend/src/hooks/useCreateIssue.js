import { useContext } from "react";
import { initializeApp } from "firebase/app"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import firebaseConfig from '../config/firebase';
import UserContext from "../ContextComponent/ContextComponent";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize storage with the Firebase app

const useCreateIssue = () => {

  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  
    const createIssue = async (
        UserId,
        studentName,
        studentEmail,
        studentRegistrationNo,
        studentFaculty,
        studentCampus,
        studentContactNo,
        issueType,
        issueMessage,
        issueAttachment,
        issueStatus,
        issueCreatedDate,
        issueResolvedBy,
        issueResolvedDate,
        issueResolvedMessage
      ) => {
        try {
          // Uploading image to Firebase Storage
          const imageFileName = Date.now().toString();
          const imageRef = ref(storage, `issue-images/${imageFileName}`);
          await uploadBytes(imageRef, issueAttachment);
    
          const imageUrl = await getDownloadURL(imageRef);
    
          //Send Product Data along with the firebase image URL
          const response = await axios.post("http://localhost:8070/issue/createIssue", {
            UserId,
            studentName,
            studentEmail,
            studentRegistrationNo,
            studentFaculty,
            studentCampus,
            studentContactNo,
            issueType,
            issueMessage,
            issueAttachment: imageUrl,
            issueStatus,
            issueCreatedDate,
            issueResolvedBy,
            issueResolvedDate,
            issueResolvedMessage
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request header
            },
          }
        );
    
          if (response.status === 200) {
            alert("Your Issue was successfully listed on uniHelpDesk!");
            navigate('/home');
          } else {
            alert("There was an issue creating the issue, please try again...");
          }
        } catch (error) {
          alert(error.message);
        }
      };
    
      return { createIssue };
}

export default useCreateIssue;