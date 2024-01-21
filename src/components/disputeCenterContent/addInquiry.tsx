import checkboxmark from "../../assets/checkboxmark.svg";
import checkbox from "../../assets/checkbox.svg";
import CustomInput from "../../utils/customInput";
import { useNavigate } from "react-router-dom";

const AddInquiry = () => {
    const navigate = useNavigate();

    const goToClientDetails = () => {
        navigate("/client_details")
    }

  return (
    <>
        <div className="text-center mt-7">
            <h4 className="font-bold text-[1.4rem] ">Add Inquiry</h4>
            <p>Make sure the round field is NOT blank </p>

            <div className=" flex justify-center items-center flex-col md:flex-row mt-4 gap-2 md:gap-6">
                <div className="flex__center gap-2">
                    <img src={checkboxmark} alt="" />
                    <p className="font-bold">Experian</p>
                </div>
                <div className="flex__center gap-2">
                    <img src={checkbox} alt="" />
                    <p className="font-bold">Equifax</p>
                </div>
                <div className="flex__center gap-2">
                    <img src={checkboxmark} alt="" />
                    <p className="font-bold">Transunion</p>
                </div>
            </div>       
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 gap-5 w-ful my-6">
            <div className="flex flex-col w-1/">
                <label className="font-bold">Name</label>
                <CustomInput placeholder="Enter details" />
            </div>
            
            <div className="flex flex-col w-1/">
                <label className="font-bold">Date Of Inquiry</label>
                <input type="date" className="bg-white py-3 px-4 shadow-md rounded-xl mt-2" />
            </div>

            
        </div>

        <div className="flex__center">
            <button className="btnLg">Submit</button>

        </div>

        <div className="flex__between my-10">
            <p className="font-bold text-[1.4rem]">Previous Inquiries</p>

            <button className="btnXs">Reuse All</button>
        </div>

        <div className="bg-greyBg w-ful text-black py-6 m-w-[90%] w-full overflow-x-scrol  rounded-md"> 
            <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem]">
                <p className="mr-">Name</p>
                <p className="ml-">Date Of Inquiry</p>
                <p className="">Bureau</p>
                <p className="ml-">Copy</p>
            </div>

            {Array(3)
                    .fill(3)
                    .map((_,) => (
                <div className="bg-white mx-2 sm:mx-4 rounded-lg" >
                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-2 text-[.7rem] lg:text-[.9rem]">
                        <p>PENN CREDIT</p>
                        <p>12/12/2022</p>
                        <p>Transunion</p>
                        <button className='bg-primary text-white p-1 sm:py-2 sm:px-3 rounded-xl text-[.7rem] lg:text-[.9rem]' onClick={goToClientDetails}>Reuse</button>
                    </div>
                </div>
                ))
            }
        </div>
    </>
  )
}

export default AddInquiry
