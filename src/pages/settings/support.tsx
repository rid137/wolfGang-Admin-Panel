import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../libs";
import { AdminAuth } from "../../hooks/useAdminAuthContext";

type FormValues = {
    fullName: string,
    email: string,
    message: string,
}

const Support = () => {

    const { adminAuthData } = AdminAuth();
    const accessToken = adminAuthData?.token;
    const id = adminAuthData?.userId;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm<FormValues>();
    
      
      const OnSubmit: SubmitHandler<FormValues> = async (data) => {
        // console.log(data)
        const toastId = toast.loading("Sending Your Message");

        const formData = new FormData()
        formData.append("fullName", data.fullName)
        formData.append("email", data.email)
        formData.append("message", data.message)
    
        try {        
            const response = await axios.post(`${BASE_URL}/support/save/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            // console.log("response", response.data);
            
            if (response.status === 200) {
                toast.success(response?.data, { id: toastId });
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
            };
            console.log(error.message);
        };
        reset();
    
      }
      
    return(
        <>
             <Link to='/dashboard/settings' className="flex items-center gap-2 my-4 cursor-pointer">
                <FaArrowLeft />
                <h2 className="font-bold text-[1.4rem] mb-">Help &amp; Support</h2>           
            </Link>

            <div className="bg-greyBg p-7 mt-3">
                <h4 className="font-bold text-[1.2rem]">Welcome to Wolfgang Stuant Help &amp; Support</h4>

                <p className="text-justify mt-2 mb-5 tracking-wide leading-6">
                    At Wolfgang Stuant, we are dedicated to delivering top-notch products/services and providing 
                    excellent customer support. Our Help & Support resources are designed to assist you in finding 
                    solutions to your questions, addressing issues, and ensuring a seamless experience with us.
                </p>

                <h4 className="font-bold text-[1.2rem]">Contact Us</h4>

                <p className="my-2">Our dedicated support team is ready to assist you. Choose your preferred contact</p>

                <ul className=" list-inside list-disc mb-5">
                    <li>Address: 35, Afolabi Awosanya Street, Ikeja, Lagos</li>
                    <li>Email Address: support@companyname.com</li>
                    <li>Phone Number: +234 901 259 8745</li>
                </ul>


                <form onSubmit={handleSubmit(OnSubmit)}>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
                        <div className="flex flex-col w-full sm:w-1/2 ">
                            <label className="font-bold">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full rounded-md py-4 px-3 mt-2 focus:border-primary focus:outline-primary placeholder:text-[#3E3737]" 
                                placeholder="Enter Your Name"  
                                {...register("fullName",
                                    {
                                        required: "Name is required"
                                    })
                                }
                            />
                            {errors.fullName && (<p className="errorMsg text-[#BA3138] ">{errors.fullName.message}</p>)}

                        </div>

                        <div className=" flex flex-col w-full sm:w-1/2">
                            <label className="font-bold">Email</label>
                            <input 
                                type="text" 
                                className="w-full rounded-md py-4 px-3 mt-2 focus:border-primary focus:outline-primary placeholder:text-[#3E3737]" 
                                placeholder="Enter Your Email" 
                                {...register("email",
                                    {
                                        required: "Email is required.",
                                        pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: "Email is not valid"
                                        }
                                    })
                                }
                                />
                                {errors.email && <p className="errorMsg text-[#BA3138] ">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className=" w-full my-5">
                        <div className="flex flex-col ">
                            <label className="font-bold">Message</label>
                            <textarea 
                                className="w-full rounded-md py-4 px-3 mt-2 resize-none focus:border-primary focus:outline-primary placeholder:text-[#3E3737] " 
                                id="" 
                                cols={30} 
                                rows={10} 
                                placeholder="Type Your Message" 
                                {...register("message",
                                    {
                                        required: "Message is required"
                                    })
                                }
                            />
                            {errors.message && <p className="errorMsg text-[#BA3138] ">{errors.message.message}</p>}
                        </div>

                       
                    </div>

                    <div className="flex items-center">

                        <button type="submit" className="bg-primary text-white px-6 md:px-32 py-3 rounded-md mx-auto">Send Message</button>
                    </div>

                </form>


            </div>
        </>
    );
};

export default Support;