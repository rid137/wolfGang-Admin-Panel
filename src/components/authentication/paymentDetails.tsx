import { Link } from "react-router-dom";
import CustomInput from "../../utils/customInput";
import wolfgangLogo from "../../assets/wolfgangLogo.png";


const PaymentDetails = () => {
    return(
        <div className="bg-[#F5F5F5] py-5 px-4 md:px-8 h-[vh] mx-3 my-3 md:my-0 md:mx-0">
            <div className="flex__center bg-primary mb-3 py-2">
                <img src={wolfgangLogo} className="" alt="" />
            </div>
            <h3 className="text-primary text-[1.4rem] md:text-[1.7rem] font-bold text-center">Payment Details</h3>
            <p className="text-center mb-6">Please ensure all details are correct</p>

            <form action="">
                <div className="flex items-center justify-center md:flex-row flex-col gap-4 md:mx-4 lg:mx-0">
                    <div className="flex flex-col w-full md:w-1/3">
                        <label className="font-bold">First Name <span>*</span></label>
                        <CustomInput placeholder="Enter first name" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/3">
                        <label className="font-bold">Middle Name <span>*</span></label>
                        <CustomInput placeholder="Enter middle" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/3">
                        <label className="font-bold">Last Name <span>*</span></label>
                        <CustomInput placeholder="Enter last name" />
                    </div>
                </div>

                <div className="flex items-center justify-center md:flex-row flex-col gap-4 mt-3 ">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Phone Number <span>*</span></label>
                        <CustomInput placeholder="Enter your phone number" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Email Address <span>*</span></label>
                        <CustomInput placeholder="Enter your email address" />
                    </div>
                </div>

                <p className="font-bold mt-2">Plan</p>

                <div className="flex justify-between items-center gap-3 sm:gap-0 border-y-2 border-black py-2 my-2 text-[.7rem] sm:text-[1rem]">
                    <div className="">
                        <div className="flex__center gap-1 xs:gap-3 mb-2 md:mb-0">
                            <input type="checkbox" name="" id="" className="xs:size-5 size-3 rounded-md" />
                            <p>Monthly Credit Disputing</p>
                        </div>
                        
                        <div className="flex__center gap-1 xs:gap-3 mb-2 md:mb-0">
                            <input type="checkbox" name="" id="" className="xs:size-5 size-3 rounded-md" />
                            <p>Annuall Credit Disputing</p>
                        </div>
                        <div className="flex__center gap-1 xs:gap-3">
                            <input type="checkbox" name="" id="" className="xs:size-5 size-3 rounded-md" />
                            <p>Lifetime Credit Disputing</p>
                        </div>
                    </div>

                    <div className="">
                        <p className="mb-2 md:mb-0">Per month : $139.00</p>
                        <p className="mb-2 md:mb-0">Per year : $997.00</p>
                        <p>Only Once : $2997.00</p>
                    </div>

                    <div className="">
                        <p className="mb-2 md:mb-0">1 x $139.00</p>
                        <p className="mb-2 md:mb-0">1 x $997.00</p>
                        <p>1 x $2997.00</p>
                    </div>

                </div>

                <div className="flex items-center justify-center md:flex-row flex-col gap-4 mt-3">
                    <div className="flex flex-col w-full md:w-2/4">
                        <label className="font-bold">Credit / Debit Card Number <span>*</span></label>
                        <CustomInput placeholder="Enter card number" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/4">
                        <label className="font-bold">Exp date <span>*</span></label>
                        <CustomInput placeholder="mm/yy" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/4">
                        <label className="font-bold">CVC <span>*</span></label>
                        <CustomInput placeholder="Enter cvc" />
                    </div>
                </div>

                <div className="flex items-center justify-start md:flex-row flex-col gap-5 mt-3">
                    <div className="flex flex-col w-full md:w-1/3">
                        <label className="font-bold">Coupon</label>
                        <CustomInput placeholder="Enter Coupon Code" />
                    </div>


                    <div className="">
                        <button className="btnSm">Apply</button>
                    </div>
                </div>

                <p className="my-3"><span>*</span> This field is mandatory</p>

                <div className=" flex__center mt-6 mb-3">                
                    <Link to="/document_upload" className="btnLg ">Continue</Link>
                </div>
            </form>

        </div>
    )
}

export default PaymentDetails;