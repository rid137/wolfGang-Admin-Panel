import PaginationBtn from '../common/paginationBtn';
import trash from "../../assets/trash.svg";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../libs';
import { NewCustomTableSkeleton } from '../common/newCustomTable';
import toast from 'react-hot-toast';


interface AddInquiryProps {
  id: string;
  accessToken: string
}


const InquiryListTable: React.FC<AddInquiryProps> = ({id, accessToken}): any => {
  const [allInquiries, setAllInquiries] = useState<any>()


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

      setAllInquiries(allInquiriesData);
  
      return allInquiriesData;
    } catch (error) {
      console.error('Error fetching all clients:', error);
    }
  };

  useEffect(() => {
      const fetchallInquiriesInfo = async () => {
        const allInquiriesInfo = await fetchAllInquiries();
        console.log("allInquiriesInfo", allInquiriesInfo);
      };
      
      accessToken && fetchallInquiriesInfo();
  }, [accessToken]);


  const handleDelete = async (id: string | number) => {
    if(window.confirm('Are you sure you want to delete the blog'))  {
        toast.loading("Deleting FICO score")

        try {
            const response = await axios.delete(
              `${BASE_URL}/inquiry/delete/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            if (response.status === 200) {
                toast.success('FICO score deleted successfully')
                await fetchAllInquiries();
            }

        } catch (error) {
            toast.error('FICO score deleted successfully')
            console.error('Error fetching all clients:', error);
        }

        toast.remove()
    }        
  }


  return (
    <>
      <h4 className="font-bold text-[1.4rem] mt-10">Inquiries</h4>
      <p>Lists of inquiries</p>


      <div className="bg-greyBg w-ful text-black py-6 m-w-[90%] w-full overflow-x-scrol  rounded-md"> 
            <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem]">
                <p className="mr-">Name</p>
                <p className="ml-">Date Of Inquiry</p>
                <p className="">Bureau</p>
                <p className=''>Delete</p>
            </div>

            {
              allInquiries?.length > 0 ?
              <>
                {
                allInquiries?.slice(-10).map((item: any, index: number) => (
                    
                    <div key={index} className="bg-white mx-2 sm:mx-4 rounded-lg" >
                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-2 text-[.7rem] lg:text-[.9rem]">
                            <p>{item?.name}</p>
                            <p>{item?.date}</p>
                            <p>{item.bureau}</p>
                            {/* <button className='bg-primary text-white p-1 sm:py-2 sm:px-3 rounded-xl text-[.7rem] lg:text-[.9rem]' onClick={() => goToClientDetails(item?.id)}>Reuse</button> */}
                            <img src={trash} className='cursor-pointer w-3 h-3' alt="delete" onClick={() => handleDelete(item?.id)} />
                        </div>
                    </div>
                    ))
                }
              </>
              :
              <>
                <NewCustomTableSkeleton />
              </>
            }
      </div>
      <div className="flex justify-end mx-4">
        <p>Latest actions (Showing 01 to 09 of {allInquiries?.length})</p>
      </div>

      <PaginationBtn />


      {/* <div className="bg-greyBg text-black text-center py-6 mt-5 rounded-md overflow-x-auto">
        <div className="flex justify-between items-center gap-[.4rem] md:gap-0 font-bold mb-3 ml-7 md:mx-5 lg:ml-20 lg:mr-10 text-[.5rem] lg:text-[.9rem] mt-">
          <p>Date</p>
          <p>Name</p>
          <p>Date Of Inquiry</p>
          <p>Bureau</p>
          <p>Print?</p>
          <p className='pr-2 md:pr-0'>Delete</p>
        </div>

        {Array(10)
          .fill(10)
          .map((_, index) => (
            <div key={index} className="bg-white mx-1 md:mx-4 rounded-lg">
              <div className="flex justify-between items-center gap-2 md:gap-0 w-full mb-2 py-3 lg:pl-6 lg:pr-14 px-2 md:px-3 text-[.5rem] lg:text-[.9rem] ">
                <p>12/14/2021</p>
                <p className="-12">Cameron Williamson</p>
                <p className="-28">12/14/2021</p>
                <p className="-8">Experian</p>
                <p className="-8">Yes</p>
                <p className="-7">
                  <img src={trash} className='cursor-pointer w-3 h-3' alt="delete" />
                </p>
              </div>
            </div>
          ))}
        <div className="flex justify-end mx-4">
          <p>Latest actions (Showing 01 to 09 of 259)</p>
        </div>

        <PaginationBtn />
      </div> */}
    </>
  );
};

export default InquiryListTable;
