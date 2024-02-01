import CustomInput from "../../utils/customInput";
import wolfgangLogo from "../../assets/wolfgangLogo.png";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
    return(
        <div className="bg-[#F5F5F5] py-5 px-4 md:px-8  h-[vh] mx-3 my-3 md:my-0 md:mx-0 w-[32rem]">
            <div className="flex__center bg-primary mb-3 py-2">
                <img src={wolfgangLogo} className="" alt="" />
            </div>
            <h3 className="text-primary text-[1.4rem] md:text-[1.7rem] font-bold text-center">Forgot Password</h3>
            <p className="text-center mb-6">You can request a password reset below. We will send a security code to the email address, please make sure it is correct.</p>

            <form action="">
                <div className="flex items-center justify-center flex-col gap-4 md:mx-4 lg:mx-0">
                    <div className="flex flex-col w-full">
                        <label className="font-bold">Email</label>
                        <CustomInput placeholder="Enter email" />
                    </div>
                    
                   
                </div>

                <div className="flex justify-end my-3 cursor-pointer"><p className="text-primary">Back to Log In</p></div>
                
                <div className=" flex__center mt-6 mb-3 text-center w-full hover:scale-90 transition-all">                
                    <Link to="/security_code" className="bg-primary py-2 w-full text-white rounded-md text-center">Request Password Reset</Link>
                </div>

            </form>
        </div>
        

    )
}

export default ForgotPassword;