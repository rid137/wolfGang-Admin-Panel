import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import CustomInput from "../../utils/customInput";
import backarrow from "../../assets/backarrow.svg";
import AddDisputeAccount from "../../components/disputeCenterContent/addDisputeAccount";
import AddInquiry from "../../components/disputeCenterContent/addInquiry";
import FicoScoreTable from "../../components/disputeCenterContent/ficoScoreTable";
import AccountListTable from "../../components/disputeCenterContent/accountListTable";
import InquiryListTable from "../../components/disputeCenterContent/inquiryListTable";
// import { UserAuth } from "../../hooks/userAuthContext";
import { BASE_URL } from "../../libs";
import { AdminAuth } from "../../hooks/useAdminAuthContext";
import { ManagerProfileType } from "../../types/managerObj";


export const addFicoScoreSchema = z.object({
    experian: z.string({
        required_error: "experian is required",
        invalid_type_error: "experian must be a number",
      }),
    equifax: z.string({
    required_error: "equifax is required",
    invalid_type_error: "equifax must be a number",
    }),    
    transunion: z.string({
        required_error: "transunion is required",
        invalid_type_error: "transunion must be a number",
      }),
    // experian: z.string().max(850),
    // equifax: z.string().max(850),    
    // transunion: z.string({
    //     required_error: "transunion is required",
    //     invalid_type_error: "transunion must be a number",
    //   }),
    
});
  
type FormFields = z.infer<typeof addFicoScoreSchema>;


