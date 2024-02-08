// import CustomAuthPage from "./customAuthPage";
import { Navigate, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BASE_URL } from "../../libs";
import { AdminAuth } from "../../hooks/useAdminAuthContext";
import wolfgangLogo from "../../assets/wolfgangLogo.png";


const loginSchema = z.object({
    email: z.string().min(5, { message: "Must be 5 or more characters long" }),
    password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

type FormFields = z.infer<typeof loginSchema>;


const Login = () => {
    // const [userData, setUserData] = useState<any>()
    const navigate = useNavigate();

    const { adminAuthData, setAdminAuthData  } = AdminAuth();

    // const LOCAL_STORAGE_KEY = "returnedUserData"

    

    // useEffect(() => {
        // const retrivedUserData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string)
        // console.log(retrivedUserData)

        // if(retrivedUserData) setUserData(retrivedUserData)

        // if (retrivedUserData) {
        //     reset({
        //         email: retrivedUserData.email,
        //         password: retrivedUserData.password,
        //     });
        // }

    // }, [])
    // console.log("userData", userData?.email)


    const {
        handleSubmit,
        register,
        reset,
        formState: { isSubmitting },
    } = useForm<FormFields>({
        // defaultValues: {
        //     email: "Manager@email.com",
        //     password: "password1",
            
        // },
    resolver: zodResolver(loginSchema),
    });


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        
        // console.log("data", data)
        const formData = new FormData();
        
        formData.append("email", data.email);
        formData.append("password", data.password);

        // console.log("formData", formData)
        // console.log("FormData contents:");
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }


        try {
            // toast.loading('Logging In! Please Wait')
            const toastId = toast.loading('Logging In! Please Wait');

             const response = await axios.post(`${BASE_URL}/auth/adminSignIn`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            // console.log("response", response.data)
            setAdminAuthData(response.data)
            // toast.success("Log In Successful", { autoClose: 3000 } as ToastOptions);
            toast.success("Log In Successful", { id: toastId });

                        
            // const json = await response.data()
            
            // if (response.statusText === "OK" ) {
            //     console.log("json response", json )
            // } else {
            //     toast.remove()
            //     toast.error(json.message)
            // }
        } catch (error: any) {
            toast.remove()
            if (error.message === 'Failed to fetch') toast.error('Network Error. Try again')
            else toast.error('Error encountered. Try again')
            // console.log(error.message)
        }
        // toast.remove();

        navigate("/dashboard");
        

        reset()
        // Add your form submission logic here
    };

    if (adminAuthData) {
        return <Navigate to='/dashboard' />;
      }


    return(
        <div className="bg-[#F5F5F5] py-5 px-4 md:px-8 w-[rem] h-[vh] mx-3 my-3 md:my-0 md:mx-0">
            <div className="flex__center bg-primary mb-3 py-2">
                <img src={wolfgangLogo} className="" alt="" />
            </div>
            <h3 className="text-primary text-[1.4rem] md:text-[1.7rem] font-bold text-center ">Log In</h3>
            <p className="text-center mb-6">Don’t have an account? Create an Account</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center flex-col gap-4 md:mx-4 lg:mx-0">
                    <div className="flex flex-col w-full">
                        <label className="font-bold">Email</label>
                        {/* <CustomInput placeholder="Enter password" /> */}
                        <input {...register('email')}  type="text"  className="inputCls" /> 
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="font-bold">Password</label>
                        {/* <CustomInput placeholder="Confirm Password" /> */}
                        <input {...register('password')}  type="text"  className="inputCls" /> 
                    </div>
                </div>

                <p className="my-3"><span>*</span> This field is mandatory</p>
                {/* {backToLogin &&<div className="flex justify-end"><p className="text-primary">Back to Log In</p></div>} */}

                {/* <div className=" flex__center mt-6 mb-3 text-center">                
                    <Link to="/login" className="btnLg text-center">Register</Link>
                </div> */}

                <div className=" flex__center mt-6 mb-3">                
                    {/* <Link to="/create_password " className="btnLg ">Continue</Link> */}
                    <button disabled={isSubmitting} type="submit" className="btnLg">{ isSubmitting ? "Loading..." : "Log In"}</button>
                </div>
            </form>

        </div>
    )
}
    
export default Login;




    // <CustomAuthPage
    //     title="Log In"
    //     description="Don’t have an account? Create an Account"
    //     firstInputName="Email"
    //     firstInputPlaceholder="Enter email"
    //     secondInputName="Password "
    //     secondInputPlaceholder="Enter password"
    //     footerText
    //     forgotYourPassword
    //     route="/forgot_password"
    //     btnText="Log In"        
    // />