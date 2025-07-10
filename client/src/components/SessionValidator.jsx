import { signInSuccess, signoutSuccess } from '../redux/user/userSlice';
import { useDispatch} from 'react-redux';

// const dispatch = useDispatch();
export const validateSession = async (dispatch) => {
    try {
        const response = await fetch('/api/auth/check', {
            method: 'GET',
            credentials: 'include', // This ensures cookies are sent with the request
        });
        if (response.ok) {
            const data = await response.json(); // Parse the JSON response
            dispatch(signInSuccess(data)); // Update Redux state
        } else {
            dispatch(signoutSuccess()); // Clear Redux state on failure
        }
    } catch (error) {
        console.error('Failed to validate session:', error);
        dispatch(signoutSuccess()); // Clear Redux state in case of an error
    }
};
