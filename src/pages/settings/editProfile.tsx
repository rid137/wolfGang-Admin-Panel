import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import avatar from '../../assets/avatar.jpg'


const EditProfile = () => {
    return(
        <>
            <Link to='/dashboard/settings' className="flex items-center gap-2 my-4 cursor-pointer">
                <FaArrowLeft />
                <h2 className="font-bold text-[1.4rem] mb-">Edit Profile</h2>           
            </Link>
            
            <div className="bg-greyBg px-4 sm:px-7 py-10 mt-3 text-cente">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                    <img src={avatar} className="rounded-full w-36 h-36" alt="profile image" />
                    <div className="flex flex-col gap-4">
                        <button className="bg-primary text-white px-6 py-2 rounded-md">Change Picture</button>
                        <button className="bg-transparent border-2 border-primary px-6 py-[.4rem] rounded-md">Delete Picture</button>

                    </div>
                </div>

                <form action="" >
                    <div className="flex sm:flex-row flex-col justify-center items-center gap-4 w-full">
                        <div className="flex flex-col w-full sm:w-1/2">
                            <label htmlFor="">Full Name</label>
                            <input type="text" className="w-full rounded-md py-4 px-3 mt-2" value="Dianne Russell"  />
                        </div>

                        <div className=" flex flex-col w-full sm:w-1/2">
                            <label htmlFor="">Phone Number</label>
                            <input type="text" className="w-full rounded-md py-4 px-3 mt-2" value="(603) 555-0123" />
                        </div>
                    </div>

                    <div className=" w-full mt-2">
                        <div className="flex flex-col ">
                            <label htmlFor="">Email</label>
                            <input type="text" className="w-full rounded-md py-4 px-3 mt-2" value="Rusell7896@gmail.com"  />
                        </div>

                       
                    </div>

                    <div className="flex items-center mt-6">

                        <button className="bg-primary text-white px-4 md:px-32 py-3 rounded-md mx-auto">Save Changes</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default EditProfile;