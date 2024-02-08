import backarrow from "../../assets/backarrow.svg"
import CustomLabelInput from "../../utils/customLabelInput";
import CustomTableWithLetter from "../../components/letterCreation/customTableWithLetter";
import Inquiries from "../../components/dashboardContent/clientDetailsContent/inquiries";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../libs";
import { useEffect, useState } from "react";
import { ManagerProfileType } from "../../types/managerObj";
import { AdminAuth } from "../../hooks/useAdminAuthContext";
import { DateTime } from "luxon";
import toast from "react-hot-toast";

const LetterCreationDetails = () => {
    const [singleClient, setSingleClient] = useState<ManagerProfileType>();
    const [experianPairs, setExperianPairs] = useState<any>();
    const [equifaxPairs, setEquifaxPairs] = useState<any>();
    const [transunionPairs, setTransunionPairs] = useState<any>();

    const [fileInfo1, setFileInfo1] = useState<any>();
    const [fileName1, setFileName1] = useState<string | undefined>("");

    
    // const uploadId = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files && e.target.files[0];
    //     console.log("file", file)
    //     setFileName(file?.name)
      
    //     if (file) {
    //     //   setPlaceholderImg(file);
      
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         const thumbnail = reader.result as string;
    //         setFileInfo(thumbnail);
    //       };
      
    //       reader.readAsDataURL(file);
    //     }
    //   };

    const handleUploadId1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        // console.log("file", file)
        setFileName1(file?.name)
      
        if (file) {
        //   setPlaceholderImg(file);
      
          const reader = new FileReader();
          reader.onload = () => {
            const thumbnail = reader.result as string;
            setFileInfo1(thumbnail);
          };
      
          reader.readAsDataURL(file);
        }
    };
    
   


    const { id } = useParams();

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

    const fetchExperianAccountPairs = async () => {
        try {
            const response = await axios.get(
            `${BASE_URL}/pairing/getExperianPair/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
          );
          const experianAccountsData = response.data;
          setExperianPairs(experianAccountsData)
        //   console.log("expirain response", experianPairs)
      
        //   setExperianAccounts(experianAccountsData);
      
          return experianAccountsData;
        } catch (error) {
            console.error('Error fetching all clients:', error);
        }
    };

    const fetchEquifaxAccountPairs = async () => {
        try {
            const response = await axios.get(
            `${BASE_URL}/pairing/getEquifaxPair/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
          );
          const experianAccountsData = response.data;
          setEquifaxPairs(experianAccountsData)
        //   console.log("Equifax response", equifaxPairs)
      
        //   setExperianAccounts(experianAccountsData);
      
          return experianAccountsData;
        } catch (error) {
            console.error('Error fetching all clients:', error);
        }
    };

    const fetchTransunionAccountPairs = async () => {
        try {
            const response = await axios.get(
            `${BASE_URL}/pairing/getTransPair/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
          );
          const transunionAccountsData = response.data;
          setTransunionPairs(transunionAccountsData)
        //   console.log("transunion response", transunionPairs)
      
        //   setTransunionAccounts(TransunionAccountsData);
      
          return transunionAccountsData;
        } catch (error) {
            console.error('Error fetching all clients:', error);
        }
    };
      

    useEffect(() => {
        const fetchSingleClientInfo = async () => {
          await fetchSingleClient();
        };

        // const fetchExperianAccountInfo = async () => {
        //     const expair = fetchExperianAccountPairs()
            
        //     console.log("experian pair", expair)
        // }
        
        accessToken && fetchExperianAccountPairs();
        accessToken && fetchEquifaxAccountPairs();
        accessToken && fetchTransunionAccountPairs();
        accessToken && fetchSingleClientInfo();
    }, [accessToken]);

    const handleDelete = async () => {
        if(window.confirm('Are you sure you want to delete the pairs'))  {
            toast.loading("Processing, Please Wait!")
    
          try {
              const response = await axios.delete(
                `${BASE_URL}/pairing/delete/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    // 'Content-Type': 'application/json',
                  },
                }
              );
              toast.dismiss();

              if (response.status === 200) {
                toast.success('success')
                await fetchExperianAccountPairs();
                await fetchEquifaxAccountPairs();
                await fetchTransunionAccountPairs()
              }
    
          } catch (error) {
            toast.remove()
            toast.error('something went wrong')
            console.error('error occurred:', error);
          }
    
        }        
      }


    const goBack = () => {
        history.back();
    }
  return (
    <section>
        <div className="md:flex justify-between items-center ">
            <div className="cursor-pointer mb-4 md:mb-0" onClick={goBack}>
                <div className="flex items-center gap-2">
                    <img src={backarrow} alt="" />
                    <h4 className="font-bold text-[1.4rem]">Client Details</h4>
                </div>
                <p className="ml-5">View Client Details</p>
            </div>

            <button className="btnXs ml-3" onClick={handleDelete}>Mark as completed</button>
        </div>

        <div className="bg-[#E7E7E7] p-4 mt-6">
            <form action="">                     
                <div className="flex items-center justify-start gap-3  lg:flex-row flex-col">
                    <CustomLabelInput label="Name" text={`${singleClient?.firstName} ${singleClient?.lastName}`} />
                    <CustomLabelInput label="DOB" text={`${singleClient?.dob && DateTime.fromFormat(singleClient?.dob, 'MM/dd/yyyy').toFormat('LLL d yyyy')}`}/>
                    <CustomLabelInput label="SSN" text={`${singleClient?.ssn}`}/>
                </div>

                <div className="flex items-center justify-start gap-3 my-6 lg:flex-row flex-col">
                    <CustomLabelInput label="Address" text={`${singleClient?.streetAddr}`}/>
                    <CustomLabelInput label="ID Combined" text="Analise.pdf"/>
                
                </div>
            </form>
        </div>

        <CustomTableWithLetter label="Experian" text="Experian" burResponse={experianPairs && experianPairs} AccSet={experianPairs && experianPairs[0]?.accounts} fileInfo={fileInfo1} fileName={fileName1} uploadId={handleUploadId1} inpId="id_upload_1" accSetId={experianPairs && experianPairs[0]?.id} />
        <Inquiries InqAcc={experianPairs && experianPairs[0]?.inquiries} />
        {/* <CustomTableWithLetter label="Next Group Of Experian Disputed Accounts (6-10)" text="Experian" AccSet={experianPairs && experianPairs[1]?.accounts} uploadId={handleUploadId2} fileInfo={fileInfo2} fileName={fileName2}   inpId="id_upload_2" accSetId={experianPairs && experianPairs[1].id} /> */}

        {/* {experianPairs && experianPairs[2]?.accounts &&  <CustomTableWithLetter label="Next Group Of Experian Disputed Accounts (11-13)" text="Experian" inpId="id_upload_3" accSetId={experianPairs && experianPairs[2].id} />} */}

        <CustomTableWithLetter label="Equifax" text="Experian" burResponse={equifaxPairs && equifaxPairs}  />
        <Inquiries InqAcc={equifaxPairs && equifaxPairs[0]?.inquiries} />

        <CustomTableWithLetter label="Transunion" text="Experian" burResponse={transunionPairs && transunionPairs}  />
        <Inquiries InqAcc={transunionPairs && transunionPairs[0]?.inquiries} />




        

        {/* <CustomTableWithLetter label="Equifax Disputed Accounts (1-5)" text="Equifax" AccSet={equifaxPairs && equifaxPairs[0]?.accounts} inpId="id_upload_4" accSetId={equifaxPairs && equifaxPairs[0].id} />
        <Inquiries InqAcc={experianPairs && experianPairs[0]?.inquiries} />
        <CustomTableWithLetter label="Next Group Of Equifax Disputed Accounts (6-10)" text="Equifax" AccSet={equifaxPairs && equifaxPairs[1]?.accounts} inpId="id_upload_5" accSetId={equifaxPairs && equifaxPairs[1].id} />

        
        <CustomTableWithLetter label="Next Group Of Equifax Disputed Accounts (11-13)" text="Equifax" AccSet={equifaxPairs && equifaxPairs[2]?.accounts} inpId="id_upload_6" accSetId={equifaxPairs && equifaxPairs[2].id} />
             */}

           
        {/* <div className="w-full mx-auto flex items-center justify-center mt-8">
            <img src={inquiryLine} className="w-[70%]" alt="" />
        </div> */}

        {/* <CustomTableWithLetter label="Transunion Disputed Accounts (1-5)" text="Transunion" AccSet={transunionPairs && transunionPairs[0]?.accounts} />
        <Inquiries InqAcc={transunionPairs && transunionPairs[0]?.inquiries} />

        <CustomTableWithLetter label="Next Group Of Transunion Disputed Accounts (6-10)" text="Transunion" AccSet={transunionPairs && transunionPairs[1]?.accounts} />
        <CustomTableWithLetter label="Next Group Of Transunion Disputed Accounts (11-15)" text="Transunion" AccSet={transunionPairs && transunionPairs[2]?.accounts} /> */}
    </section>
  )
}

