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
import { ManagerProfileType } from "../../../types/managerObj";
import toast from "react-hot-toast";

const ClientDetails = () => {
    const [showClientDetails, setShowClientDetails] = useState<boolean>(false);
    const [singleClient, setSingleClient] = useState<ManagerProfileType>();
    const [allScores, setAllScores] = useState<any>()
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedClient, setUpdatedClient] = useState({ ...singleClient });
    const [showEditBtn, setShowEditBtn] = useState<boolean>(true)

    const [clientDisputeAccounts, setClientDisputeAccounts] = useState<ManagerProfileType[]>([])
    const [clientInquiries, setClientInquiries] = useState<any>()


    // console.log("singleClinet", singleClient)
    
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



    const fetchAllScores = async () => {
        // console.log("id", id)
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


    const fetchDisputeAccounts = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/account/findUnattendedAccounts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const allAccountsData = response.data;

          setClientDisputeAccounts(allAccountsData);
      
          return allAccountsData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
    };

  const fetchAllInquiries = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/inquiry/getInquiry/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // 'Content-Type': 'application/json',
          },
        }
      );
      const allInquiriesData = response.data;

      setClientInquiries(allInquiriesData);
  
      return allInquiriesData;
    } catch (error) {
      console.error('Error fetching all inquiries:', error);
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

        const fetchClientDisputeAccountsInfo = async () => {
            await fetchDisputeAccounts();
          //   console.log("allDisputeAccountsInfo", allDisputeAccountsInfo);
        };

        const fetchallInquiriesInfo = async () => {
            await fetchAllInquiries();
            // console.log("allInquiriesInfo", allInquiriesInfo);
        };

  
          
        
        accessToken && fetchSingleClientInfo();
        accessToken && fetchAllScoresInfo();
        accessToken && fetchClientDisputeAccountsInfo();
        accessToken && fetchallInquiriesInfo();
    }, [accessToken]);

    useEffect(() => {
        setUpdatedClient({...singleClient});  // Update updatedClient when singleClient changes
    }, [singleClient]);

    const updateClientData = async () => {
        const toastId = toast.loading("Updating Profile Information");

        const formData = new FormData()

        formData.append('email', updatedClient?.email as string);
        // formData.append('firstName', data.firstName as string);
        // formData.append('lastName', data.lastName as string);
        // // formData.append('password', data.password);
        // formData.append('phone', data.phoneNumber);
        // console.log("FormData contents:");
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }
    
        try {        
            const response = await axios.put(`${BASE_URL}/user/editUser/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            // console.log("response", response.data);
            
            if (response.status === 200) {
                toast.success("Profile Updated Successfully", { id: toastId });
            } else {
                toast.remove();
                toast.error(response.data.message);
            }
        } catch (error: any) {
            toast.remove();
            if (error.message === 'Failed to fetch') {
                toast.error('Network Error. Try again');
            } else {
                toast.error('Error encountered. Try again');
            }
            console.log(error.message);
        }
        setShowEditBtn(true)
    };
    

    const handleClick = () => {
        setShowClientDetails(!showClientDetails)
        setIsEditing(false)
    }

    const handleEditBtnClick = () => {
        setIsEditing(true);
        setShowEditBtn(false);
    }

    const handleTextChange = (property: string, newValue: any) => {
        setUpdatedClient((prevClient) => ({
            ...prevClient,
            [property]: newValue,
            
        }));
    };

    // if(singleClient !== undefined) {
    //     // console.log("updatedClient:", updatedClient);
    // }
    

    const goBack = () => {
        history.back();
    };

    const goToBilling = () => {
        navigate("/dashboard/client_details/billing")
    };

    const goToDisputeCenter = () => {
        navigate("/dashboard/dispute_center")
    };

    // const fullName = singleClient?.firstName  ${singleClient?.middleName} ${singleClient?.lastName}
    

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
                        {
                           showEditBtn ? <button className="btnXs ml-3" onClick={handleEditBtnClick}>Edit</button> : <button className="btnXs ml-3" onClick={updateClientData}>Save</button>
                        }
                        {/* <button className="btnXs ml-3" onClick={() => setIsEditing(true)}>{isEditing ? "Save" : "Edit"}</button> */}
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
                showClientDetails && Object.keys(singleClient ?? {}).length > 0 &&

                <div className="bg-[#E7E7E7] p-4 mt-6">
                    <form action="">
                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col">
                            <CustomLabelInput
                                isEditing={isEditing} label="Firstname"
                                onChange={(newValue) => handleTextChange("firstName", newValue)}
                                text={`${singleClient?.firstName}`}
                                autoFocus
                            />
                            <CustomLabelInput
                                isEditing={isEditing} label="Middlename"
                                onChange={(newValue) => handleTextChange("middleName", newValue)}
                                text={`${singleClient?.middleName}`}
                            />
                            <CustomLabelInput
                                isEditing={isEditing} label="Lastname"
                                onChange={(newValue) => handleTextChange("lastName", newValue)}
                                text={`${singleClient?.lastName}`}
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col">
                            {/* <CustomLabelInput
                                isEditing={isEditing} label="Name"
                                onChange={(newValue) => handleTextChange("name", newValue)}
                                text={`${singleClient?.firstName} ${singleClient?.middleName} ${singleClient?.lastName}`}
                            /> */}
                            <CustomLabelInput onChange={(newValue) => handleTextChange("email", newValue)} isEditing={isEditing} label="Email" text={`${singleClient?.email}`}/>
                            <CustomLabelInput onChange={(newValue) => handleTextChange("status", newValue)} isEditing={isEditing} label="Status" text={`${singleClient?.status ? singleClient?.status : "active"}`} disabled />
                            <CustomLabelInput isEditing={isEditing} label="Account manager" text={`${singleClient?.manager?.firstName} ${singleClient?.manager?.lastName}`}/>

                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-">
                            <CustomLabelInput isEditing={isEditing} onChange={(newValue) => handleTextChange("phone", newValue)} label="Phone" text={`${singleClient?.phone}`}/>
                            <CustomLabelInput isEditing={isEditing} onChange={(newValue) => handleTextChange("createdAt", newValue)} label="Date Created" text={DateTime.fromISO(singleClient?.createdAt as string).toLocaleString(DateTime.DATE_MED)}  disabled/>
                            <CustomLabelInput isEditing={isEditing} onChange={(newValue) => handleTextChange("updatedAt", newValue)} label="Verified date" text={DateTime.fromISO(singleClient?.updatedAt as string).toLocaleString(DateTime.DATE_MED)}  disabled/>

                        
                        </div> 

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-">
                            <CustomLabelInput isEditing={isEditing} onChange={(newValue) => handleTextChange("streetAddr", newValue)} label="Address" text={`${singleClient?.streetAddr}`} />
                            <CustomLabelInput isEditing={isEditing} label="Last Payment" text="20/03/2023" disabled/>
                            <CustomLabelInput isEditing={isEditing} label="LTV" text="$1,283.00" disabled/>
                        
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-">
                            <CustomLabelInput isEditing={isEditing} onChange={(newValue) => handleTextChange("ssn", newValue)} label="SSN" text={`${singleClient?.ssn}`}/>
                            <CustomLabelInput isEditing={isEditing} label="Goal" text="Higher credit score" disabled/>
                            <CustomLabelInput isEditing={isEditing} onChange={(newValue) => handleTextChange("streetAddr", newValue)} label="DOB" text={`${singleClient?.dob}`} disabled/>

                        
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-">
                            <CustomLabelInput isEditing={isEditing} label="Next Round" text="21/04/2023" disabled/>
                            <CustomLabelInput isEditing={isEditing} label="Date of Payment" text="6/11/2023" disabled/>
                            <CustomLabelInput isEditing={isEditing} onChange={(newValue) => handleTextChange("experianScore", newValue)} label="Experian Score" text={`${singleClient?.experianScore}`}/>

                        
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-">
                            <CustomLabelInput isEditing={isEditing} onChange={(newValue) => handleTextChange("equifaxScore", newValue)} label="Equifax Score" text={`${singleClient?.equifaxScore}`}/>
                            <CustomLabelInput isEditing={isEditing} onChange={(newValue) => handleTextChange("transunionScore", newValue)} label="Transunion Score" text={`${singleClient?.transunionScore}`}/>
                            <CustomLabelInput isEditing={isEditing} label="Total Accounts" text="741" disabled/>
                        
                        </div>

                        <div className="flex items-center justify-center gap-3 lg:flex-row flex-col my-">
                            <CustomLabelInput isEditing={isEditing} label="Total Inquires" text="751"/>
                            <CustomLabelInput isEditing={isEditing} label="ID Combined" text="Analise.pdf"/>
                        
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

            <Disputes id={id as string} accessToken={accessToken as string} clientDisputeAccounts={clientDisputeAccounts} clientInquiries={clientInquiries}   />
            
        </section>
    )
}

export default ClientDetails;