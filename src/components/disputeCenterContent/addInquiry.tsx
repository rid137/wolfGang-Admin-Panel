import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../libs";
import { NewCustomTableSkeleton } from "../common/newCustomTable";

interface CheckboxData {
    name: string;
    checked: boolean;
}

interface AddInquiryProps {
    id: string;
    accessToken: string
}

// const bureauData: CheckboxData[] {

// }

const initialCheckboxes: CheckboxData[] = [
    { name: 'Experian', checked: false },
    { name: 'Equifax', checked: false },
    { name: 'Transunion', checked: false },
];

const AddInquiry: React.FC<AddInquiryProps> = ({id, accessToken}): any => {
    const navigate = useNavigate();
    const [inquiryName, setInquiryName] = useState("")
    const [dateString, setDateString] = useState("")

    const [previousInquiries, setPreviousInquiries] = useState<any>()

    const [checkboxes, setCheckboxes] = useState<CheckboxData[]>(initialCheckboxes);

    const goToClientDetails = (id: string) => {
        navigate(`/dashboard/client_details/${id}`)
    }


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

    const fetchPreviousInquiries = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/inquiry/getPreviousInquiry/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
              },
            }
          );
          const previousInquiriesData = response.data;

          setPreviousInquiries(previousInquiriesData);
      
          return previousInquiriesData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
    };

    useEffect(() => {
        const fetchPreviousInquiriesInfo = async () => {
          await fetchPreviousInquiries();
        //   console.log("previousInquiriesInfo", previousInquiriesInfo);
        };
        
        accessToken && fetchPreviousInquiriesInfo();
    }, [accessToken]);


    

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const selectedCheckbox = checkboxes.find(checkbox => checkbox.checked);

    
        if (!selectedCheckbox?.name) {
        //   console.log('Selected checkbox:', selectedCheckbox?.name);
          toast.error("Select a Bureau")
          return

        }

        const requestData = {
            name: inquiryName,
            date: dateString,
            bureau: selectedCheckbox?.name.toUpperCase(),
            // date: formattedDate, // If you want to include the formatted date
        };
    

        // console.log("FormData contents:", requestData);
       
        const toastId = toast.loading("Adding Inquiry");

        try {        
            const response = await axios.post(`${BASE_URL}/inquiry/save/${id}`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            console.log("response", response);
            
            if (response.status === 200) {
                toast.success("Inquiry added successfully", { id: toastId });
               await fetchPreviousInquiries()
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
        
        setDateString("")
        setInquiryName("")
    };
      


  return (
    <>
        <div className="text-center mt-7">
            <h4 className="font-bold text-[1.4rem] ">Add Inquiry</h4>
            <p>Make sure the round field is NOT blank </p>

            <form>

            <div className="flex justify-center items-center flex-col md:flex-row mt-4 gap-2 md:gap-6">
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
                        <label htmlFor={checkbox.name} className="ml-2 font-bold">
                            {checkbox.name}
                        </label>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1  md:grid-cols-2 gap-5 w-ful my-6">
                <div className="flex flex-col w-1/">
                    <label className="font-bold flex justify-start">Name</label>
                    {/* <CustomInput placeholder="Enter details" /> */}
                    <input  type="text" className="inputCls" placeholder="Enter details" onChange={(e) => setInquiryName(e.target.value)}  />
                        
                </div>
                
                <div className="flex flex-col w-1/">
                    <label className="font-bold flex justify-start">Date Of Inquiry</label>
                    <input type="date" className="bg-white py-3 px-4 shadow-md rounded-xl mt-2" onChange={(e) => setDateString(e.target.value)} />
                </div>

            
            </div>
                <div className="flex__center">
                    {/* <button className="btnLg">Submit</button> */}
                    <button type="submit" className="btnLg" onClick={handleSubmit}>Submit</button>

                </div>
            </form>


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
        </div>

            {/* <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 mt-4">
                Submit
            </button> */}

        

        

        <div className="flex__between my-10">
            <p className="font-bold text-[1.4rem]">Previous Inquiries</p>

            <button className="btnXs">Reuse All</button>
        </div>

        <div className="bg-greyBg w-ful text-black py-6 m-w-[90%] w-full overflow-x-scrol  rounded-md"> 
            <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem]">
                <p className="mr-">Name</p>
                <p className="ml-">Date Of Inquiry</p>
                <p className="">Bureau</p>
                <p className="ml-">Copy</p>
            </div>

            {
                    previousInquiries ? (
                        previousInquiries.length > 0 ? (
                            previousInquiries.slice(-10).map((item: any, index: number) => (
                                <div key={index} className="bg-white mx-2 sm:mx-4 rounded-lg" >
                                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-2 text-[.7rem] lg:text-[.9rem]">
                                        <p>{item?.name}</p>
                                        <p>{item?.date}</p>
                                        <p>{item.bureau}</p>
                                        <button className='bg-primary text-white p-1 sm:py-2 sm:px-3 rounded-xl text-[.7rem] lg:text-[.9rem]' onClick={() => goToClientDetails(item?.id)}>Reuse</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="ml-5 mt-4">No Inquiries Available </p>
                        )
                    ) : (
                        <NewCustomTableSkeleton />
                    )
                }


            {/* {
                previousInquiries?.length > 0 ?
                <>
                    {
                        previousInquiries?.slice(-10).map((item: any, index: number) => (
                            
                        <div key={index} className="bg-white mx-2 sm:mx-4 rounded-lg" >
                            <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-2 text-[.7rem] lg:text-[.9rem]">
                                <p>{item?.name}</p>
                                <p>{item?.date}</p>
                                <p>{item.bureau}</p>
                                <button className='bg-primary text-white p-1 sm:py-2 sm:px-3 rounded-xl text-[.7rem] lg:text-[.9rem]' onClick={() => goToClientDetails(item?.id)}>Reuse</button>
                            </div>
                        </div>
                        ))
                    }
                </>
                :
                <>
                    <NewCustomTableSkeleton />
                </>
            } */}

            {/* {Array(3)
                    .fill(3)
                    .map((_,) => (
                        <div key={index} className="bg-white mx-2 sm:mx-4 rounded-lg" >
                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-2 text-[.7rem] lg:text-[.9rem]">
                        <p>{item?.name}</p>
                        <p>{item?.date}</p>
                        <p>{item.bureau}</p>
                        <button className='bg-primary text-white p-1 sm:py-2 sm:px-3 rounded-xl text-[.7rem] lg:text-[.9rem]' onClick={goToClientDetails}>Reuse</button>
                    </div>
                </div>
                ))
            } */}
        </div>
    </>
  )
}

export default AddInquiry
