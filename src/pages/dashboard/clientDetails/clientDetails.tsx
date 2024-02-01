import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import backarrow from "../../../assets/backarrow.svg"
import Disputes from "../../../components/dashboardContent/clientDetailsContent/disputes";
import CustomLabelInput from "../../../utils/customLabelInput";
// import { UserAuth } from "../../../hooks/userAuthContext";
import { BASE_URL } from "../../../libs";
import { Piechart } from "../../../components/dashboardContent/clientDetailsContent/pie_chart";
import { AdminAuth } from "../../../hooks/useAdminAuthContext";

const ClientDetails = () => {
    const [showClientDetails, setShowClientDetails] = useState<boolean>(false);
    const [singleClient, setSingleClient] = useState<any>();

    const { id } = useParams();

    const navigate = useNavigate();

    const { adminAuthData  } = AdminAuth();
    const accessToken = adminAuthData?.token;

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

          setSingleClient(clientsData);
      
          return clientsData;
        } catch (error) {
          console.error('Error fetching single client:', error);
        }
    };

    const [allScores, setAllScores] = useState<any>()


    const fetchAllScores = async () => {
        console.log("id", id)
        try {
          const response = await axios.get(
            `${BASE_URL}/scores/getall/${id}?clientId=${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
              },
            }
          );
          const allScoresData = response.data;

            setAllScores(allScoresData)

          return allScoresData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
    };

    useEffect(() => {
        const fetchSingleClientInfo = async () => {
          await fetchSingleClient();
        };

        const fetchAllScoresInfo = async () => {
            await fetchAllScores();
            // console.log("allScoresInfo", allScoresInfo);
        };
          
        
        accessToken && fetchSingleClientInfo();
        accessToken && fetchAllScoresInfo();
    }, [accessToken]);

    const handleClick = () => {
        setShowClientDetails(!showClientDetails)
    }

    const goBack = () => {
        history.back();
    }

    const goToBilling = () => {
        navigate("/dashboard/client_details/billing")
    }

    const goToDisputeCenter = () => {
        navigate("/dashboard/dispute_center")
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

            <div className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-6">
                <div className="w-full md:w-1/3 flex flex-col">
                    <p className="font-bold mb-3">Experian score</p>
                    <Piechart datas={ allScores && allScores[0]?.experianScore} />

                </div>

                <div className="w-full md:w-1/3 flex flex-col">
                    <p className="font-bold mb-3">Equifax score</p>
                    <Piechart datas={allScores && allScores[0]?.equifaxScore} />
                </div>

                <div className="w-full md:w-1/3 flex flex-col">
                    <p className="font-bold mb-3">Transunion score</p>
                    <Piechart datas={allScores && allScores[0]?.transunionScore} />
                </div>
                
            </div>

            {
                showClientDetails && Object.keys(singleClient).length > 0 &&

                <div className="bg-[#E7E7E7] p-4 mt-6">
                    <form action="">
                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col">
                            <CustomLabelInput label="Name" text={`${singleClient?.firstName} ${singleClient?.middleName} ${singleClient?.lastName}`}/>
                            <CustomLabelInput label="Email" text={`${singleClient?.email}`}/>
                            <CustomLabelInput label="Status" text={`${singleClient?.status ? singleClient?.status : "active"}`} />
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                            <CustomLabelInput label="Account manager" text="John Coole"/>
                            <CustomLabelInput label="Phone" text={`${singleClient?.phone}`}/>
                            <CustomLabelInput label="Date Created" text={DateTime.fromISO(singleClient?.createdAt).toLocaleString(DateTime.DATE_MED)}/>
                        
                        </div> 

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                            <CustomLabelInput label="Verified date" text={DateTime.fromISO(singleClient?.updatedAt).toLocaleString(DateTime.DATE_MED)}/>
                            <CustomLabelInput label="Address" text={`${singleClient?.streetAddr}`}/>
                            <CustomLabelInput label="Last Payment" text="20/03/2023"/>
                        
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                            <CustomLabelInput label="LTV" text="$1,283.00"/>
                            <CustomLabelInput label="SSN" text={`${singleClient?.ssn}`}/>
                            <CustomLabelInput label="Goal" text="Higher credit score"/>
                        
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                            <CustomLabelInput label="DOB" text={`${singleClient?.dob}`}/>
                            <CustomLabelInput label="Next Round" text="21/04/2023"/>
                            <CustomLabelInput label="Date of Payment" text="6/11/2023"/>
                        
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                            <CustomLabelInput label="Experian Score" text={`${singleClient?.experianScore}`}/>
                            <CustomLabelInput label="Equifax Score" text={`${singleClient?.equifaxScore}`}/>
                            <CustomLabelInput label="Transunion Score" text={`${singleClient?.transunionScore}`}/>
                        
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-6">
                            <CustomLabelInput label="Total Accounts" text="741"/>
                            <CustomLabelInput label="Total Inquires" text="751"/>
                            <CustomLabelInput label="ID Combined" text="Analise.pdf"/>
                        
                        </div>

                    

                        <div className="flex items-cente justify-start gap-">
                            <p  className="bg-[#DCDDE0] font-bold rounded-tl-lg rounded-bl-lg text-[.7rem] sm:text-[.9rem]  p-4 text-center">Login Details</p>
                            <div className="bg-white  p-4 md:pr-16 rounded-tr-lg text-[.7rem] sm:text-[.9rem] rounded-br-lg">
                                <p>{adminAuthData?.email}</p>
                                <p>password1</p>
                                <p>{`${singleClient?.firstName} ${singleClient?.middleName} ${singleClient?.lastName}`}</p>
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

            <Disputes id={id as string} accessToken={accessToken as string} />
            
        </section>
    )
}

export default ClientDetails;