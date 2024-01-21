import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/common/customTable";

const LetterCreation = () => {
    const navigate = useNavigate()

    const goToDisputeAccounttDetails = () => {
        navigate("/letter_creation/letter_creation_details")
    }

    return(
        <section className="">
            <h4 className="font-bold text-[1.4rem] mb-4">Letter Creation</h4>
            
            <CustomTable
                firstTitle="Name" 
                secondTitle="Status" 
                thirdTitle="Refresh Date" 
                fourthTitle="Action"
                firstBody="Analise Meadows"
                secondBody="Client"
                thirdBody="31/05/2022"
                fourthBody="Details"
                isButton
                handleBtnClick={goToDisputeAccounttDetails}
            />

        </section>
    )
}

export default LetterCreation;


