import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHouse } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import wolfgang from "../../assets/wolfgangLogo.png";
import { AdminAuth } from "../../hooks/useAdminAuthContext";
import axios from "axios";
import { BASE_URL } from "../../libs";
import { ClientDetailsType } from "../../types/clientDetailsObj";


interface SidebarProps {
    isNavOpen: boolean
    handleClick: () => void
}
  
const Sidebar: React.FC<SidebarProps> = ({ isNavOpen, handleClick }) => {
    const [active, setActive] = useState("dashboard")
    const [managerData, setManagerData] = useState<ClientDetailsType | null>(null)

    const navigate = useNavigate()

    // console.log("manager" ,managerData)

    const { logout, adminAuthData } = AdminAuth();
    const id = adminAuthData?.userId
    const accessToken = adminAuthData?.token

    const fetchManagerData = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/user/getUser/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const managersData = response.data;
    
          setManagerData(managersData);
      
          return managersData;
        } catch (error) {
          console.error('Error fetching manager:', error);
        }
    };
    
    useEffect(() => {
        const fetchManagerInfo = async () => {
          await fetchManagerData();
        };
    
        accessToken && fetchManagerInfo();
      }, [accessToken]);


    useEffect(() => {
        document.body.style.overflow = isNavOpen ? 'hidden' : 'auto';
    
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [isNavOpen]);

    const handleLogout = ():void => {
        if(window.confirm("Are you sure you want to logout?")) {
            logout()
        }
        navigate("/")
    }

    // const location = useLocation()
    
    
    // useEffect(() => {
    //     // if (location.pathname === "/client_details") {
    //     //   setActive("dashboard");
    //     // }

    //     // else if (location.pathname === "/dashboard/dispute_center") {
    //     //   setActive("dispute_center");
    //     // }

    //     let rangeText;
    //     switch (location.pathname) {
    //         case "/dashboard/client_details":
    //             setActive("dashboard");
    //             break;
    //         case "/dashboard/dispute_center":
    //             setActive("dispute_center");
    //             break;
    //         case "/dashboard/letter_creation":
    //             setActive("letter_creation");
    //             break;
    //     // case 4:
    //         //     rangeText = `(${baseValue}-${baseValue + 3})`;
    //         //     break;
    //         // case 5:
    //         //     rangeText = `(${baseValue}-${baseValue + 4})`;
    //         //     break;
    //         // default:
    //         //     setActive("dashboard");
    //         //     break;
    //     }

    //   }, [location.pathname]);

    
    return (
        <div className={`${ isNavOpen ? " block bg-primary min-w-[60vw] absolute top- left- h-[100vh] z-30 stic" : " hidden" } bg-primary lg:min-w-[20vw] lg:block w-0 h-0 hidde  lg:h-[100vh] py-4 text-white overflow-y-scroll relativ lg:sticky left-0 top-0 `}>
            <div className="text-center text-white mb-5 flex items-center justify-center ">
                <img src={wolfgang} className="cursor-pointer" alt="logo" />

            </div>

            <h1 className="uppercase tracking-wide ml-5 text-gray-300 text-normal sm:text-md font-bold">Master menu</h1>

            <ul className="flex flex-col gap-[.5rem] sm:gap-3 mt-5 pr-4  sm:pr-14">
                
                <li onClick={handleClick}>
                    <Link to={"/dashboard"} className={`flex gap-3 items-center cursor-pointer py-[.3rem] rounded-r-full hover:bg-white hover:text-primary pl-6 sm:pl-10 ${active === "dashboard" && "bg-white text-primary" }`} onClick={() => setActive("dashboard")}>
                        <MdDashboard className="text-[1.1rem] sm:text-[1.4rem] " />
                        <p className="text-[.9rem] sm:text-md">Dashboard</p>
                    </Link>

                </li>
                <li onClick={handleClick}>
                    <Link to={"/dashboard/dispute_center"} className={`flex gap-3 items-center cursor-pointer py-[.3rem] rounded-r-full hover:bg-white hover:text-primary pl-6 sm:pl-10 ${active === "dispute_center" && "bg-white text-primary" }`} onClick={() => setActive("dispute_center")}>
                        <MdOutlineHouse className="text-[1.2rem] sm:text-[1.4rem]" />
                        <p className="text-[.9rem] sm:text-md">Dispute Center</p>
                    </Link>
                </li>
                <li onClick={handleClick}>
                    <Link to={"/dashboard/letter_creation"} className={`flex gap-3 items-center cursor-pointer py-[.3rem] rounded-r-full hover:bg-white hover:text-primary pl-6 sm:pl-10 ${active === "letter_creation" && "bg-white text-primary" }`} onClick={() => setActive("letter_creation")}>
                        <FaRegFileAlt className="text-[1rem] sm:text-[1.2rem]" />
                        <p className="text-[.9rem] sm:text-md">Letter Creation</p>
                    </Link>
                </li>
                <li onClick={handleClick}>
                    <Link to={"/dashboard/payment"} className={`flex gap-3 items-center cursor-pointer py-[.3rem] rounded-r-full hover:bg-white hover:text-primary pl-6 sm:pl-10 ${active === "payment" && "bg-white text-primary" }`} onClick={() => setActive("payment")}>
                        <MdOutlinePayment className="text-[1.2rem] sm:text-[1.4rem]" />
                        <p className="text-[.9rem] sm:text-md">Payment</p>
                    </Link>
                </li>
                <li onClick={handleClick}>
                    <Link to={"/dashboard/notifications"} className={`flex gap-3 items-center cursor-pointer py-[.3rem] rounded-r-full hover:bg-white hover:text-primary pl-6 sm:pl-10 ${active === "notifications" && "bg-white text-primary" }`} onClick={() => setActive("notifications")}>
                        <IoMdNotificationsOutline className="text-[1.2rem] sm:text-[1.4rem]" />
                        <p className="text-[.9rem] sm:text-md">Notifications</p>
                    </Link>
                </li>
                <li onClick={handleClick}>
                    <Link to={"/dashboard/settings"} className={`flex gap-3 items-center cursor-pointer py-[.3rem] rounded-r-full hover:bg-white hover:text-primary pl-6 sm:pl-10 ${active === "settings" && "bg-white text-primary" }`} onClick={() => setActive("settings")}>
                        <IoSettingsOutline className="text-[1.1rem] sm:text-[1.4rem]" />
                        <p className="text-[.9rem] sm:text-md">Settings</p>
                    </Link>
                </li>
                
            <div className="absolute bottom-14 w-full">
                <h1 className="uppercase tracking-wide ml-5 text-gray-300 text-normal sm:text-md font-bold">Profile</h1>

                    <ul className="flex flex-col gap-[.4rem] sm:gap-3 mt-5 pr-4 xspr-10 sm:pr-14">
                        
                        <li onClick={handleClick}>
                            <Link to={"/dashboard/settings"} className={`flex gap-3 items-center cursor-pointer py-[.3rem] rounded-r-full hover:bg-white hover:text-primary pl-6 sm:pl-10 ${active === "" && "bg-white text-primary" }`} onClick={() => setActive("")}>
                                <FaUser className="text-[1rem] sm:text-[1.4rem] " />
                                <p className="text-[.9rem] sm:text-md">{managerData?.firstName} {managerData?.lastName}</p>
                            </Link>

                        </li>
                        <li onClick={handleLogout}>
                            <h4  className={`flex gap-3 items-center cursor-pointer py-[.3rem] rounded-r-full hover:bg-white hover:text-primary pl-6 sm:pl-10 ${active === "logout" && "bg-white text-primary" }`} onClick={() => setActive("logout")}>
                                <IoLogOutOutline className="text-[1.1rem] sm:text-[1.4rem]" />
                                <p className="text-[.9rem] sm:text-md">Log Out</p>
                            </h4>
                        </li>
                    </ul>
            </div>
            </ul>

        </div>
    );
};

export default Sidebar;
