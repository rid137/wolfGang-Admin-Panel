import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Support = () => {
    return(
        <>
             <Link to='/settings' className="flex items-center gap-2 my-4 cursor-pointer">
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


                <form >
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
                        <div className="flex flex-col w-full sm:w-1/2 ">
                            <label className="font-bold">Full Name</label>
                            <input type="text" className="w-full rounded-md py-4 px-3 mt-2" placeholder="Enter Your Name"  />
                        </div>

                        <div className=" flex flex-col w-full sm:w-1/2">
                            <label className="font-bold">Email</label>
                            <input type="text" className="w-full rounded-md py-4 px-3 mt-2" placeholder="Enter Your Email" />
                        </div>
                    </div>

                    <div className=" w-full my-5">
                        <div className="flex flex-col ">
                            <label className="font-bold">Message</label>
                            <textarea className="w-full rounded-md py-4 px-3 mt-2 resize-none " name="" id="" cols={30} rows={10} placeholder="Type Your Message" />
                        </div>

                       
                    </div>

                    <div className="flex items-center">

                        <button className="bg-primary text-white px-6 md:px-32 py-3 rounded-md mx-auto">Send Message</button>
                    </div>

                </form>


            </div>
        </>
    );
};

export default Support;