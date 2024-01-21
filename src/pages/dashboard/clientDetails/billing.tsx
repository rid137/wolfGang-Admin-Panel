import { useState } from "react";
import backarrow from "../../../assets/backarrow.svg";
import CustomLabelInput from "../../../utils/customLabelInput";
import CustomTable from "../../../components/common/customTable";
import CustomModal from "../../../components/common/customModal";
import AddNewCard from "../../../components/dashboardContent/clientDetailsContent/addNewCard";


const Billing = () => {
    const [showAddNewCardModal, setShowAddNewCardModal] = useState<boolean>(false)

    const goBack = () => {
        history.back();
    }

    return(
        <section className="">
            <div className="md:flex justify-between items-center">
                <div className="cursor-pointer mb-4 md:mb-0" onClick={goBack}>
                    <div className="flex items-center gap-2">
                        <img src={backarrow} alt="" />
                        <h4 className="font-bold text-[1.4rem]">Client Details</h4>
                    </div>
                        <p className="ml-5">View Client Details</p>
                </div>         
                 
                <div className="flex sm:block flex-wrap gap-3">
                    <button className="btnXs " >Retry Payment</button>
                    <button className="btnXs sm:ml-3" >Cancel Client</button>
                    <button className="btnXs sm:ml-3" onClick={() => setShowAddNewCardModal(true)}>Add New Card</button>
                
                </div>
                {showAddNewCardModal && <CustomModal closeModal={setShowAddNewCardModal} > <AddNewCard /> </CustomModal>}

            </div>

            
            <div className="bg-[#E7E7E7] p-4 mt-6">
                <form action="">
                    <div className="flex items-center justify-center gap-3 lg:flex-row flex-col">
                        <CustomLabelInput label="Name" text="Analise Lily Meadows"/>
                        <CustomLabelInput label="Email" text="Sariah1248@gmail.com"/>
                        <CustomLabelInput label="Phone" text="(480) 555-0103"/>
                    </div>

                    <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                        <CustomLabelInput label="Date of Payment" text="6/11/2023"/>
                        <CustomLabelInput label="Refresh date" text="6/11/2023"/>
                        <CustomLabelInput label="Subscription cost" text="14/03/2022"/>
                    
                    </div>

                    <div className="flex items-center justify-start gap-3 lg:flex-row flex-col">
                        <CustomLabelInput label="DOB" text=""/>
                        <CustomLabelInput label="Total Clients" text="25"/>
                    
                    </div>
                </form>
            </div>

            <p className="font-bold text-[1.4rem] mt-6">Payment Reminders</p>

            <CustomTable
                firstTitle="Date" 
                secondTitle="Due Date" 
                thirdTitle="Amount" 
                fourthTitle="Status"
                firstBody="14/04/2023"
                secondBody="14/04/2023"
                thirdBody="$150.00"
                fourthBody="Successful"
                colored
            />

            <div className="md:flex items-center justify-between mt-8 hidden ">
                    <p className="font-bold text-[1.4rem]">Cards</p>

                <button className="btnSm" >Edit</button>
            </div>

            <div className="bg-greyBg w-ful text-black py-6 m-w-[90%] w-full overflow-x-scrol mt-6 hidden md:block"> 
                <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem]">
                    <p className="md:mr-10">Date </p>
                    <p className="ml-">CC Number</p>
                    <p className="">Name On CC</p>
                    <p className="ml-">EXP Date</p>
                    <p className="ml-">CVC</p>
                    <p className="md:-ml-20">Default Card</p>
                </div>

                {Array(2)
                        .fill(2)
                        .map((_,) => (
                    <div className="bg-white mx-4 rounded-lg" >
                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-3 text-[.7rem] lg:text-[.9rem]">
                            <p>28/08/2022</p>
                            <p>**** **** **** 6578</p>
                            <p>Analise Lily Meadows</p>
                            <p>11/25</p>
                            <p>675</p>
                            <p>Yes</p>
                        </div>

                    </div>
                    ))
                }
            </div>


        </section>
    )
}

export default Billing;