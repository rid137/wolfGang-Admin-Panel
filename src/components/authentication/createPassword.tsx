import CreatePasswords from "./customAuthPage";
import wolfgangLogo from "../../assets/wolfgangLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../hooks/userAuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BASE_URL } from "../../libs";
import axios from "axios";


const passwordSchema = z.object({
    password: z.string().min(5, { message: "Must be 5 or more characters long" }),
    confirmPassword: z.string().min(5, { message: "Must be 5 or more characters long" }),
  });
  
  type FormFields = z.infer<typeof passwordSchema>;


const CreatePassword = () => {

    const { user, setUser, setReturnedUserData } = UserAuth();
    const navigate = useNavigate();



    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
    resolver: zodResolver(passwordSchema),
    });



    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const getName = user?.firstName

        // console.log(data);

        setUser({ ...user, password: data.password, confirmPassword: data.confirmPassword})
        console.log("user", user)
        // console.log("hghghh", placeholderImg)
        // console.log("hghghhjwhjwhjwh", addPfImg)

        

        const formData = new FormData();
        
        formData.append('email', user?.email as string);
        formData.append('firstName', user?.firstName as string);
        formData.append('lastName', user?.lastName as string);
        formData.append('password', data.password);
        formData.append("gId", user?.govtID as Blob);
        formData.append("addPf", user?.addPf as Blob);
        console.log("formData", formData)
        console.log("FormData contents:");
for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
}


        try {
            // toast.loading('Loading...')
             const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
                headers: {
                            'Content-Type': 'multipart/form-data'
                }
            })
            console.log("response", response.data)
            setReturnedUserData(response.data)
            
            // Object.keys(response.data).length

            // const json = await response.text()

            // if (response.ok ) {
            //     console.log("json response", json )

            // } else {
            //     // toast.remove()
            //     // toast.error(json.message)
            // }
        } catch (error: any) {
            // toast.remove()
            // if (error.message === 'Failed to fetch') toast.error('Network Error. Try again')
            // else toast.error('Error encountered. Try again')
            console.log(error.message)
        }

        navigate("/login");
        

        // reset()
        // Add your form submission logic here
    };

    return(
        <div className="bg-[#F5F5F5] py-5 px-4 md:px-8 w-[rem] h-[vh] mx-3 my-3 md:my-0 md:mx-0">
            <div className="flex__center bg-primary mb-3 py-2">
                <img src={wolfgangLogo} className="" alt="" />
            </div>
            <h3 className="text-primary text-[1.4rem] md:text-[1.7rem] font-bold text-center ">Create Password</h3>
            <p className="text-center mb-6">To keep your account safe, we need a strong password</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center flex-col gap-4 md:mx-4 lg:mx-0">
                    <div className="flex flex-col w-full">
                        <label className="font-bold">Password</label>
                        {/* <CustomInput placeholder="Enter password" /> */}
                        <input {...register('password')}  type="text"  className="inputCls" /> 
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="font-bold">Confirm Password</label>
                        {/* <CustomInput placeholder="Confirm Password" /> */}
                        <input {...register('confirmPassword')}  type="text"  className="inputCls" /> 
                    </div>
                </div>

                <p className="my-3"><span>*</span> This field is mandatory</p>
                {/* {backToLogin &&<div className="flex justify-end"><p className="text-primary">Back to Log In</p></div>} */}

                {/* <div className=" flex__center mt-6 mb-3 text-center">                
                    <Link to="/login" className="btnLg text-center">Register</Link>
                </div> */}

                <div className=" flex__center mt-6 mb-3">                
                    {/* <Link to="/create_password " className="btnLg ">Continue</Link> */}
                    <button disabled={isSubmitting} type="submit" className="btnLg">{ isSubmitting ? "Loading..." : "Register"}</button>
                </div>
            </form>

        </div>
    )
}

export default CreatePassword;





// <CreatePasswords
        //     title="Create Password"
        //     description="To keep your account safe, we need a strong password"
        //     firstInputName="Password"
        //     firstInputPlaceholder="Enter password"
        //     secondInputName="Confirm Password "
        //     secondInputPlaceholder="Confirm password"
        //     mandatory
        //     route="/login"
        //     btnText="Continue"        
        // />