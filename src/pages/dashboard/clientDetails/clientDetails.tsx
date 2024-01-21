import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backarrow from "../../../assets/backarrow.svg"
import Example from "../../../components/dashboardContent/clientDetailsContent/pie_chart";
import firstChart from '../../../assets/firstChart.svg';
import Disputes from "../../../components/dashboardContent/clientDetailsContent/disputes";
import CustomLabelInput from "../../../utils/customLabelInput";

const ClientDetails = () => {
    const [showClientDetails, setShowClientDetails] = useState<boolean>(false)

    const navigate = useNavigate();

    const handleClick = () => {
        setShowClientDetails(!showClientDetails)
    }

    const goBack = () => {
        history.back();
    }

    const goToBilling = () => {
        navigate("/client_details/billing")
    }

    const goToDisputeCenter = () => {
        navigate("/dispute_center/dispute_account_details")
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

                {
                    showClientDetails ? 
                   <div className="">
                        <button className="btnXs ml-3">Edit</button>
                        <button className="btnXs ml-3" onClick={handleClick}>Close</button>
                   </div> :
                    <div className="flex sm:block flex-wrap gap-3">
                        <button className="btnXs " onClick={handleClick}>Client Details</button>
                        <button className="btnXs sm:ml-3" onClick={goToBilling}>Billing</button>
                        <button className="btnXs sm:ml-3" onClick={goToDisputeCenter}>Dispute Center</button>
                    
                   </div>
                }
            </div>
            <Example />

            <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-6">
                <div className="w-full md:w-1/3 flex flex-col">
                    <p className="font-bold mb-3">Experian score</p>
                    <img src={firstChart} alt="" />
                </div>

                <div className="w-full md:w-1/3 flex flex-col">
                    <p className="font-bold mb-3">Equifax score</p>
                    <img src={firstChart} alt="" />
                </div>

                <div className="w-full md:w-1/3 flex flex-col">
                    <p className="font-bold mb-3">Transunion score</p>
                    <img src={firstChart} alt="" />
                </div>

                {/* <div className="w-1/3">
                    <PieChart />
                </div>

                <div className="w-1/3">
                    <PieChart />
                </div> */}
            </div>


            {
                showClientDetails && 

                <div className="bg-[#E7E7E7] p-4 mt-6">
                <form action="">
                    <div className="flex items-center justify-center gap-3 lg:flex-row flex-col">
                        <CustomLabelInput label="Name" text="Analise Lily Meadows"/>
                        <CustomLabelInput label="Email" text="Analise3456@gmail.com"/>
                        <CustomLabelInput label="Status" text="Active"/>
                    </div>

                    <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                        <CustomLabelInput label="Account manager" text="John Coole"/>
                        <CustomLabelInput label="Phone" text="(480) 555-0103"/>
                        <CustomLabelInput label="Date Created" text="12/03/2022 10:53am"/>
                    
                    </div> 

                    <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                        <CustomLabelInput label="Verified date" text="14/03/2022"/>
                        <CustomLabelInput label="Address" text="3605 Parker Rd."/>
                        <CustomLabelInput label="Last Payment" text="20/03/2023"/>
                    
                    </div>

                    <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                        <CustomLabelInput label="LTV" text="$1,283.00"/>
                        <CustomLabelInput label="SSN" text="987-67-8645"/>
                        <CustomLabelInput label="Goal" text="Higher credit score"/>
                    
                    </div>

                    <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                        <CustomLabelInput label="DOB" text="12/02/1987"/>
                        <CustomLabelInput label="Next Round" text="21/04/2023"/>
                        <CustomLabelInput label="Date of Payment" text="6/11/2023"/>
                    
                    </div>

                    <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                        <CustomLabelInput label="Experian Score" text="741"/>
                        <CustomLabelInput label="Equifax Score" text="751"/>
                        <CustomLabelInput label="Transunion Score" text="752"/>
                    
                    </div>

                    <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                        <CustomLabelInput label="Total Accounts" text="741"/>
                        <CustomLabelInput label="Total Inquires" text="751"/>
                        <CustomLabelInput label="ID Combined" text="Analise.pdf"/>
                    
                    </div>

                   

                    <div className="flex items-cente justify-start gap-">
                            <p  className="bg-[#DCDDE0] font-bold rounded-tl-lg rounded-bl-lg text-[.7rem] sm:text-[.9rem]  p-4 text-center">Login Details</p>
                            <div className="bg-white  p-4 md:pr-16 rounded-tr-lg text-[.7rem] sm:text-[.9rem] rounded-br-lg">
                                <p>Analise3456@gmail.com</p>
                                <p>Analise8689</p>
                                <p>Mrs Lily</p>
                                <p>6478</p>
                            </div>
                    
                    </div>

                    <div className="flex items-cente justify-start  my-6 ">
                            <p  className="bg-[#DCDDE0] font-bold rounded-tl-lg rounded-bl-lg  p-4 text-center">Team Note (updated regularly)</p>
                            <div className="bg-white p-4 pr-16 py-28 rounded-tr-lg rounded-br-lg w-full">
                                
                            </div>
                    
                    </div>


                </form>
            </div>
            }

            <Disputes />
            
        </section>
    )
}

export default ClientDetails;