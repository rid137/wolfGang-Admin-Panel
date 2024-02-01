import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
// import { UserAuth } from "../../hooks/userAuthContext";
import axios from "axios";
import { BASE_URL } from "../../libs";
import NewCustomTable from "../../components/common/newCustomTable";
import { AdminAuth } from "../../hooks/useAdminAuthContext";


const DisputeCenter = () => {
  const [allClients, setAllClients] = useState([]);
  const navigate = useNavigate();

  const { adminAuthData  } = AdminAuth();
  const accessToken = adminAuthData?.token;
  // const id = managerObj?.id
  // console.log("manId", managerObj)

  // `${BASE_URL}/admin/getClientForDispute/${}`,

  const fetchClientForDispute = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/getClientForDispute/43`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const clientsData = response.data;
      setAllClients(clientsData);
      console.log("clientDetails", clientsData)

      return clientsData;
    } catch (error) {
        console.error('Error fetching all clients:', error);
      }
  };

  useEffect(() => {
    const fetchClientForDisputeInfo = async () => {
      await fetchClientForDispute();
    };
    
    accessToken && fetchClientForDisputeInfo();
  }, [accessToken]);


  const mappedClientsData = allClients.slice(0, 10).map((item: any) => ({
    id: item.id,
    firstBody: `${item.firstName}   ${item.lastName}`,
    secondBody: item.status ? item.status : 'active',
    thirdBody: DateTime.fromISO(item.updatedAt).toLocaleString(DateTime.DATE_MED),
    fourthBody: "Details"
  }));

  const goToDisputeAccounttDetails = (id: number) => {
    navigate(`/dashboard/dispute_center/dispute_account_details/${id}`);
  };

  return(
    <section className="">
      <h4 className="font-bold text-[1.4rem] mb-4">Dispute Center</h4>
      <h5 className="font-bold text-[1.2rem]">Unsettled Account</h5>
      <p>Accounts For Disputed Account Setup</p>

      {/* <CustomTable
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
      /> */}

      <NewCustomTable
        titles={["Name", "Status", "Refresh Date", "Action"]}
        data={mappedClientsData}
        isButton={true}
        totalLength={allClients?.length}
        handleBtnClick={(id: number) => goToDisputeAccounttDetails(id)}
      />

    </section>
  )
}

export default DisputeCenter;