import { useContext } from "react";
import { initializeApp } from "firebase/app"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import firebaseConfig from '../config/firebase';
import UserContext from "../ContextComponent/ContextComponent";
import Swal from 'sweetalert2'; // Import Swal for popups

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

      // Send Issue Data along with the Firebase image URL
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
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Issue Created Successfully!',
          text: 'Your issue was successfully listed on UniHelpDesk!',
          showConfirmButton: false,
          timer: 2000,
          background: '#f0f9ff',
          color: '#0f172a'
        });

        navigate('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an issue creating the issue, please try again...',
          background: '#fef2f2',
          color: '#7f1d1d'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        background: '#fef2f2',
        color: '#7f1d1d'
      });
    }
  };

  return { createIssue };
}

export default useCreateIssue;
