import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import toast from "react-hot-toast";
import { BASE_URL } from "../../libs";
import axios from "axios";
import { useEffect, useState } from "react";
import { NewCustomTableSkeleton } from "../common/newCustomTable";


const addDisputeAccountSchema = z.object({
    accountName: z.string({
        required_error: "accountName is required",
        invalid_type_error: "accountName must be a number",
      }),
    accountNumber: z.string({
    required_error: "accountNumber is required",
    invalid_type_error: "accountNumber must be a number",
    }),    
    accountBalance: z.string({
        required_error: "accountBalance is required",
        invalid_type_error: "accountBalance must be a number",
      }),
    
});
  
type FormFields = z.infer<typeof addDisputeAccountSchema>;

interface AddDisputeProps {
    id: string;
    accessToken: string
}

interface CheckboxData {
    name: string;
    checked: boolean;
    bgColor: string;
}


const initialCheckboxes: CheckboxData[] = [
    { name: 'Transunion', checked: false, bgColor: "#00a8cb" },
    { name: 'Experian', checked: false, bgColor: "#001689" },
    { name: 'Equifax', checked: false, bgColor: "#b32541" },
];

  
const AddDisputeAccount: React.FC<AddDisputeProps> = ({id, accessToken}): any => {
    const [allDisputeAccounts, setAllDisputeAccounts] = useState<any>()
    const [checkboxes, setCheckboxes] = useState<CheckboxData[]>(initialCheckboxes);

    // const navigate = useNavigate();

    // const handleCheckboxChange = (name: string) => {
    //     setCheckboxes(prevCheckboxes =>
    //         prevCheckboxes.map(checkbox =>
    //         checkbox.name === name ? { ...checkbox, checked: true } : { ...checkbox, checked: false }
    //         )
    //     );
    // };

    const handleCheckboxChange = (name: string) => {
        setCheckboxes(prevCheckboxes =>
          prevCheckboxes.map(checkbox =>
            checkbox.name === name ? { ...checkbox, checked: !checkbox.checked } : checkbox
          )
        );
    };

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
    resolver: zodResolver(addDisputeAccountSchema),
    });

    // const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //     // console.log(data);

    //     const selectedCheckbox = checkboxes.find(checkbox => checkbox.checked);

    //     if (!selectedCheckbox?.name) {
    //     //   console.log('Selected checkbox:', selectedCheckbox?.name);
    //       toast.error("Select a Bureau")
    //       return
    //     }
    

    //     const currentDateTime = DateTime.now();
    //     const formattedDate = currentDateTime.toFormat('yyyy-MM-dd');
    //     // console.log(formattedDate);

    //     const isDispute = true

    //     const formData = new FormData();  
    //     formData.append('accountName', data.accountName as string);
    //     formData.append('accountNumber', data.accountNumber as string);
    //     formData.append('balance', data.accountBalance as string);
    //     formData.append('bureau', selectedCheckbox?.name.toUpperCase());
    //     formData.append('date', formattedDate);
    //     formData.append('isDispute', isDispute.toString());
    //     formData.append('accType', "Type One");

    //     const toastId = toast.loading("Adding Account");

    //     try {        
    //         const response = await axios.post(`${BASE_URL}/account/saveAccount/${id}`, formData, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });
        
    //         // console.log("response", response.data);
            
    //         if (response.status === 200) {
    //             toast.success("Account added successfully", { id: toastId });
    //             await fetchDisputeAccount();
    //         } else {
    //             toast.remove();
    //             toast.error(response.data.message);
    //         }
    //     } catch (error: any) {
    //         toast.remove();
    //         if (error.message === 'Failed to fetch') {
    //             toast.error('Network Error. Try again');
    //         } else {
    //             toast.error('Error encountered. Try again');
    //         }
    //         console.log(error.message);
    //     }
        
    //     reset()
    // };

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const selectedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
    
        if (selectedCheckboxes.length === 0) {
          toast.error('Select at least one Bureau');
          return;
        }
    
        const currentDateTime = DateTime.now();
        const formattedDate = currentDateTime.toFormat('yyyy-MM-dd');
    
        const isDispute = true;
    
        for (const selectedCheckbox of selectedCheckboxes) {
          const formData = new FormData();
          formData.append('accountName', data.accountName as string);
          formData.append('accountNumber', data.accountNumber as string);
          formData.append('balance', data.accountBalance as string);
          formData.append('bureau', selectedCheckbox.name.toUpperCase());
          formData.append('date', formattedDate);
          formData.append('isDispute', isDispute.toString());
          formData.append('accType', 'Type One');
    
          const toastId = toast.loading(`Adding Account for ${selectedCheckbox.name}`);
    
          try {
            const response = await axios.post(`${BASE_URL}/account/saveAccount/${id}`, formData, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            });
    
            if (response.status === 200) {
              toast.success(`Account added for ${selectedCheckbox.name} successfully`, { id: toastId });
              console.log("allAccountCreationResponse", response)
              await fetchDisputeAccount();
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
        }
    
        reset();
      };

    //   const handleCreateAll = () => {
    //     const allCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
    //     if (allCheckboxes.length > 0) {
    //       // Clear any existing selected checkboxes
    //       setCheckboxes(initialCheckboxes);
    //       onSubmit({ accountName: '', accountNumber: '', accountBalance: '' });
    //     } else {
    //       toast.error('Select at least one Bureau to create all accounts');
    //     }
    //   };

    const handleCreateAll = async () => {
        // Clear any existing selected checkboxes
        // setCheckboxes(initialCheckboxes);
        // setCheckboxes({...checkboxes, checked: true});
        // checkbox.name === name ? { ...checkbox, checked: !checkbox.checked } : checkbox
        // const selectedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
        // const selectedCheckboxes = checkboxes.map((checkbox) => {
        //     return(
        //         checkbox.checked = true
                
        //     )
        // });


      
        // for (const checkbox of initialCheckboxes) {
        //   await onSubmit(
        //     {
        //       accountName: data.accountName,
        //       accountNumber: '',
        //       accountBalance: '',
        //     },
        //     checkbox.name as any,
        //     // isAll as any
        //   );
        // }
      
        toast.success('All accounts created successfully');
      };
      
    const addDisputeAcc = async (item: any) => {
        console.log(item);

        // const selectedCheckbox = checkboxes.find(checkbox => checkbox.checked);

        // if (!selectedCheckbox?.name) {
        // //   console.log('Selected checkbox:', selectedCheckbox?.name);
        //   toast.error("Select a Bureau")
        //   return
        // }
    

        const currentDateTime = DateTime.now();
        const formattedDate = currentDateTime.toFormat('yyyy-MM-dd');
        // console.log(formattedDate);

        const isDispute = true

        const formData = new FormData();  
        formData.append('accountName', item?.accountName);
        formData.append('accountNumber', item?.accountNumber);
        formData.append('balance', item?.accountBalance);
        formData.append('bureau', item?.bureau);
        formData.append('date', formattedDate);
        formData.append('isDispute', isDispute.toString());
        formData.append('accType', "Type One");

        const toastId = toast.loading("Adding Account");

        try {        
            const response = await axios.post(`${BASE_URL}/account/saveAccount/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            // console.log("response", response);
            
            if (response.status === 200) {
                toast.success("Account added successfully", { id: toastId });
                await fetchDisputeAccount();
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


    const fetchDisputeAccount = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/account/findPreviousAccounts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const alldisputeAccountsData = response.data;
        //   console.log("response", response)

          setAllDisputeAccounts(alldisputeAccountsData);
      
          return alldisputeAccountsData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
    };

    useEffect(() => {
        const fetchDisputeAccountInfo = async () => {
          await fetchDisputeAccount();
        //   console.log("allDis", allDis)
        };
        
        accessToken && fetchDisputeAccountInfo();
    }, [accessToken]);


    // const goToClientDetails = (id: string) => {
    //     navigate(`/dashboard/client_details/${id}`)
    // }

  return (
    <>
    <div className="text-center mt-7">
            <h4 className="font-bold text-[1.4rem] ">Add Disputed Account</h4>
            <p>Make sure the round field is NOT blank </p>

            {/* <div className=" flex justify-center items-center flex-col md:flex-row mt-4 gap-2 md:gap-6">
                <div className="flex__center gap-2">
                    <img src={checkboxmark} alt="" />
                    <p className="font-bold">Experian</p>
                </div>
                <div className="flex__center gap-2">
                    <img src={checkbox} alt="" />
                    <p className="font-bold">Equifax</p>
                </div>
                <div className="flex__center gap-2">
                    <img src={checkboxmark} alt="" />
                    <p className="font-bold">Transunion</p>
                </div>
            </div>        */}
            <div className=" flex justify-center items-center flex-col md:flex-row mt-4 gap-2 md:gap-6">
                <button onClick={handleCreateAll} className="py-1 px-4 border border-greyBg bg-[#333] text-white rounded-md ">All</button>
                

                {checkboxes?.map(checkbox => (
                    <div key={checkbox.name} className="mb-2">
                        <input
                            type="checkbox"
                            id={checkbox.name}
                            name={checkbox.name}
                            checked={checkbox.checked}
                            className="size-4"
                            onChange={() => handleCheckboxChange(checkbox.name)}
                        />
                        <label htmlFor={checkbox.name} className={`ml-2 font-bold text-white p-1 rounded-md bg-${checkbox.bgColor}`} style={{backgroundColor: `${checkbox.bgColor}`}}>
                            {checkbox.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-5 w-ful my-6">
                <div className="flex flex-col w-1/">
                    <label className="font-bold">Account Name</label>
                    {/* <CustomInput placeholder="Enter details" /> */}
                    <input {...register('accountName')} type="text" className="inputCls focus:outline-primary" placeholder="Enter Account Name"  />
                    {errors.accountName && (
                        <p className="text-red-600">{errors.accountName.message}</p>
                    )}
                </div>
                
                <div className="flex flex-col w-1/">
                    <label className="font-bold">Account Number</label>
                    {/* <CustomInput placeholder="Enter details" /> */}
                    <input {...register('accountNumber')} type="text" className="inputCls focus:outline-primary" placeholder="Enter Account Number"  />
                    {errors.accountNumber && (
                        <p className="text-red-600">{errors.accountNumber.message}</p>
                    )}
                </div>

                <div className="flex flex-col w-1/">
                    <label className="font-bold">Account Balance</label>
                    {/* <CustomInput placeholder="Enter details" /> */}
                    <input {...register('accountBalance')} type="text" className="inputCls focus:outline-primary" placeholder="Enter Account Balance"  />
                    {errors.accountBalance && (
                        <p className="text-red-600">{errors.accountBalance.message}</p>
                    )}
                </div>
                <div className=""></div>
                <div className="flex flex-col ">
                    <label className="font-bold">Type of Account</label>
                    <select name="" id="" className="bg-white py-3 px-4 shadow-md rounded-xl mt-2 focus:outline-primary">
                        <option value="">Select one</option>
                        <option value="">Method 1</option>
                        <option value="">Method 1</option>
                        <option value="">Method 1</option>
                    </select>
                </div>
                <div className=""></div>
            </div>

            <div className="flex__center">
                {/* <button className="btnLg">Submit</button> */}
                <button disabled={isSubmitting} type="submit" className="btnLg">{ isSubmitting ? "Loading..." : "Submit"}</button>


            </div>

        </form>
        <div className="flex__between mt-10 mb-8">
            <p className="font-bold text-[1.4rem]">Previous Disputes</p>

            <button className="btnXs">Reuse All</button>
        </div>

        <div className="bg-greyBg w-ful text-black py-6 m-w-[90%] w-full overflow-x-scrol rounded-md"> 
                <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3 mr-8 sm:mr-6  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem]">
                    <p className="mr-">Account Name</p>
                    <p className="ml-">Account Number</p>
                    <p className="">Bureau</p>
                    <p className="ml-">Balance</p>
                    <p className="ml-">Action</p>
                </div>

                {
                    allDisputeAccounts ? (
                        allDisputeAccounts.length > 0 ? (
                            allDisputeAccounts.slice(-7).map((item: any) => (
                                <div key={item.id} className="bg-white mx-2 sm:mx-4 rounded-lg">
                                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-3 text-[.6rem] lg:text-[.9rem]">
                                        <p>{item?.accountName}</p>
                                        <p>{item?.accountNumber}</p>
                                        <p>{item?.bureau}</p>
                                        <p>${item?.balance}</p>
                                        <button className='bg-primary text-white py-1 px-1 xs:py-1 xs:px-1 rounded-xl text-[.6rem] lg:text-[.9rem]' onClick={() => addDisputeAcc(item)}>Reuse</button>
                                    </div>                
                                </div>
                            ))
                        ) : (
                            <p className="ml-5 mt-4">No Dispute Account Available </p>
                        )
                    ) : (
                        <NewCustomTableSkeleton />
                    )
                }


                {/* {Array(3)
                        .fill(3)
                        .map((_,) => (
                    <div className="bg-white mx-2 sm:mx-4 rounded-lg" >
                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-3 text-[.6rem] lg:text-[.9rem]">
                            <p>PENN CREDIT</p>
                            <p>3468632112</p>
                            <p>Transunion</p>
                            <p>$8,101</p>
                            <button className='bg-primary text-white py-1 px-1 xs:py-1 xs:px-1 rounded-xl text-[.6rem] lg:text-[.9rem]' onClick={goToClientDetails}>Reuse</button>
                        </div>
                    </div>
                    ))
                } */}
            </div>
    </>

  )
}

export default AddDisputeAccount;
