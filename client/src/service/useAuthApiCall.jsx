import { useNavigate } from 'react-router-dom';
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';
import {useDispatch} from 'react-redux'
import { fetchFail,fetchStart, loginSuccess,registerSucess,logoutSuccess } from '../features/authSlice';
import useAxios from './useAxios';



export const useAuthApiCall = () => {
    const navigate = useNavigate();
    const {axiosPublicInsist,axiosPrivateSimpleTokenInsist}=useAxios()
    const dispatch=useDispatch()


    const signIn = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const response = await axiosPublicInsist.post('/auth/login', userInfo);

            if (!response.data.error) {
                dispatch(loginSuccess(response.data))
                toastSuccessNotify("Your login is successful, you will be redirected to the main page");
                navigate('/stock');
            }
        } catch (error) {
            dispatch(fetchFail())
            console.log("error:", error);
            toastErrorNotify("Email or password wrong");
        }
    };

    const signUp = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const response = await axiosPublicInsist.post('/user', userInfo);
            if (!response.data.error) {
                alert("You are registered successly and  navigate you")
                dispatch(registerSucess(response.data))
                toastSuccessNotify("You are registered successly");
                navigate('/stock');
                console.log("registered",response.data)
            }
        } catch (error) {
            console.log("error:", error);
            toastErrorNotify("kayıt yapılamadı")
        }
    };
    const Logout=async ()=>{
        try {
            // await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`,{},{
            //     headers:{Authorization:`Token ${token}`}
            // })
            await axiosPrivateSimpleTokenInsist.post('/auth/logout')
            toastSuccessNotify("You are logout")
            dispatch(logoutSuccess())


            
        } catch (error) {
            
            console.log("err",error)
            toastErrorNotify("çıkış başarısız")
        }
    }

    return { signIn, signUp,Logout };
};
