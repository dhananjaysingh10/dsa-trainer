// import { Button } from 'flowbite-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import { AiFillGoogleCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase.js'
import API from "../lib/api";


export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            // console.log(resultFromGoogle);
            const res = await API.post('/auth/google', {
                name: resultFromGoogle.user.displayName,
                email: resultFromGoogle.user.email,
                googlePhotoUrl: resultFromGoogle.user.photoURL
            }, { withCredentials: true })
            const data = res;
            console.log(res);
            if (res.status == 200) {
            console.log(data.data);
                dispatch(signInSuccess(data.data));
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        //     <>c
        <button type='button' outline onClick={handleGoogleClick} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition">
            {/* // <Button type='button' outline > */}
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </button>
        // </>

    )
}
