// import CustomAuthPage from "./customAuthPage";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BASE_URL } from "../../libs";
import { AdminAuth } from "../../hooks/useAdminAuthContext";
import wolfgangLogo from "../../assets/wolfgangLogo.png";


const loginSchema = z.object({
    firstName: z.string().min(2, { message: "Must be 2 or more characters long" }),
    lastName: z.string().min(2, { message: "Must be 2 or more characters long" }),
    phoneNumber: z.string().min(11, { message: "Must be 11 or more characters long" }),
    email: z.string().email(),
});

type FormFields = z.infer<typeof loginSchema>;


const Register = () => {
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
        formState: { isSubmitting, errors },
    } = useForm<FormFields>({
        // defaultValues: {
        //     email: "Manager@email.com",
        //     password: "password1",
            
        // },
    resolver: zodResolver(loginSchema),
    });


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // console.log(data);

        const formData = new FormData();
        
        formData.append('email', data.email as string);
        formData.append('firstName', data.firstName as string);
        formData.append('lastName', data.lastName as string);
        // formData.append('password', data.password);
        formData.append('phone', data.phoneNumber);

        const toastId = toast.loading("Creating Manager Account");


        try {        
            const response = await axios.post(`${BASE_URL}/auth/addManager`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            // console.log("response", response);
        
            if (response.status === 200) {
                // console.log("json response", response.data);
                // setManagerObj(response.data);

                toast.success("Manager Account Created successfully", { id: toastId });
                setAdminAuthData(response.data)

                navigate("/dashboard");

            } else {
                toast.remove();
                toast.error(response.data.message);
            }
        } catch (error: any) {
            toast.remove();
            if (error.message === 'Failed to fetch') {
                toast.error('Network Error. Try again');
            } else {
                toast.error('Error encountered. Try again');
            }
            // console.log(error.message);
        }

        // toast.remove();

        // navigate("/login");
        

        reset()
    };

    if (adminAuthData) {
        return <Navigate to='/dashboard' />;
      }


    return(
        <div className="bg-[#F5F5F5] py-5 px-4 md:px-8 w-[rem] h-[vh] mx-3 my-3 md:my-0 md:mx-0">
            <div className="flex__center bg-primary mb-3 py-2">
                <img src={wolfgangLogo} className="" alt="logo" />
            </div>
            <h3 className="text-primary text-[1.4rem] md:text-[1.7rem] font-bold text-center ">Register</h3>
            <p className="text-center mb-6">Already have an account? <Link to="/" className="text-primary">Login here</Link></p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-cente justify-center flex-col gap-4 md:mx-4 lg:mx-0">
                    <div className="flex flex-col w-full">
                        <label className="font-bold">First Name <span>*</span></label>
                        {/* <CustomInput placeholder="Enter first name" /> */}
                        <input {...register('firstName')} type="text" className="inputCls focus:outline-primary"  />
                    </div>
                        {errors.firstName && (
                            <p className="text-red-600">{errors.firstName.message}</p>
                        )}
                    <div className="flex flex-col w-full">
                        <label className="font-bold">Last Name <span>*</span></label>
                        {/* <CustomInput placeholder="Enter last name" /> */}
                        <input {...register('lastName')} type="text" className="inputCls focus:outline-primary"  />

                        
                    </div>
                    {errors.lastName && (
                        <p className="text-red-600">{errors.lastName.message}</p>
                    )}
                    <div className="flex flex-col w-full">
                        <label className="font-bold">Email <span>*</span></label>
                        {/* <CustomInput placeholder="Enter password" /> */}
                        <input {...register('email')}  type="text"  className="inputCls focus:outline-primary" /> 
                    </div>
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                    <div className="flex flex-col w-full">
                        <label className="font-bold">Phone Number <span>*</span></label>
                        {/* <CustomInput placeholder="Enter phone number" /> */}
                        <input {...register('phoneNumber')} type="text" className="inputCls focus:outline-primary"  />
                
                    </div>
                    {errors.phoneNumber && (
                        <p className="text-red-600">{errors.phoneNumber.message}</p>
                    )}
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
    
export default Register;




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