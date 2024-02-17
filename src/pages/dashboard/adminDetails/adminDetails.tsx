import { IoIosArrowBack } from "react-icons/io";
import CustomLabelInput from "../../../utils/customLabelInput";
// import CustomTable from "../../../components/common/customTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../libs";
import { AdminAuth } from "../../../hooks/useAdminAuthContext";
import { useMemo } from "react";
// import { ClientDetailsType } from "../../../types/clientDetailsObj";
import { useQueries } from "@tanstack/react-query";
import { UserTable } from "../../../components/common/userTable";
import { adminClientsColumns } from "../../../components/common/reactTableColumn";
import { DateTime } from "luxon";


const AdminDetails = () => {
    // const [clientsUnderManager, setClientsUnderManager] = useState<ClientDetailsType | null>(null)
    const { id } = useParams();
    const { adminAuthData } = AdminAuth();
    const accessToken = adminAuthData?.token;


    // const navigate = useNavigate();

    // const goToClientDetails = () => {
    //     // TRY THIS LATER
    //     navigate(`/dashboard/client_details/${id}`)
    //     // navigate("/client_details")
    // };

    const fetchSingleClient = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/user/getUser/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const clientsData = response.data;

        //   setSingleClient(clientsData);
      
          return clientsData;
        } catch (error) {
          console.error('Error fetching single client:', error);
        }
    };



    // admin/getClientsForManager/${id}
    const fetchClientsForManager = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/admin/getClientsForManager/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const clientsData = response.data;
    
        //   setClientsUnderManager(clientsData);
      
          return clientsData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
    };

    const [clientsForManager, managerDetails ] = useQueries({
        queries: [
            { queryKey: ['clientsForAManager'], queryFn: fetchClientsForManager, enabled: !!accessToken },
            { queryKey: ['singleClient'], queryFn: fetchSingleClient, enabled: !!accessToken },
        ]
    })

    // const getIt = resultsTwo?

    // const { isLoading, isError, data: clientsUnderManager } = useQuery({
    //     queryKey: ['clientsForAManager'],
    //     queryFn: fetchClientsForManager,
    //     enabled: !!accessToken
    // })

    // console.log("clients Under manage", clientsForManager?.data)
    // console.log("managerDetails", managerDetails?.data)

    const memoizedClientsUnderManagerData = useMemo(() => clientsForManager?.data, [clientsForManager?.data])

    if(clientsForManager?.isLoading) {
        return <div className="">Loading...</div>
    }



    const goBack = () => {
        history.back();
    };

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
                    <div className="flex items-center justify-between w-full gap-4">
                        <CustomLabelInput label="Name" text={`${managerDetails?.data?.firstName} ${managerDetails?.data?.lastName} `} />
                        <CustomLabelInput label="Email" text={managerDetails?.data?.email}/>
                        <CustomLabelInput label="Status" text={managerDetails?.data?.status !== null ? managerDetails?.data?.status : "status"}/>
                    </div>

                    <div className="flex items-center justify-between my-6 gap-4">
                        <CustomLabelInput label="Phone" text={managerDetails?.data?.phone}/>
                        <CustomLabelInput label="Date Created" text={DateTime.fromISO(managerDetails?.data?.createdAt as string).toLocaleString(DateTime.DATE_MED)}/>
                        <CustomLabelInput label="Address" text={managerDetails?.data?.streetAddr !== null ? managerDetails?.data?.streetAddr : "streetAddr"}/>
                    
                    </div>

                    <div className="flex items-center justify-start gap-12">
                        <CustomLabelInput label="DOB" text={managerDetails?.data?.dob !== null ? managerDetails?.data?.dob : "dob"}/>
                        <CustomLabelInput label="Total Clients" text=""/>
                    
                    </div>
                </form>
            </div>

            <p className="font-bold text-[1.4rem] mt-6">Clients</p>
            <p>List of clients under this manager</p>

            {/* {
                isLoading && <div className="">Loading...</div>
            } */}

            <UserTable columns={adminClientsColumns} data={memoizedClientsUnderManagerData ?? []} />

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

        </section>
        
    )
}

export default AdminDetails;