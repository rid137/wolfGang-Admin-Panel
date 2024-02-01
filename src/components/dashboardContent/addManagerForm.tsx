import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
// import { UserAuth } from "../../hooks/userAuthContext";
import { BASE_URL } from "../../libs";
import axios from "axios";
// import NewCustomInput from "../../utils/newCustomInput";
import toast from "react-hot-toast";
// import { FormFields, registerSchema } from "./addClientForm";


const registerManagerSchema = z.object({
    firstName: z.string().min(5, { message: "Must be 5 or more characters long" }),
    lastName: z.string().min(5, { message: "Must be 5 or more characters long" }),
    phoneNumber: z.string().min(5, { message: "Must be 5 or more characters long" }),
    email: z.string().email(),
    // password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});
  
type FormFields = z.infer<typeof registerManagerSchema>;

  

const AddManagerForm = () => {
    // const { user, setUser, setReturnedUserData, userAuthData, setUserAuthData } = UserAuth();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
    resolver: zodResolver(registerManagerSchema),
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
        
            console.log("response", response.data);
        
            if (response.status === 200) {
                console.log("json response", response.data);
                // setUserAuthData(response.data);
                toast.success("Manager Account Created successfully", { id: toastId });
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
            console.log(error.message);
        }

        // toast.remove();

        // navigate("/login");
        

        reset()
    };


    return(
        <div className="bg-[#D7D7D7] py-5 px-8 ">
            <h3 className="text-primary text-[1.4rem] md:text-[2rem] font-bold text-center">Add New Manager</h3>
            <p className="text-center mb-6">Enter the following details of the new manager</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center md:flex-row flex-col gap-4">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">First Name <span>*</span></label>
                        {/* <CustomInput placeholder="Enter first name" /> */}
                        <input {...register('firstName')} type="text" className="inputCls"  />
                        {errors.firstName && (
                            <p className="text-red-600">{errors.firstName.message}</p>
                        )}
                    </div>
                    
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Last Name <span>*</span></label>
                        {/* <CustomInput placeholder="Enter last name" /> */}
                        <input {...register('lastName')} type="text" className="inputCls"  />

                        {errors.lastName && (
                            <p className="text-red-600">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-center md:flex-row flex-col gap-4 mt-3">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Email Address <span>*</span></label>
                        {/* <CustomInput placeholder="Enter email address" /> */}
                        <input {...register('email')} type="text" className="inputCls"  />

                        {errors.email && (
                            <p className="text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                    
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Phone Number <span>*</span></label>
                        {/* <CustomInput placeholder="Enter phone number" /> */}
                        <input {...register('phoneNumber')} type="text" className="inputCls"  />
                        {errors.phoneNumber && (
                            <p className="text-red-600">{errors.phoneNumber.message}</p>
                        )}
                    </div>
                </div>

                {/* <div className="flex items-center justify-start md:flex-row flex-col gap-4 mt-3">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">password <span>*</span></label>
                        <CustomInput placeholder="Enter middle" />
                        <NewCustomInput field={{ name: 'password', placeholder: 'password' }} register={register} />
                        <input {...register('password')} type="text" className="inputCls"  />

                        {errors.password && (
                            <p className="text-red-600">{errors.password.message}</p>
                        )}
                    </div>
                </div> */}

                <div className=" flex__center mt-6 mb-3">                
                    {/* <button type="submit" className="btnLg ">Submit</button> */}
                    <button disabled={isSubmitting} type="submit" className="btnLg">{ isSubmitting ? "Loading..." : "Continue"}</button>
                    {/* <button type="submit" onClick={() => console.log("clicked")}>Submit</button> */}
                </div>
            </form>
        </div>
    )
}

export default AddManagerForm;