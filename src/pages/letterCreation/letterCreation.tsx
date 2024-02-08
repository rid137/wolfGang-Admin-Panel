import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../libs";
import { AdminAuth } from "../../hooks/useAdminAuthContext";
import { DateTime } from "luxon";
import NewCustomTable from "../../components/common/newCustomTable";
import { ManagerProfileType } from "../../types/managerObj";
import { Roles } from "../dashboard/dashboard";

const LetterCreation = () => {
  const [clientsForLetter, setClientsForLetter] = useState<ManagerProfileType[]>([]);

  const { adminAuthData } = AdminAuth();
  const accessToken = adminAuthData?.token;
  const id = adminAuthData?.userId;
  const role = adminAuthData?.role;

  const navigate = useNavigate();

  const fetchClientsForLetterManager = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/getClientForLetter/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const clientsData = response.data;

      setClientsForLetter(clientsData);
  
      return clientsData;
    } catch (error) {
      console.error('Error fetching all clients:', error);
    }
  };

  const fetchClientsForLetterAdmin = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/getAllClientsForLetter`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const clientsData = response.data;

      setClientsForLetter(clientsData);
  
      return clientsData;
    } catch (error) {
      console.error('Error fetching all clients:', error);
    }
  };

  useEffect(() => {
    const fetchClientsForLetterInfo = async () => {
      role === Roles.Admin ? await fetchClientsForLetterAdmin() : await fetchClientsForLetterManager();
    };
    
    accessToken && fetchClientsForLetterInfo();
  }, [accessToken]);
      
  const mappedClientsData = clientsForLetter.slice(0).map((item: any) => ({
    id: item.id,
    firstBody: `${item.firstName}   ${item.lastName}`,
    secondBody: item.status ? item.status : 'active',
    thirdBody: DateTime.fromISO(item.updatedAt).toLocaleString(DateTime.DATE_MED),
    fourthBody: "Details",
  }));

  const goToDisputeAccounttDetails = (id: number) => {
      navigate(`/dashboard/letter_creation/letter_creation_details/${id}`)
  }
    

    return(
        <section className="">
            <h4 className="font-bold text-[1.4rem] mb-4">Letter Creation</h4>
            
            {/* <CustomTable
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
            /> */}

            

            <NewCustomTable
                titles={["Name", "Status", "Refresh Date", "Action"]}
                data={mappedClientsData}
                isButton={true}
                totalLength={clientsForLetter?.length}
                handleBtnClick={(id: number) => goToDisputeAccounttDetails(id)}
            />

        </section>
    )
}

export default LetterCreation;


