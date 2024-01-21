import { useState } from "react";
import AddClientForm from "../../components/dashboardContent/addClientForm";
import CustomTable from "../../components/common/customTable";
import CustomModal from "../../components/common/customModal";
import DashboardStatistics from "../../components/dashboardContent/dashboardStatistics";
import AddAdminForm from "../../components/dashboardContent/addAdminForm";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [showAddFormModal, setShowAddFormModal] = useState<boolean>(false)
    const [showAddAdminForm, setShowAddAdminForm] = useState<boolean>(false)
    const navigate = useNavigate()

    const goToClientDetails = () => {
        // TRY THIS LATER
        // navigate(`/client_details/${id}`)
        navigate("client_details")
    }

    const goToAdminDetails = () => {
        navigate("admin_details")
    }


    return(
        <section>
            <DashboardStatistics />

            <div className="flex__between mt-8">
                <div className="">
                    <p className="font-bold text-[1.4rem]">Clients</p>
                </div>

                <button className="btnXs" onClick={() => setShowAddFormModal(true)}>Add New Client</button>
            </div>
            <p>View all of your client information</p>
            {showAddFormModal && <CustomModal closeModal={setShowAddFormModal}> <AddClientForm /> </CustomModal>}


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

            <div className="flex__between mt-8">
                <div className="">
                    <p className="font-bold text-[1.4rem]">Admins</p>
                </div>

                <button className="btnSm" onClick={() => setShowAddAdminForm(true)}>Add New Admin</button>
            </div>
            <p>View all of admin information</p>

            {showAddAdminForm && <CustomModal closeModal={setShowAddAdminForm}> <AddAdminForm /> </CustomModal>}


            <CustomTable
                firstTitle="Name" 
                secondTitle="Status" 
                thirdTitle="Date" 
                fourthTitle="Action"
                firstBody="Sariah Howell"
                secondBody="Suspended"
                thirdBody="31/05/2022"
                fourthBody="Details"
                isButton={true}
                handleBtnClick={goToAdminDetails}
            />

        </section>
    )
}

export default Dashboard;