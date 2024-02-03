import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { BASE_URL } from "../../libs";
import axios from "axios";
// import NewCustomInput from "../../utils/newCustomInput";
import toast from "react-hot-toast";
// import newCustomInput from "../../utils/newCustomInput"


export const registerSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
    password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});
  
export type FormFields = z.infer<typeof registerSchema>;

  

const AddClientForm = () => {

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        // defaultValues: {
        //     email: "Xquizit52@gmail.com",
        //     password: "password",
            
        // },
    resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        
        // console.log("data", data)
        const formData = new FormData();
        
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("email", data.email);
        formData.append("password", data.password);

        // console.log("formData", formData)
        // console.log("FormData contents:");
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }

        const toastId = toast.loading("Creating Client Account");

        try {
             const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log("response", response.data)
            // setUserAuthData(response.data)
            toast.success("Client Account Created successfully", { id: toastId });
            
    
        } catch (error: any) {
            toast.remove()     

            // console.log(error.message)
            toast.error('Error encountered. Try again');

        }   
        reset()
    };



    // const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //     console.log(data);

    //     const formData = new FormData();
        
    //     formData.append('email', data.email as string);
    //     formData.append('firstName', data.firstName as string);
    //     formData.append('lastName', data.lastName as string);
    //     formData.append('password', data.password);
    //     formData.append('phone', data.phoneNumber);

    //     console.log("FormData contents:");
    //     for (let pair of formData.entries()) {
    //         console.log(pair[0] + ": " + pair[1]);
    //     }

    //     const toastId = toast.loading("Creating Client Account");


    //     try {        
    //         const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
        
    //         console.log("response", response.data);
        
    //         if (response.status === 200) {
    //             console.log("json response", response.data);
    //             setUserAuthData(response.data);
    //         } else {
    //             toast.remove();
    //             toast.error(response.data.message);
    //         }
    //     } catch (error: any) {
    //         toast.remove();
    //         if (error.message === 'Failed to fetch') {
    //             toast.error('Network Error. Try again');
    //         } else {
    //             toast.error('Error encountered. Try again');
    //         }
    //         console.log(error.message);
    //     }
    //     toast.success("Client Account Created successfully", { id: toastId });

    //     // toast.remove();

    //     // navigate("/login");
        

    //     reset()
    // };


    return(
        <div className="bg-[#D7D7D7] py-5 px-4 md:px-8 ">
            <h3 className="text-primary text-[1.4rem] md:text-[2rem] font-bold text-center">Add New Client</h3>
            <p className="text-center mb-6">Enter the following details of the new client</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center md:flex-row flex-col gap-4 md:mx- lg:mx-0">
                    <div className="flex flex-col w-full md:w-1/3">
                        <label className="font-bold">First Name <span>*</span></label>
                        {/* <CustomInput placeholder="Enter first name" /> */}
                        {/* <NewCustomInput field={{ name: 'firstName', placeholder: 'First Name' }} register={register} /> */}
                        <input {...register('firstName')} type="text" className="inputCls"  />
                        {errors.firstName && (
                            <p className="text-red-600">{errors.firstName.message}</p>
                        )}

                    </div>
                    {/* <div className="flex flex-col w-full md:w-1/3">
                        <label className="font-bold">Middle Name <span>*</span></label>
                        <CustomInput placeholder="Enter middle" />
                        <NewCustomInput field={{ name: 'firstName', placeholder: 'First Name' }} register={register} />
                    </div> */}
                    
                    <div className="flex flex-col w-full md:w-1/3">
                        <label className="font-bold">Last Name <span>*</span></label>
                        {/* <CustomInput placeholder="Enter last name" /> */}
                        {/* <NewCustomInput field={{ name: 'lastName', placeholder: 'Last Name' }} register={register} /> */}
                        <input {...register('lastName')} type="text" className="inputCls"  />

                        {errors.lastName && (
                            <p className="text-red-600">{errors.lastName.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col w-full md:w-1/3">
                        <label className="font-bold">Phone Number <span>*</span></label>
                        {/* <CustomInput placeholder="Enter your phone number" /> */}
                        {/* <NewCustomInput field={{ name: 'phoneNumber', placeholder: 'phone Number' }} register={register} /> */}
                        <input {...register('phoneNumber')} type="text" className="inputCls"  />
                        {errors.phoneNumber && (
                            <p className="text-red-600">{errors.phoneNumber.message}</p>
                        )}
                    </div>

                </div>

                <div className="flex items-center justify-center md:flex-row flex-col gap-4 mt-3 ">
                    
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Email Address <span>*</span></label>
                        {/* <CustomInput placeholder="Enter your email address" /> */}
                        {/* <NewCustomInput field={{ name: 'email', placeholder: 'email' }} register={register} /> */}
                        <input {...register('email')} type="text" className="inputCls"  />

                        {errors.email && (
                            <p className="text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">password <span>*</span></label>
                        {/* <CustomInput placeholder="Enter middle" /> */}
                        {/* <NewCustomInput field={{ name: 'password', placeholder: 'password' }} register={register} /> */}
                        <input {...register('password')} type="text" className="inputCls"  />

                        {errors.password && (
                            <p className="text-red-600">{errors.password.message}</p>
                        )}
                    </div>
                </div>

                {/* <div className="flex flex-col w-full  mt-3">
                    <label className="font-bold">Street Address <span>*</span></label>
                    <CustomInput placeholder="Enter your street address" />
                </div>

                <div className="flex items-center justify-center md:flex-row flex-col gap-4 mt-3">
                    <div className="flex flex-col w-full md:w-1/4">
                        <label className="font-bold">State <span>*</span></label>
                        <CustomInput placeholder="Enter details" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/4">
                        <label className="font-bold">Zip code <span>*</span></label>
                        <CustomInput placeholder="Enter details" />
                    </div>
                    <div className="flex flex-col w-full md:w-2/4">
                        <label className="font-bold">Date Of Birth <span>*</span></label>
                        <CustomInput placeholder="Enter your date of birth" />
                    </div>
                </div>

                <div className="flex items-center justify-center md:flex-row flex-col gap-4 mt-3">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Social Security Number</label>
                        <CustomInput placeholder="Enter your SSN" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Preffered Credit Consult Method</label>
                        <select name="" id="" className="bg-white py-3 px-4 shadow-md rounded-xl mt-2">
                            <option value="">Select one</option>
                            <option value="">Method 1</option>
                            <option value="">Method 1</option>
                            <option value="">Method 1</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-1/2  mt-3">
                    <label className="font-bold">Referral source <span>*</span></label>
                    <select name="" id="" className="bg-white py-3 px-4 shadow-md rounded-xl mt-2">
                        <option value="">Select one</option>
                        <option value="">Method 1</option>
                        <option value="">Method 1</option>
                        <option value="">Method 1</option>
                    </select>

                </div>
                <p className="my-3"><span>*</span> This field is mandatory</p>
                */}
                <div className="flex items-center gap-4">
                    <input type="checkbox" name="" id="" className="w-5 h-5 rounded-md" />
                    <p>I agree to the terms and conditions provided by the company</p>
                </div>

                <div className=" flex__center mt-6 mb-3">                
                    {/* <button type="submit" className="btnLg ">Continue</button> */}
                    <button disabled={isSubmitting} type="submit" className="btnLg">{ isSubmitting ? "Loading..." : "Continue"}</button>
                </div>
            </form>

        </div>
    )
}

export default AddClientForm;