import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Security = () => {
    return(
        <>
            <Link to='/dashboard/settings' className="flex items-center gap-2 my-4 cursor-pointer">
                <FaArrowLeft />
                <h2 className="font-bold text-[1.4rem] mb-">Security</h2>           
            </Link>

            <div className="bg-greyBg px-4 sm:px-7 py-16 mt-3">

                <h3 className="text-[1.6rem] font-bold mb-10">Change Password</h3>

                <form>
                    <div className=" w-full my-2">
                        <div className="flex flex-col ">
                            <label className="font-bold">Old Password</label>
                            <input type="text" className="w-full rounded-md py-4 px-3 mt-2" placeholder="Enter Old Password"  />
                        </div>                  
                    </div>
                    <div className="flex sm:flex-row flex-col justify-center items-center gap-4 w-full my-6">
                        <div className="flex flex-col w-full sm:w-1/2">
                            <label className="font-bold">New Password</label>
                            <input type="text" className="w-full rounded-md py-4 px-3 mt-2" placeholder="Enter New Password"  />
                        </div>

                        <div className=" flex flex-col w-full sm:w-1/2">
                            <label className="font-bold">Confirm Old Password</label>
                            <input type="text" className="w-full rounded-md py-4 px-3 mt-2" placeholder="Confirm New Password" />
                        </div>
                    </div>

                    <div className="flex items-center mt-10">

                        <button className="bg-primary text-white px-4 md:px-32 py-3 rounded-md mx-auto">Save Changes</button>
                    </div>

                </form>
            </div>

        </>
    )
}

export default Security;