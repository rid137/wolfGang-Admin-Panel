import { paymentData } from "../utils/dummy";
import mastercardLogo from "../assets/mastercardLogo.svg"
import exclaim from "../assets/exclaim.svg"
import PaginationBtn from "../components/common/paginationBtn";


const Payment = () => {
    return(
        <section>
            <h2 className="font-bold text-[1.4rem] mb-3">Payment</h2>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 ">
                    <div className="xs:px-6 py-6 px-3 bg-greyBg w-full lg:w-1/2 rounded-md">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-[1.4rem]">Primary Card Details</h4>

                            <button className="py-1 rounded-md text-[.7rem] xs:text-[1rem] px-5 xs:px-7 bg-primary text-white">Edit Card</button>
                        </div>

                        <div className="mx-">
                                <small>Credit / Debit Card Number  <span className="text-red-600">*</span></small>
                                <div className="bg-white flex justify-center xs:justify-between p-3 rounded-md mt-2">
                                    <input type="text" className="bg-transparent outline-none" placeholder="**** **** **** 5675" />
                                    <img src={mastercardLogo} alt="mastercardLogo" />
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">
                                    <div className="flex flex-col w-full md:w-1/2">
                                        <small className="mb-2">Expiration Date  <span className="text-red-600">*</span></small>
                                            <input type="text" className=" outline-none  p-3 rounded-md" placeholder="02/25" />
                                       
                                    </div>

                                    <div className="flex flex-col w-full md:w-1/2">
                                        <small className="flex mb-2">CVV<span className="text-red-600">*</span><img src={exclaim} alt="" /></small>
                                            <input type="text" className=" outline-none  p-3 rounded-md" placeholder="***" />
                                        
                                    </div>
                                </div>

                        </div>
                   </div>

                   <div className="xs:px-6 py-6 px-3 bg-greyBg w-full lg:w-1/2 rounded-md">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-[1.4rem]">Primary Card Details</h4>
                            <button className="py-1 rounded-md text-[.7rem] xs:text-[1rem] px-5 xs:px-7 bg-primary text-white">Add Card</button>
                        </div>

                        <div className="mx-">
                                <small>Credit / Debit Card Number  <span className="text-red-600">*</span></small>
                                <div className="bg-white flex justify-center xs:justify-between p-3 rounded-md mt-2">
                                    <input type="text" className="bg-transparent outline-none" placeholder="---- ---- ---- ----" />
                                    <img src={mastercardLogo} alt="mastercardLogo" />
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">
                                    <div className="flex flex-col w-full md:w-1/2">
                                        <small className="mb-2">Expiration Date  <span className="text-red-600">*</span></small>
                                            <input type="text" className=" outline-none  p-3 rounded-md" placeholder="mm/yy" />
                                       
                                    </div>

                                    <div className="flex flex-col w-full md:w-1/2">
                                        <small className="flex mb-2">CVV<span className="text-red-600">*</span><img src={exclaim} alt="" /></small>
                                            <input type="text" className=" outline-none  p-3 rounded-md" placeholder="---" />
                                        
                                    </div>
                                </div>

                        </div>
                    </div>
            </div>

            <div className="bg-greyBg text-black text-center py-6 mt-5 w-full"> 
                <h4 className="font-bold text-[1.4rem]">Payment  Schedule</h4>
                <p className="px-4">Should you have initiated a payment with us, it will be documented and visible below.</p>
                <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-9 lg:mx-10 text-[.7rem] lg:text-[.9rem] mt-8 ">
                    <p>Date</p>
                    <p>Amount</p>
                    <p>Status</p>
                </div>

                {   
                    paymentData?.map((item, index) => (

                    <div className="bg-white mx-4 rounded-lg" key={index} >
                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full   lg:px-6 text-[.7rem] lg:text-[.9rem]  mb-2 py-3 px-4">
                            <p>{item.date}</p>
                            <p>{item.amount}</p>
                            <p style={{color: item.statusColor}}>{item.status}</p>
                        </div>

                    </div>
                    ))
                    
                    
                }

                <div className="flex justify-end mx-4">
                    <p>Latest actions (Showing 01 to 09 of 259)</p>
                </div>

                <PaginationBtn />
            </div>
        </section>
    );
};

export default Payment;