import mastercardLogo from "../../../assets/mastercardLogo.svg";
import exclaim from "../../../assets/exclaim.svg";

const AddNewCard = () => {
    return(
        <div className="sm:px-6 py-6 px-3 bg-greyBg w-full  rounded-md">
            <h4 className="font-bold text-[1.4rem] text-primary text-center mb-3">Add New Card</h4>

            <div className="mx-">
                <small className="font-bold">Credit / Debit Card Number  <span className="text-red-600">*</span></small>
                <div className="bg-white flex justify-center sm:justify-between p-3 rounded-md mt-2">
                    <input type="text" className="bg-transparent outline-none w-32 sm:w-full" placeholder="---- ---- -----" />
                    <img src={mastercardLogo} className="mr-10 xs:mr-0" alt="mastercardLogo" />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">
                    <div className="flex flex-col w-full md:w-1/2">
                        <small className="mb-2 font-bold">Expiration Date  <span className="text-red-600">*</span></small>
                            <input type="text" className=" outline-none  p-3 rounded-md" placeholder="mm/yy" />
                        
                    </div>

                    <div className="flex flex-col w-full md:w-1/2">
                        <small className="flex mb-2 font-bold">CVV<span className="text-red-600">*</span><img src={exclaim} alt="" /></small>
                            <input type="text" className=" outline-none  p-3 rounded-md" placeholder="---" />
                        
                    </div>
                </div>

            </div>

        <button className="py-1 rounded-md w-full mt-4 text-[.7rem] xs:text-[1rem] px-5 xs:px-7 bg-primary text-white">Add</button>

    </div>
    )
}

export default AddNewCard;