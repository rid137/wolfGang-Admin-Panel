import React, { useState } from "react";
import file from "../../assets/file.jpg";
import axios from "axios";
import { BASE_URL } from "../../libs";
import { AdminAuth } from "../../hooks/useAdminAuthContext";
import toast from "react-hot-toast";

interface AccType {
    accType: string | null
    accountName: string
    accountNumber:  string
    balance: string
    bureau: string
    date: string
    id: number
    inDispute: boolean
}

interface CustomTableWithLetterProps {
    label: string;
    text: string;
    AccSet?: AccType[];
    fileName?: string | undefined;
    fileInfo?: any;
    inpId?: string;
    accSetId?: number
    uploadId?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    burResponse?: any
}

const CustomTableWithLetter: React.FC<CustomTableWithLetterProps> = ({label, burResponse}) => {
    // console.log("AccSet", AccSet)
    // console.log("burResponse", burResponse)
    const [fileNames, setFileNames] = useState<string[]>([]);

    // console.log("fileInfo", fileInfo)

    const { adminAuthData  } = AdminAuth();
    const accessToken = adminAuthData?.token;


    // const uploadId = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files && e.target.files[0];
    //     // console.log("file", file)
    //     setFileName(file?.name)

    //     // if (file && file.size > 1_000_000) {
    //     //     alert("Images size cannot be more 1MB"),
    //     //     return
    //     // }
      
    //     if (file) {
    //     //   setPlaceholderImg(file);
      
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         const thumbnail = reader.result as string;
    //         setFileInfo(thumbnail);
    //       };
      
    //       reader.readAsDataURL(file);
    //     }
    //     handleFileUpload();
    
    // };

    // const handleFileUpload = async () => {
    //     const formData = new FormData()

    //     formData.append("ftc", fileInfo)

    //     const toastId = toast.loading("Uploading File");
    //     // console.log(fileInfo)
    //     console.log("FormData contents:");
    //     for (let pair of formData.entries()) {
    //         console.log(pair[0] + ": " + pair[1]);
    //     }

    //     try {        
    //         const response = await axios.post(`${BASE_URL}/pairing/uploadFTC/${accSetId}`, formData, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });
        
    //         console.log("response", response.data);
            
    //         if (response.status === 200) {
    //             toast.success("File Uploaded successfully", { id: toastId });
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
        
    // }


    const renderAccountsSection = (parentObject: any, index: number) => {
        // const label = "Your Label"; 
        // const text = "Your Text"; 
        const AccSet = parentObject.accounts;
        console.log("objId", parentObject?.id)
    
        const baseValue = index * 5 + 1;
    
        let rangeText;
        switch (AccSet?.length) {
            case 1:
                rangeText = `(${baseValue})`;
                break;
            case 2:
                rangeText = `(${baseValue}-${baseValue + 1})`;
                break;
            case 3:
                rangeText = `(${baseValue}-${baseValue + 2})`;
                break;
            case 4:
                rangeText = `(${baseValue}-${baseValue + 3})`;
                break;
            case 5:
                rangeText = `(${baseValue}-${baseValue + 4})`;
                break;
            default:
                rangeText = `(${AccSet?.length})`;
                break;
        }

        const handleFileUpload = async (file: File, parentId: string) => {
            const formData = new FormData();
            formData.append("ftc", file);
            // console.log("parentId", parentId)

            const toastId = toast.loading("Uploading File");
    
            try {
                const response = await axios.post(`${BASE_URL}/pairing/uploadFTC/${parentId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
    
                // console.log("response", response.data);
    
                if (response.status === 200) {
                    // Assuming response.data.fileName is the name of the uploaded file
                    setFileNames(prevFileNames => [...prevFileNames, response.data.fileName]);
                    toast.success("File Uploaded successfully", { id: toastId });
                } else {
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
    

        const uploadId = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const parentId = e.target.id;
                setNameOfFile(parentId, file.name);

                // const reader = new FileReader();
                // reader.onload = () => {
                //     const thumbnail = reader.result as string;
                //     setFileInfo(thumbnail);
                // };

                // reader.readAsDataURL(file);
                handleFileUpload(file, parentId);
            };
        };
    
        const setNameOfFile = (parentId: string, fileName: string) => {
            setFileNames(prevFileNames => {
                const updatedFileNames = [...prevFileNames];
                const index = burResponse?.findIndex((obj: any) => obj?.id == parentId);
                updatedFileNames[index] = fileName;
                return updatedFileNames;
            });
        };

        // const uploadId = (e: React.ChangeEvent<HTMLInputElement>) => {
        //     const file = e.target.files && e.target.files[0];
        //     // console.log("file", file)
        //     setFileName(file?.name)
    
        //     // if (file && file.size > 1_000_000) {
        //     //     alert("Images size cannot be more 1MB"),
        //     //     return
        //     // }
          
        //     if (file) {
        //     //   setPlaceholderImg(file);
          
        //       const reader = new FileReader();
        //       reader.onload = () => {
        //         const thumbnail = reader.result as string;
        //         setFileInfo(thumbnail);
        //       };
          
        //       reader.readAsDataURL(file);
        //     }
        //     handleFileUpload();
        
        // };
    
        // const handleFileUpload = async () => {
        //     const formData = new FormData()
    
        //     formData.append("ftc", fileInfo)
    
        //     const toastId = toast.loading("Uploading File");
        //     // console.log(fileInfo)
        //     console.log("FormData contents:");
        //     for (let pair of formData.entries()) {
        //         console.log(pair[0] + ": " + pair[1]);
        //     }
    
        //     try {        
        //         const response = await axios.post(`${BASE_URL}/pairing/uploadFTC/${parentObject?.id}`, formData, {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: `Bearer ${accessToken}`,
        //             },
        //         });
            
        //         console.log("response", response.data);
                
        //         if (response.status === 200) {
        //             toast.success("File Uploaded successfully", { id: toastId });
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
            
        // }

        const generateLetter = async () => {
            const toastId = toast.loading("Generating Letter");
        
            try {        
                const response = await axios.get(`${BASE_URL}/pairing/generateLetter?pairId=${parentObject?.id}`, {
                    headers: {
                        // 'Content-type': "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    responseType: 'blob',

                });
                // console.log("parentObjectId", parentObject.id)
            
                // console.log("response", response.data);
                
                if (response.status === 200) {
                    toast.success("Letter Generated successfully", { id: toastId });
                    const blobUrl = URL.createObjectURL(response.data)

                    const link = document.createElement('a')
                    link.href = blobUrl

                    link.download = 'combined_letter.pdf'

                    link.click();
                } else {
                    toast.remove();
                    toast.error(response.data.message);
                }
            } catch (error: any) {
                toast.remove();
                if (error.response && error.response.status === 500) {
                    toast.error('Server Error. Please try again later.');
                } else if (error.message === 'Failed to fetch') {
                    toast.error('Network Error. Try again');
                } else {
                    toast.error('Error encountered. Try again');
                }
                console.log(error.message);
            }
        };
                
    
        return (
            <div className="gap-4 flex flex-col md:flex-row items-center justify-center mt-6">

                {/* FIRST COLUMN */}
                <div className="w-full md:w-2/3" key={index}>
                    <div className="flex gap-4">
                        <div className="">
                            <h4 className="font-bold text-[1.4rem]">{label} Disputed Accounts {rangeText}</h4>
                            <p className="">Lists of accounts under {label.toLocaleLowerCase()}. In groups of five. </p>

                        </div>
                        <div className="">
                            <button className="btnSm" onClick={generateLetter}>Generate Letter</button>
                        </div>
                    </div>

        
                    <div className="bg-greyBg text-black text-center py-5 mt-5 rounded-md">
        
                        <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem] mt-">
                            <p>Account Name</p>
                            <p>Account Number</p>
                            <p>Balance</p>
        
                        </div>
        
                        {
                            AccSet && AccSet?.length > 0 ?
                                <>
                                    {
                                        AccSet && AccSet?.map((item: any) => (
                                            <div key={item?.id} className="bg-white mx-4 rounded-lg" >
                                                <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                                                    <p>{item?.accountName}</p>
                                                    <p className="">{item?.accountNumber}</p>
                                                    <p className="" >${item?.balance}</p>
                                                </div>
        
                                            </div>
        
                                        ))
                                    }
                                </>
                                :
                                <>
                                    <p className="text-left ml-5 mt-5">No Data Available</p>
                                </>
                        }
        
                    </div>
                </div>

                {/* SECOND COLUMN */}
                <div className="w-full md:w-1/3">
                    <h4 className="font-bold text-[1.4rem]">FTC Letters</h4>
                    <p className="">Upload document(s) the accounts.</p>

                    <div className="bg-greyBg w-full h-[21rem] flex__column mt-5">
                        {/* {fileName && <p>{fileName}</p> } */}
                        {fileNames[index] && <p>{fileNames[index]}</p>}

                        <label htmlFor={parentObject?.id.toString()}><img src={file} className="bg-greyBg text-greyBg cursor-pointer" alt="" /></label>
                        <input type="file" id={parentObject?.id.toString()} onChange={uploadId} className="hidden" />

                    </div>  
                </div>


            </div>
        );
    };
    

    // const renderArr = () => {
    //     const arr = burResponse && burResponse[0]?.accounts;
    
    //     switch (arr?.length) {
    //         case 1:
    //             console.log("(1)");
    //             break;
    //         case 2:
    //             console.log("(1-2)");
    //             break;
    //         case 3:
    //             console.log("(1-3)");
    //             break;
    //         case 4:
    //             console.log("(1-4)");
    //             break;
    //         case 5:
    //             console.log("(1-5)");
    //             break;
    
    //         default:
    //             console.log(`(${arr?.length})`);
    //             break;
    //     }
    
    //     for (let i = 0; i < burResponse?.length; i++) {
    //         const parentObject = burResponse[i];
    //         console.log("parentObj", parentObject);
    //         // Additional code for processing parentObject if needed
    //     }
    // }    
    // renderArr();
    

    // const reanderArr = () => {
    //     const arr = burResponse && burResponse[0]?.accounts
    //     for (let i = 0; i < arr?.length; i++) {
    //         // Access each object in the parent array
    //         const parentObject = arr[i];
    //         console.log("parentObj", i)
    
    //         // Assuming each parent object has a property 'nestedArray'
    //         // const nestedArray = parentObject.nestedArray;
    
    //         // // Loop through the nested array of objects
    //         // for (let j = 0; j < nestedArray.length; j++) {
    //         //     const nestedObject = nestedArray[j];
    
    //         //     // Display or process the nested object as needed
    //         //     console.log(nestedObject);
    //         // }
    //     }
    // }
    // reanderArr()


      
  return (
        <>
                {burResponse && burResponse?.map((parentObject: any, index:any ) => (
                    // <div className="gap-4 flex flex-col md:flex-row items-center justify-center mt-6">
                        // <div className="w-full md:w-2/3" key={index}>
                            renderAccountsSection(parentObject, index)
                        // </div>
                

                        // <div className="w-full md:w-1/3">
                        //     <h4 className="font-bold text-[1.4rem]">FTC Letters</h4>
                        //     <p className="">Upload document(s) the accounts.</p>

                        //     <div className="bg-greyBg w-full h-[21rem] flex__column mt-5">
                        //         {fileName && <p>{fileName}</p> }
                        //         <label htmlFor="upload_id"><img src={file} className="bg-greyBg text-greyBg cursor-pointer" alt="" /></label>
                        //         <input type="file" id="upload_id" onChange={uploadId} className="hidden" />

                        //     </div>  
                        // </div>
                    // </div>
                ))}
        </>
  )
}

export default CustomTableWithLetter;




// <div className=" gap-4 flex flex-col md:flex-row items-center justify-center mt-6">
//         <div className="w-full md:w-2/3">
//             <h4 className="font-bold text-[1.4rem]">{label}</h4>
//             <p className="">Lists of accounts under {text}. In groups of five. </p>

//             <div className="bg-greyBg text-black text-center py-5 mt-5 rounded-md"> 
        
//                 <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem] mt-">
//                     <p>Account Name</p>
//                     <p>Account Number</p>
//                     <p >Balance</p>
                    
//                 </div>
                
//                 {
//                     AccSet && AccSet?.length > 0 ? 
//                     <>
//                         {
//                             AccSet && AccSet?.map((item) => (
//                                 <div key={item?.id} className="bg-white mx-4 rounded-lg" >
//                                     <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
//                                         <p>{item?.accountName}</p>
//                                         <p className="">{item?.accountNumber}</p>
//                                         <p className="" >${item?.balance}</p>
//                                     </div>

//                                 </div>

//                             ))
//                         }
//                     </>
//                     :
//                     <>
//                         <p className="text-left ml-5 mt-5">No Data Available</p>
//                     </>
//                 }
                
//             </div>
//         </div>


//         <div className="w-full md:w-1/3">
//             <h4 className="font-bold text-[1.4rem]">FTC Letters</h4>
//             <p className="">Upload document(s) the accounts.</p>

//             <div className="bg-greyBg w-full h-[21rem] flex__column mt-5">
//                 {fileName && <p>{fileName}</p> }
//                 <label htmlFor={id}><img src={file} className="bg-greyBg text-greyBg cursor-pointer" alt="" /></label>
//                 <input type="file" id={id} onChange={uploadId} className="hidden" />

//             </div>
//         </div>
        
//     </div>
