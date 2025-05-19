import axios from 'axios';

const useDeleteIssue = () => {
    const onDeleteIssue = async (userId) => {
        try {
            if(window.confirm("Are you sure that you want to delete this issue?")){
                const response = await axios.delete(`http://localhost:8070/issue/deleteIssue/${userId}`);
                if(response.status === 200){
                    return true;
                }
            }
        } catch (error) {
            alert("Error deleting product, please try again..");
        }
        return false;
    };

    return {onDeleteIssue};
}

export default useDeleteIssue;