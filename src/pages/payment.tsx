// import { paymentData } from "../utils/dummy";
import mastercardLogo from "../assets/mastercardLogo.svg"
import exclaim from "../assets/exclaim.svg"
// import PaginationBtn from "../components/common/paginationBtn";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../libs";
import { AdminAuth } from "../hooks/useAdminAuthContext";
import { useQueries } from "@tanstack/react-query";
import { clipSentence } from "../utils/helpers";
import { useMemo, useState } from "react";
import { UserTable } from "../components/common/userTable";
import { paymentTableColumns } from "../components/common/reactTableColumn";
import { Roles } from "./dashboard/dashboard";

export enum Status {
    Success = "COMPLETED",
    Pending = "PENDING",
    Failed = "FAILED"
}

const addCardSchema = z.object({
    cardNumber: z.string().min(10, { message: "Please provide a valid card number" }),
    // cardName: z.string(),
    cvv: z.string(),
    expiryDate: z.string().refine((value) => {
        // Use a regular expression to validate the "mm/yy" format
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(value);
      }, {
        message: 'Invalid card expiry date format. Use "mm/yy".',
    }),
});

type FormFields = z.infer<typeof addCardSchema>;


const Payment = () => {
    const { adminAuthData  } = AdminAuth();
    const [isEditing, setIsEditing] = useState(false);

    const id = adminAuthData?.userId
    const accessToken = adminAuthData?.token
    const role = adminAuthData?.role

    console.log(adminAuthData)



    const fetchClientCards = async () => {
        // console.log("id", id)
        try {
          const response = await axios.get(
            `${BASE_URL}/card/getClientCards/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
              },
            }
          );
          const allScoresData = response.data;

            // setAllScores(allScoresData)

          return allScoresData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
    };

    

    // console.log('cardData', clientCards)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
    resolver: zodResolver(addCardSchema),
    });


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log(data);
        
        const formData = new FormData();
        
        // formData.append('cardName', "Hello");
        formData.append('cardNumber', data.cardNumber);
        formData.append('cvv', data.cvv);
        formData.append('expiryDate', data.expiryDate);

        // const dataSent = {
        //     id: 6,
        //     cardName: "Hello",
        //     cardNumber: data.cardNumber,
        //     cardCvv: data.cvv,
        //     expiryDate: data.expiryDate,
        //     isPrimary: true
        // }
        // console.log("FormData contents:");
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }

        // console.log("id", id)

        const toastId = toast.loading("Submitting Card Details");
        
        
        try {        
            const response = await axios.post(`${BASE_URL}/card/save/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            
            console.log("response", response);
            
            if (response.status === 200) {
                toast.success("Card details added successfully", { id: toastId });
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
            console.log(error);
        }

        // reset()
    };

    // const queryClient = useQueryClient();


    // const {mutate: addCardMutation} = useMutation<any, Error, FormFields>(
    //     async (data: any) => {
    //       const formData = new FormData();
    //       formData.append('cardNumber', data.cardNumber);
    //       formData.append('cvv', data.cvv);
    //       formData.append('expiryDate', data.expiryDate);
    
    //       const response = await axios.post(`${BASE_URL}/card/save/${id}`, formData, {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //           'Content-Type': 'application/json',
    //         },
    //       });
    
    //       return response.data; // Return data you want to use in onSuccess
    //     },
    //     {
    //       onSuccess: ({data}: any) => {
    //         // Handle success, maybe refetch data or update the UI
    //         // queryClient.invalidateQueries('cards'); // Assuming you have a query for 'cards'
    //         toast.success('Card details added successfully');
    //       },
    //     }
    //   );
    
      
    //   const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //     // try {
    //       await addCardMutation(data);
    //       // Handle any additional logic after successful mutation
    //     // } catch (error) {
    //     //   // Handle error
    //     // }
    //   };

    // const addCardMutation = useMutation<any, Error, FormFields>(
    //     async (param: FormFields) => {
    //       // Your mutation logic here
    //       const formData = new FormData();
    //       formData.append('cardNumber', param.cardNumber);
    //       formData.append('cvv', param.cvv);
    //       formData.append('expiryDate', param.expiryDate);
      
    //       const response = await axios.post(`${BASE_URL}/card/save/${id}`, formData, {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //           'Content-Type': 'application/json',
    //         },
    //       });
      
    //       return response.data; // Return data you want to use in onSuccess
    //     },
    //     {
    //       onSuccess: (data: any) => {
    //         // Handle success, maybe refetch data or update the UI
    //         // queryClient.invalidateQueries('cards'); // Assuming you have a query for 'cards'
    //         toast.success('Card details added successfully');
    //       },
    //     }
    //   );
      
    //   const { mutate: addCardMutationFn } = addCardMutation;
      
    //   // Usage
    //   const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //     await addCardMutationFn(data);
    //   };

    const fetchPayments = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/payment/getPayments${role === Roles.Manager ? `/${id}` : ''}`,
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

    // const { isLoading,  data: clientForDispute } = useQuery({
    //     queryKey: ['disputeAccount'],
    //     queryFn: fetchPayments,
    //     enabled: !!accessToken
    //   })

    //   const { isLoading,  data: clientCards } = useQuery({
    //     queryKey: ['clientCards'],
    //     queryFn: fetchClientCards,
    //     enabled: !!accessToken
    // })

    const [ clientCards, paymentData  ] = useQueries({
        queries: [
            { queryKey: ['clientCards'], queryFn: fetchClientCards, enabled: !!accessToken },
            { queryKey: ['paymentInfo'], queryFn: fetchPayments, enabled: !!accessToken },
        ]
    })

    const memoizedPaymentData = useMemo(() => paymentData?.data, [paymentData?.data])
    const memoizedPaymentDataTableColumn = useMemo(() => paymentTableColumns, [paymentTableColumns])

    console.log("payments", clientCards?.data)
    



    return(
        <section>
            <h2 className="font-bold text-[1.4rem] mb-3">Payment</h2>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 ">
                    <div className="xs:px-6 py-6 px-3 bg-greyBg w-full lg:w-1/2 rounded-md">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-[1.4rem]">Primary Card Details</h4>

                            <button onClick={() => setIsEditing(true)} className="py-1 rounded-md text-[.7rem] xs:text-[1rem] px-5 xs:px-7 bg-primary text-white">Edit Card</button>
                        </div>

                        <div className="mx-">
                                <small>Credit / Debit Card Number  <span className="text-red-600">*</span></small>
                                <div className="bg-white flex justify-center xs:justify-between p-3 rounded-md mt-2">
                                    {
                                        isEditing ?
                                        <input  type="text" className="bg-transparent outline-none" defaultValue={clientCards && clientCards?.data && clipSentence(clientCards?.data[0]?.cardNumber ?? "", 4, true )}  />
                                        :
                                        <p>{clientCards && clientCards?.data && clipSentence(clientCards?.data[0]?.cardNumber ?? "", 4, true )}</p>

                                    }
                                    <img src={mastercardLogo} alt="mastercardLogo" />
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">
                                    <div className="flex flex-col w-full md:w-1/2">
                                        <small className="mb-2">Expiration Date  <span className="text-red-600">*</span></small>

                                        {
                                            isEditing ? 
                                            <input  type="text" className=" outline-none  p-3 rounded-md" defaultValue={clientCards?.data && clientCards?.data[0]?.expiryDate} />
                                            :
                                            // <p>{clientCards && clientCards[0]?.expiryDate}</p>
                                            
                                            <input type="text" className=" outline-none  p-3 rounded-md" value={clientCards?.data && clientCards?.data[0]?.expiryDate} />
                                        }
                                       
                                    </div>

                                    <div className="flex flex-col w-full md:w-1/2">
                                        <small className="flex mb-2">CVV<span className="text-red-600">*</span><img src={exclaim} alt="" /></small>
                                        {
                                            isEditing ? 
                                            <input  type="text" className=" outline-none  p-3 rounded-md" defaultValue={clientCards?.data && clientCards?.data[0]?.cvv} />
                                            :
                                            // <p>{clientCards && clientCards[0]?.cvv}</p>
                                            <input type="text" className=" outline-none  p-3 rounded-md" value={clientCards?.data && clientCards?.data[0]?.cvv} />
                                            
                                        }
                                        
                                    </div>
                                </div>

                        </div>
                   </div>

                   <form onSubmit={handleSubmit(onSubmit)} className="xs:px-6 py-6 px-3 bg-greyBg w-full lg:w-1/2 rounded-md">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-[1.4rem]">Primary Card Details</h4>
                            {/* <button className="py-1 rounded-md text-[.7rem] xs:text-[1rem] px-5 xs:px-7 bg-primary text-white">Add Card</button> */}
                            <button disabled={isSubmitting} type="submit" className="py-1 rounded-md text-[.7rem] xs:text-[1rem] px-5 xs:px-7 bg-primary text-white"> { isSubmitting ? "Loading..." : "Add Card"}</button>

                        </div>

                        <div className="mx-">
                                <small>Credit / Debit Card Number  <span className="text-red-600">*</span></small>
                                <div className="bg-white flex justify-center xs:justify-between p-3 rounded-md mt-2">
                                    {/* <input type="text" className="bg-transparent outline-none" placeholder="---- ---- ---- ----" /> */}

                                    <input {...register('cardNumber')}  type="text"  placeholder="---- ---- ---- ----" className="bg-transparent outline-none"  /> 
                                    
                                    <img src={mastercardLogo} alt="mastercardLogo" />
                                </div>
                                {errors.cardNumber && (
                                    <p className="text-red-600">{errors.cardNumber.message}</p>)}

                                

                                <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">
                                    <div className="flex flex-col w-full md:w-1/2">
                                        <small className="mb-2">Expiration Date  <span className="text-red-600">*</span></small>
                                        {/* <input type="text" className=" outline-none  p-3 rounded-md" placeholder="mm/yy" /> */}
                                        <input {...register('expiryDate')}  type="text"  placeholder="mm/yy" className=" outline-none  p-3 rounded-md"  /> 
        
                                       
                                    </div>
                                    

                                    <div className="flex flex-col w-full md:w-1/2">
                                        <small className="flex mb-2">CVV<span className="text-red-600">*</span><img src={exclaim} alt="" /></small>
                                        <input {...register('cvv')} type="text" className=" outline-none  p-3 rounded-md" placeholder="---" />

                                        {/* <input {...register('cvv')}  type="text" required  placeholder="Enter cvv" className="inputCls focus:outline-primary"  />  */}
                                        {/* {errors.cvv && (
                                        <p className="text-red-600">{errors.cvv.message}</p>)} */}
                                        
                                    </div>
                                </div>
                                <div className="flex">
                                {errors.expiryDate && (
                                <p className="text-red-600">{errors.expiryDate.message}</p>)}

                                {errors.cvv && (
                                <p className="text-red-600">{errors.cvv.message}</p>)}
                                </div>

{/* <button disabled={isSubmitting} type="submit" className="py-1 rounded-md text-[.7rem] xs:text-[1rem] px-5 xs:px-7 bg-primary text-white"> { isSubmitting ? "Loading..." : "Add Card"}</button> */}


                        </div>
                    </form>
            </div>

            <div className="bg-greyBg text-black text-center py-6 mt-5 w-full">
                <h4 className="font-bold text-[1.4rem]">Payment History</h4>
                <p className="px-4">Should you have initiated a payment with us, it will be documented and visible below.</p>

                <UserTable data={memoizedPaymentData ?? []} columns={memoizedPaymentDataTableColumn}  />
                {/* <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-9 lg:mx-10 text-[.7rem] lg:text-[.9rem] mt-8 ">
                    <p>Date</p>
                    <p>Amount</p>
                    <p>Status</p>
                </div>

                {   
                    paymentData?.data?.map((item, index) => (

                    <div className="bg-white mx-4 rounded-lg" key={index} >
                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full   lg:px-6 text-[.7rem] lg:text-[.9rem]  mb-2 py-3 px-4">
                            <p>{item.date}</p>
                            <p>{item.amount}</p>
                            <p style={{color: item.statusColor}}>{item.status}</p>
                        </div>

                    </div>
                    ))
                    
                    
                }

                <div className="flex justify-end mx-4">
                    <p>Latest actions (Showing 01 to 09 of 259)</p>
                </div>

                <PaginationBtn /> */}
            </div>
        </section>
    );
};

export default Payment;