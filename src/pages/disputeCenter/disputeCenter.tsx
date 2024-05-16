import { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { DateTime } from "luxon";
// import { UserAuth } from "../../hooks/userAuthContext";
import axios from "axios";
import { BASE_URL } from "../../libs";
// import NewCustomTable from "../../components/common/newCustomTable";
import { AdminAuth } from "../../hooks/useAdminAuthContext";
import { Roles } from "../dashboard/dashboard";
import { useQuery } from "@tanstack/react-query";
// import { DisputeAccountType } from "../../types/clientDetailsObj";
import { UserTable } from "../../components/common/userTable";
import { disputeCenterTableColumns } from "../../components/common/reactTableColumn";


const DisputeCenter = () => {
  const [ , setDisputeAccounts] = useState([]);
  // const navigate = useNavigate();

  const { adminAuthData  } = AdminAuth();
  const accessToken = adminAuthData?.token;
  const id = adminAuthData?.userId
  const role = adminAuthData?.role
  // const id = managerObj?.id
  // console.log("manId", managerObj)

  // `${BASE_URL}/admin/getClientForDispute/${}`,

  const fetchDisputeAccountsForManager = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/getClientForDispute/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const clientsData = response.data;
      setDisputeAccounts(clientsData);
      // console.log("clientDetails", clientsData)

      return clientsData;
    } catch (error) {
        console.error('Error fetching dispute accounts:', error);
      }
  };

  const fetchDisputeAccountsForAdmin = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/getAllClientsForDispute`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const clientsData = response.data;
      setDisputeAccounts(clientsData);
      // console.log("clientDetails", clientsData)

      return clientsData;
    } catch (error) {
        console.error('Error fetching dispute accounts:', error);
      }
  };

  const fetchDisputeAccountsForManagerInfo = async () => {
    return role === Roles.Admin ? await fetchDisputeAccountsForAdmin() : await fetchDisputeAccountsForManager();
  };

  // const [clientsForManager, managerDetails ] = useQueries({
  //   queries: [
  //     { queryKey: ['clientsForAManager'], queryFn: fetchClientsForManager, enabled: !!accessToken },
  //     { queryKey: ['singleClient'], queryFn: fetchSingleClient, enabled: !!accessToken },
  //   ]
  // })

  const { isLoading,  data: clientForDispute } = useQuery({
    queryKey: ['disputeAccount'],
    queryFn: fetchDisputeAccountsForManagerInfo,
    enabled: !!accessToken
  })

    // useEffect(() => {
      
      //   accessToken && fetchDisputeAccountsForManagerInfo();
      // }, [accessToken]);
      
      const memoizedclientForDisputeData = useMemo(() => clientForDispute, [clientForDispute])
      
      if(isLoading) {
        return <p>Loading...</p>
      }
  // const mappedClientsData = (data ?? [])?.slice(0, 10).map((item: any) => ({
  //   id: item.id,
  //   firstBody: `${item.firstName}   ${item.lastName}`,
  //   secondBody: item.status ? item.status : 'active',
  //   thirdBody: DateTime.fromISO(item.updatedAt).toLocaleString(DateTime.DATE_MED),
  //   fourthBody: "Details"
  // }));

  // const goToDisputeAccounttDetails = (id: number) => {
  //   navigate(`/dashboard/dispute_center/dispute_account_details/${id}`);
  // };

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

      <UserTable data={memoizedclientForDisputeData ?? []} columns={disputeCenterTableColumns} />

      {/* <NewCustomTable
        titles={["Name", "Status", "Refresh Date", "Action"]}
        data={mappedClientsData && mappedClientsData}
        isButton={true}
        totalLength={disputeAccounts?.length}
        handleBtnClick={(id: number) => goToDisputeAccounttDetails(id)}
      /> */}

    </section>
  )
}

export default DisputeCenter;