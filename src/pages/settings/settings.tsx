import { Link } from 'react-router-dom';
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoLanguageOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import avatar from '../../assets/avatar.jpg';


const Settings = () => {
    return(
        <>
            <h2 className="font-bold text-[1.4rem] mb-3">Settings</h2>       
            
            <div className="bg-greyBg p-7">
                <div className="flex justify-end mb-10">
                    <button className="bg-primary text-white px-4 py-2 rounded-md"><Link to="/settings/edit_profile">Edit Profile</Link></button>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                    <img src={avatar} className='rounded-full' alt="profile image" />
                    <p className='text-md font-bold'>Dianne Rusell</p>
                    <p className='text-md'>Russell7896@gmail.com</p>
                    <p className='text-md'>(603) 555-0123</p>
                </div>

                <div className="bg-white p-4 mt-6 rounded-md">
                    <div className="flex justify-between items-center text-md">
                        <div className="flex gap-4 items-center">
                            <IoMdNotificationsOutline />
                            <p>Notifications</p>
                        </div>
                        
                        <p className="text-primary">On</p>
                    </div>

                    <div className="flex justify-between items-center text-md mt-4">
                        <div className="flex gap-4 items-center">
                            <IoLanguageOutline />
                            <p>Language</p>
                        </div>
                        
                        <p className="text-primary">English</p>
                    </div>
                </div>

                <div className="bg-white p-4 mt-6 rounded-md">
                        <Link to="/settings/security" className="flex gap-4 items-center text-md cursor-pointer">
                            <MdOutlineSecurity />
                            <p>Security</p>
                        </Link>     
                </div>

                <div className="bg-white p-4 mt-6 rounded-md text-md">
                        <Link to="/settings/support" className="flex gap-4 items-center cursor-pointer">
                            <BsPersonLinesFill />
                            <p>Help &amp; Support</p>
                        </Link>
                        
                        <Link to="/settings/policy" className="flex gap-4 items-center mt-4 cursor-pointer">
                            <MdOutlinePrivacyTip />
                            <p>Privacy policy</p>
                        </Link>
                        
                </div>

            </div>
        </>
    )
}

export default Settings;