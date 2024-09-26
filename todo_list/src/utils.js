import { toast } from "react-toastify";

function handleError(error) {
    if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        toast.error('Please try again later.');
    } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from the server.');
    } else {
        console.error('Error setting up the request:', error.message);
    }
}

export const emptyArr = [];

export default handleError