import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DateTime} from "luxon";
import AddClientForm from "../../components/dashboardContent/addClientForm";
import CustomModal from "../../components/common/customModal";
import DashboardStatistics from "../../components/dashboardContent/dashboardStatistics";
import AddManagerForm from "../../components/dashboardContent/addManagerForm";
import { BASE_URL } from "../../libs";
import { UserAuth } from "../../hooks/userAuthContext";
import NewCustomTable from "../../components/common/newCustomTable";
// const NewCustomTable = React.lazy(() => import('../../components/common/newCustomTable'));


const Dashboard = () => {
  const [showAddFormModal, setShowAddFormModal] = useState<boolean>(false);
  const [showAddAdminForm, setShowAddAdminForm] = useState<boolean>(false);
  const [allClients, setAllClients] = useState([]);
  const [allManagers, setAllManagers] = useState([]);
  const [allDisputeAccounts, setAllDisputeAccounts] = useState<any>();

  const navigate = useNavigate();

  const {userAuthData} = UserAuth();
  const accessToken = userAuthData?.token;
  const id = userAuthData?.userId;

  const goToClientDetails = (id: number) => {
    navigate(`client_details/${id}`)
  }

  const goToAdminDetails = () => {
    navigate("admin_details")
  }

  const fetchAllClients = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/getAllClients`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const clientsData = response.data;

      setAllClients(clientsData);
  
      return clientsData;
    } catch (error) {
      console.error('Error fetching all clients:', error);
    }
  };

  const fetchAllManagers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/getAllManagers`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const managersData = response.data;

      setAllManagers(managersData);
  
      return managersData;
    } catch (error) {
      console.error('Error fetching all managers:', error);
    }
  };

  const fetchDisputeAccount = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/account/findUnattendedAccounts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const alldisputeAccountsData = response.data;

    setAllDisputeAccounts(alldisputeAccountsData);

    return alldisputeAccountsData;
  } catch (error) {
      console.error('Error fetching all clients:', error);
    }
  };

  useEffect(() => {
    const fetchAllClientsInfo = async () => {
      await fetchAllClients();
    };

    const fetchAllManagersInfo = async () => {
      await fetchAllManagers();
    };

    const fetchDisputeAccountInfo = async () => {
      await fetchDisputeAccount();
    };
    
    accessToken && fetchAllClientsInfo();
    accessToken && fetchAllManagersInfo();
    accessToken && fetchDisputeAccountInfo();
  }, [accessToken]);
    
  const mappedClientsData = allClients.slice(0, 10).map((item: any) => ({
  id: item.id,
  firstBody: `${item.firstName}   ${item.lastName}`,
  secondBody: item.status ? item.status : 'active',
  thirdBody: DateTime.fromISO(item.updatedAt).toLocaleString(DateTime.DATE_MED),
  fourthBody: "Details",
  }));

  const mappedManagersData = allManagers.slice(0, 10).map((item: any) => ({
    id: item.id,
    firstBody: `${item.firstName}   ${item.lastName}`,
    secondBody: item.status ? item.status : 'active',
    thirdBody: DateTime.fromISO(item.updatedAt).toLocaleString(DateTime.DATE_MED),
    fourthBody: "Details",
    // email: item.email,
    // attended: item.attended,
    // refreshDate: item.refreshDate,
  }));



  return(
    <section>
      <DashboardStatistics allClients={allClients} allDisputeAccounts={allDisputeAccounts} />

      <div className="flex__between mt-8">
          <div className="">
              <p className="font-bold text-[1.4rem]">Clients</p>
          </div>

          <button className="btnXs" onClick={() => setShowAddFormModal(true)}>Add New Client</button>
      </div>
      <p>View all of your client information</p>
      {showAddFormModal && <CustomModal closeModal={setShowAddFormModal}> <AddClientForm /> </CustomModal>}


      {/* <CustomTable
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
      /> */}

      <NewCustomTable
        titles={["Name", "Status", "Refresh Date", "Action"]}
        data={mappedClientsData}
        isButton={true}
        totalLength={allClients?.length}
        handleBtnClick={(id: number) => goToClientDetails(id)}
      />

      <div className="flex__between mt-8">
          <div className="">
              <p className="font-bold text-[1.4rem]">Managers</p>
          </div>

          <button className="btnSm" onClick={() => setShowAddAdminForm(true)}>Add New Manager</button>
      </div>
      <p>View all of manager information</p>

      {showAddAdminForm && <CustomModal closeModal={setShowAddAdminForm}> <AddManagerForm /> </CustomModal>}


      {/* <CustomTable
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
      /> */}

      <NewCustomTable
        titles={["Name", "Status", "Refresh Date", "Action"]}
        data={mappedManagersData}
        isButton={true}
        totalLength={allManagers?.length}
        handleBtnClick={goToAdminDetails}
      />

    </section>
  )
}

export default Dashboard;