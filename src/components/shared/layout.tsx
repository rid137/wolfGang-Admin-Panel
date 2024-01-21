import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import Sidebar from "./sidebar";
import avatar from '../../assets/avatar.jpg'
  
const Layout = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const location = useLocation()
    if (location.pathname === "/client_details") {
        console.log("hello")
    }

    const handleClick = (): void => {
        setIsNavOpen(false)
    }

    return(
        <div className={`flex `}>
            
            <div onClick={() => setIsNavOpen(false)} className={`fixed ${isNavOpen? "block": "hidden " } w-[100%] lg:hidden ml-[60vw] h-[100%] top-0 left-0 right-0 bottom-0 bg-transBg z-40`}></div>

            <Sidebar isNavOpen={isNavOpen} handleClick={handleClick} />
            <div className="w-[100vw] lg:w-[80vw] bg-whiteBg lg:py-10 lg:px-14 p-2 xs:px-4">
            
                <div className="flex justify-between lg:justify-end items-center mb-4 lg:mb-0">

                    <div className="lg:hidden block text-xl cursor-pointer" onClick={() => setIsNavOpen(!isNavOpen)}>
                        <IoMdMenu />
                    </div>

                    <div className="flex__center gap-3 sm:gap-5 ">
                        <div className="bg-[#D4D5D8] hidden rounded-full py-2 px-3 sm:flex items-center justify-center gap-3">
                            <IoSearchSharp />
                            <input type="text" className="bg-transparent outline-none text-gray-400" placeholder="search" />

                        </div>
                        <div className="bg-[#D4D5D8] sm:hidden block size-12 rounded-full flex__center"><IoSearchSharp className="text-[1.3rem]" /></div>
                        <p className="font-bold hidden lg:block cursor-pointer">Dianell Russel</p>
                        <img src={avatar} className="rounded-full w-12 h-12 md:w-16 md:h-16 cursor-pointer " alt="" />
                    </div>

                </div>

                <div className="mt-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;