const DisputeAccountDetails = () => {

    const [singleClient, setSingleClient] = useState<any>();

    const { id } = useParams();

    const [allScores, setAllScores] = useState<any>()
    const [allAccounts, setAllAccounts] = useState<ManagerProfileType[]>([])



    // const navigate = useNavigate();

    const { adminAuthData } = AdminAuth();
    const accessToken = adminAuthData?.token
    

    const fetchSingleClient = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/user/getUser/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
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
            await fetchAllScores();
    
          return allScoresData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
      };

      const fetchAllAccounts = async () => {
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

          setAllAccounts(allAccountsData);
      
          return allAccountsData;
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

        const fetchAllAccountsInfo = async () => {
        await fetchAllAccounts();
        };
        
        accessToken && fetchAllAccountsInfo();

        accessToken && fetchSingleClientInfo();
          accessToken && fetchAllScoresInfo();
    }, [accessToken]);


    const sendToProcessTeam = async () => {
        const toastId = toast.loading("Sending to processing team");
    
        try {        
            const response = await axios.post(`${BASE_URL}/pairing/pairAccount/${id}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            // console.log("response", response.data);
            
            if (response.status === 200) {
                toast.success("Sent successfully", { id: toastId });
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
    };
    


    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
    resolver: zodResolver(addFicoScoreSchema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // console.log(data);

        const currentTimestamp = Date.now();
        const currentDateTime = DateTime.fromMillis(currentTimestamp);
        let formattedDate = currentDateTime.toISO();
        formattedDate = `${formattedDate?.slice(0, -1)}.${currentDateTime.toFormat('SSS')}Z`;


        const formData = new FormData();
        
        formData.append('equifaxScore', data.equifax as string);
        formData.append('experianScore', data.experian as string);
        formData.append('transunionScore', data.transunion as string);
        // formData.append('date', formattedDate);

        const toastId = toast.loading("Adding Scores");

        try {        
            const response = await axios.post(`${BASE_URL}/scores/save/${id}?clientId=${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            // console.log("response", response.data);
            
            if (response.status === 200) {
                toast.success("Scores added successfully", { id: toastId });
                await fetchAllAccounts();
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
        
        reset()
    };


    const goBack = () => {
        history.back();
    }

  return (
    <section>
        
        <div className="sm:flex justify-between items-center mb-5">
            <div className="cursor-pointer" onClick={goBack}>
                <div className="flex items-center gap-2">
                    <img src={backarrow} alt="" />
                    <h4 className="font-bold text-[1.4rem]">Client Details</h4>
                </div>
            </div>

            
            <button className="btnXs mt-4 sm:mt-0" onClick={sendToProcessTeam}>Send to Processing Team</button>
                
            
        </div>

        {
            !singleClient || singleClient?.length === 0 ? 
            <>
                <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                    <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                        <h4 className="font-bold text-[1.3rem] text-primary mb-3 bg-[#bbbaba] animate-pulse h-7"></h4>
                        <div className="">
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 '></p>

                        </div>
                    </div> 

                    <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                        <h4 className="font-bold text-[1.3rem] text-primary mb-3 bg-[#bbbaba] animate-pulse h-7"></h4>
                        <div className="">
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 '></p>

                        </div>
                    </div> 

                
                    <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                        <h4 className="font-bold text-[1.3rem] text-primary mb-3 bg-[#bbbaba] animate-pulse h-7"></h4>
                        <div className="">
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 mb-3'></p>
                            <p className='font-bold bg-[#bbbaba] animate-pulse h-5 '></p>

                        </div>
                    </div> 
                </div>
            </>
            :  
            <>
                <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                    <h4 className="font-bold text-[1.3rem] text-primary mb-3">Client Details</h4>
                    <div className="ml-4">
                        <p><span className='font-bold'>Name :</span>  {singleClient?.firstName} {singleClient?.middleName} {singleClient?.lastName}</p>
                        <p ><span className='font-bold'>Address : </span>  {singleClient?.streetAddr}</p>
                        <p><span className='font-bold'>DOB : </span>  {singleClient?.dob && DateTime.fromFormat(singleClient?.dob, 'MM/dd/yyyy').toFormat('LLL d yyyy')}</p>
                        <p><span className='font-bold'>SSN : </span>  {singleClient?.ssn}</p>
                        <p><span className='font-bold'>ID Combined : </span>  <span className="text-primary">Analise.pdf</span></p>

                    </div>
                </div> 

                <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                    <h4 className="font-bold text-[1.3rem] text-primary mb-3">Log In Details</h4>
                    <p className='font-bold ml-4'>MyScoreIQ: </p>
                    <div className="ml-6">
                        <p>Username: {singleClient?.firstName} </p>
                        <p>Password: password1 </p>
                        <p>Last 4 Digits: {singleClient?.phone.slice((singleClient.phone.length - 1) -3, singleClient.phone.length - 0)}</p>
                        
                    </div>

                    <p className='font-bold ml-4'>Transunion: </p>
                    <div className="ml-6">
                        <p>Username: {singleClient?.firstName}  </p>
                        <p>Password: password1 </p>
                        
                    </div>

                    <p className='font-bold ml-4'>Experian: </p>
                    <div className="ml-6">
                        <p>Username: {singleClient?.firstName} </p>
                        <p>Password: password1  </p>
                        <p>Publix: 3353 </p>
                        
                    </div>
                </div> 

                    
                <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                    <h4 className="font-bold text-[1.3rem] text-primary mb-3">Team Notes <span className='text-[1rem]'>(updated regularly) :</span></h4>
                    <p className='font-bold ml-4'> Don’t Dispute Open Card </p>
                </div> 
            </div>
            </>
            // <ClientLoginDetails singleClient={singleClient && singleClient} />

            
        }
        

        <h3 className="text-center font-bold text-[1.4rem] my-4">Add FICO Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-2   lg:grid-cols-3 gap-4 w-ful mb-6">
            <div className="flex flex-col w-1/">
                <label className="font-bold">Current Experian Score</label>
                <CustomInput placeholder="534" />
            </div>
            
            <div className="flex flex-col w-1/">
                <label className="font-bold">Current Equifax Score</label>
                <CustomInput placeholder="564" />
            </div>

            <div className="flex flex-col w-1/">
                <label className="font-bold">Current Transunion Score</label>
                <CustomInput placeholder="532" />
            </div>
            
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="grid grid-cols-1 md:grid-cols-2   lg:grid-cols-3 gap-4 w-ful mb-6">
                <div className="flex flex-col w-1/">
                    <label className="font-bold">Experian FICO Score</label>
                    {/* <CustomInput placeholder="Enter Score" /> */}
                    <input {...register('experian')} type="number" max='850'  className="inputCls" placeholder="Enter Score"  />
                    {errors.experian && (
                        <p className="text-red-600">{errors.experian.message}</p>
                    )}
                </div>
                
                <div className="flex flex-col w-1/">
                    <label className="font-bold">Equifax FICO Score</label>
                    {/* <CustomInput placeholder="Enter Score" /> */}
                    <input {...register('equifax')} type="number" max='850' className="inputCls" placeholder="Enter Score"  />
                    {errors.equifax && (
                        <p className="text-red-600">{errors.equifax.message}</p>
                    )}
                </div>

                <div className="flex flex-col w-1/">
                    <label className="font-bold">Transunion FICO Score</label>
                    {/* <CustomInput placeholder="Enter Score" /> */}
                    <input {...register('transunion')} type="number" max='850' className="inputCls" placeholder="Enter Score" />
                    {errors.transunion && (
                        <p className="text-red-600">{errors.transunion.message}</p>
                    )}
                </div>
            </div>
            <div className="flex__center">
                {/* <button className="btnLg">Submit</button> */}
                <button disabled={isSubmitting} type="submit" className="btnLg">{ isSubmitting ? "Loading..." : "Continue"}</button>


            </div>
        </form>

        <AddDisputeAccount id={id as string} accessToken={accessToken as string} />
        <AddInquiry id={id as string} accessToken={accessToken as string} />
        <FicoScoreTable id={id as string} accessToken={accessToken as string} allScores={allScores} />
        <AccountListTable id={id as string} accessToken={accessToken as string} allAccounts={allAccounts} fetchAllAccounts={fetchAllAccounts} />
        <InquiryListTable id={id as string} accessToken={accessToken as string} />
    </section>
  )
}

export default DisputeAccountDetails;