export default LetterCreationDetails;



{/* <div className=" gap-4 flex flex-col md:flex-row items-center justify-center mt-6">
                <div className="w-full md:w-2/3">
                    <h4 className="font-bold text-[1.4rem]">Next Group Of Experian Disputed Accounts (11-13)</h4>
                    <p className="">Lists of accounts under Experian. In groups of five.  </p>

                    <div className="bg-greyBg text-black text-center py-5 mt-5 rounded-md"> 
                
                        <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem] mt-">
                            <p>Account Name</p>
                            <p>Account Number</p>
                            <p >Balance</p>
                            
                        </div>
                       
                        <div className="bg-white mx-4 rounded-lg" >
                            <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                                <p>PENN CREDIT</p>
                                <p className="">3468632112</p>
                                <p className="">$1,245</p>
                            </div>

                        </div>
                        
                        <div className="bg-white mx-4 rounded-lg" >
                            <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                                <p>PENN CREDIT</p>
                                <p className="">3468632112</p>
                                <p className="" style={{visibility: "hidden"}}>$1,245</p>
                            </div>

                        </div>

                        <div className="bg-white mx-4 rounded-lg" >
                            <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                                <p>PENN CREDIT</p>
                                <p className="-12">3468632112</p>
                                <p className="-28">$1,245</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="w-full md:w-1/3">
                    <h4 className="font-bold text-[1.4rem]">FTC Letters</h4>
                    <p className="">Upload document(s) the accounts.</p>
                    <div className="bg-greyBg w-full h-[14.4rem] flex__center mt-5">
                        <img src={file} className="bg-greyBg text-greyBg" alt="" />
                    </div>
                </div>             
            </div> */}



 {/* <div className=" gap-4 flex flex-col md:flex-row items-center justify-center mt-6">
                <div className="w-full md:w-2/3">
                    <h4 className="font-bold text-[1.4rem]">Next Group Of Equifax Disputed Accounts (11-12)</h4>
                    <p className="">Lists of accounts under Experian. In groups of five.  </p>

                    <div className="bg-greyBg text-black text-center py-5 mt-5 rounded-md"> 
                
                        <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem] mt-">
                            <p>Account Name</p>
                            <p>Account Number</p>
                            <p >Balance</p>
                            
                        </div>
                       
                        <div className="bg-white mx-4 rounded-lg" >
                            <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                                <p>PENN CREDIT</p>
                                <p className="">3468632112</p>
                                <p className="">$1,245</p>
                            </div>

                        </div>

                        <div className="bg-white mx-4 rounded-lg" >
                            <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                                <p>PENN CREDIT</p>
                                <p className="-12">3468632112</p>
                                <p className="-28">$1,245</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="w-full md:w-1/3">
                    <h4 className="font-bold text-[1.4rem]">FTC Letters</h4>
                    <p className="">Upload document(s) the accounts.</p>
                    <div className="bg-greyBg w-full h-[11rem] flex__center mt-5">
                        <img src={file} className="bg-greyBg text-greyBg" alt="" />
                    </div>
                </div>             
            </div> */}