import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/common/customTable";



const DisputeCenter = () => {
const navigate = useNavigate()

    const goToDisputeAccounttDetails = () => {
        navigate("/dispute_center/dispute_account_details")
    }

    return(
        <section className="">
            <h4 className="font-bold text-[1.4rem] mb-4">Dispute Center</h4>
            <h5 className="font-bold text-[1.2rem]">Unsettled Account</h5>
            <p>Accounts For Disputed Account Setup</p>

            <CustomTable
                firstTitle="Name" 
                secondTitle="Status" 
                thirdTitle="Refresh Date" 
                fourthTitle="Action"
                firstBody="Analise Meadows"
                secondBody="Client"
                thirdBody="31/05/2022"
                fourthBody="Details"
                isButton={true}
                handleBtnClick={goToDisputeAccounttDetails}
            />

        </section>
    )
}

export default DisputeCenter;