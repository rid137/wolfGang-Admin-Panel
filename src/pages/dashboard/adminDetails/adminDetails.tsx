import { IoIosArrowBack } from "react-icons/io";
import CustomLabelInput from "../../../utils/customLabelInput";
import CustomTable from "../../../components/common/customTable";
import { useNavigate } from "react-router-dom";


const AdminDetails = () => {
    
    const navigate = useNavigate();

    const goToClientDetails = () => {
        // TRY THIS LATER
        // navigate(`/client_details/${id}`)
        navigate("/client_details")
    }

    const goBack = () => {
        history.back();
    }

    return(
        <section className="">
            <div className="flex justify-between items-center">
                <div className="cursor-pointer" onClick={goBack}>
                    <div className="flex items-center gap-2">
                        <IoIosArrowBack className="text-[1.4rem]" />
                        <h4 className="font-bold text-[1.4rem]">Admin Details</h4>
                    </div>
                    <p className="ml-8">View Admin Details</p>
                </div>

                <div className="">
                    <button className="btnXs ">Edit</button>
                    <button className="btnXs ml-3">Suspend</button>
                </div>
            </div>

            <div className="bg-[#E7E7E7] p-4 mt-6">
                <form action="">
                    <div className="flex items-center justify-between w-full">
                        <CustomLabelInput label="Name" text="Sariah Howell"/>
                        <CustomLabelInput label="Email" text="Sariah1248@gmail.com"/>
                        <CustomLabelInput label="Status" text="Active"/>
                    </div>

                    <div className="flex items-center justify-between my-6">
                        <CustomLabelInput label="Phone" text="(480) 555-0103"/>
                        <CustomLabelInput label="Date Created" text="12/03/2022 10:53am"/>
                        <CustomLabelInput label="Address" text=""/>
                    
                    </div>

                    <div className="flex items-center justify-start gap-12">
                        <CustomLabelInput label="DOB" text=""/>
                        <CustomLabelInput label="Total Clients" text="25"/>
                    
                    </div>
                </form>
            </div>

            <p className="font-bold text-[1.4rem] mt-6">Clients</p>
            <p>List of your client under this admin</p>

            <CustomTable
                firstTitle="Name" 
                secondTitle="Status" 
                thirdTitle="Refresh Date" 
                fourthTitle="Action"
                firstBody="Analise Meadows"
                secondBody="Suspended Non Payment"
                thirdBody="31/05/2022"
                fourthBody="Details"
                isButton={true}
                handleBtnClick={goToClientDetails}
            />

        </section>
        
    )
}

export default AdminDetails;