import { Link } from "react-router-dom";
import CustomInput from "../../utils/customInput";
import wolfgangLogo from "../../assets/wolfgangLogo.png";

interface CustomAuthPageProps {
    title: string;
    description: string;
    firstInputName: string;
    firstInputPlaceholder: string;
    secondInputName?: string;
    secondInputPlaceholder?: string;
    mandatory?: boolean;
    forgotYourPassword?: boolean;
    footerText?: boolean;
    route: string;
    btnText: string;
}


const CustomAuthPage: React.FC<CustomAuthPageProps> = ({title, description, firstInputName, firstInputPlaceholder, secondInputName, secondInputPlaceholder, mandatory, forgotYourPassword, footerText, route, btnText }) => {
    return(
        <div className="bg-[#F5F5F5] py-5 px-4 md:px-8 w-[rem] h-[vh] mx-3 my-3 md:my-0 md:mx-0">
            <div className="flex__center bg-primary mb-3 py-2">
                <img src={wolfgangLogo} className="" alt="" />
            </div>
            <h3 className="text-primary text-[1.4rem] md:text-[1.7rem] font-bold text-center ">{title}</h3>
            <p className="text-center mb-6">{description}</p>

            <form action="">
                <div className="flex items-center justify-center flex-col gap-4 md:mx-4 lg:mx-0">
                    <div className="flex flex-col w-full">
                        <label className="font-bold">{firstInputName}</label>
                        <CustomInput placeholder={firstInputPlaceholder} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="font-bold">{secondInputName}</label>
                        <CustomInput placeholder={secondInputPlaceholder} />
                    </div>
                </div>

                {mandatory && <p className="my-3"><span>*</span> This field is mandatory</p>}
                {footerText && <div className="flex justify-end my-3 cursor-pointer"> {forgotYourPassword ? <p className="text-primary">Forgot Your Password?</p> : <p className="text-primary">Back to Log In</p>}</div>}
                {/* {backToLogin &&<div className="flex justify-end"><p className="text-primary">Back to Log In</p></div>} */}

                <div className=" flex__center mt-6 mb-3 text-center">                
                    <Link to={route} className="btnLg text-center">{btnText}</Link>
                </div>
            </form>

        </div>
    )
}

export default CustomAuthPage;