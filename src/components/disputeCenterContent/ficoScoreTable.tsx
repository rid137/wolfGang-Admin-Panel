import PaginationBtn from '../common/paginationBtn';
import trash from "../../assets/trash.svg";
import axios from 'axios';
import { BASE_URL } from '../../libs';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { NewCustomTableSkeleton } from '../common/newCustomTable';
import toast from 'react-hot-toast';

interface AddInquiryProps {
    id: string;
    accessToken: string
}


const FicoScoreTable: React.FC<AddInquiryProps> = ({id, accessToken}): any => {
    const [allScores, setAllScores] = useState<any>()

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

          return allScoresData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
    };

    useEffect(() => {
        const fetchAllScoresInfo = async () => {
          const allScoresInfo = await fetchAllScores();
          console.log("allScoresInfo", allScoresInfo);
        };
        
        accessToken && fetchAllScoresInfo();
    }, [accessToken]);


    const handleDelete = async (id: string | number) => {
        if(window.confirm('Are you sure you want to delete the blog'))  {
            toast.loading("Deleting FICO score")

            try {
                const response = await axios.delete(
                  `${BASE_URL}/scores/delete/${id}?id=${id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      // 'Content-Type': 'application/json',
                    },
                  }
                );

                if (response.status === 200) {
                    toast.success('FICO score deleted successfully')
                    await fetchAllScores()
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
         <h4 className="font-bold text-[1.4rem] mt-10">FICO Scores</h4>
        <p>List of FICO scores </p>


        <div className="bg-greyBg text-black text-center py-1 mt-5 rounded-md"> 
                
                <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3 ml-1 md:ml-5 mr-5 lg:mr-10  lg:mx-16 text-[.5rem] lg:text-[.9rem] mt-4">
                    <p className='text-[.4rem] lg:text-[.9rem]'>Experian FICO Score</p>
                    <p className='text-[.4rem] lg:text-[.9rem] -ml-4'>Equifax FICO Score</p>
                    <p className='text-[.4rem] lg:text-[.9rem] -ml-4'>Transunion FICO Score </p>
                    <p>Date</p>
                    <p>Delete</p>
                </div>


                {
                    allScores?.length > 0 ? 
                    <>
                        {
                            allScores?.map((item: any) => (
                                <div key={item.id} className="bg-white mx-1 md:mx-4 rounded-lg" >
                                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:pl-28 px-3 pl- text-[.5rem] lg:text-[.9rem] ">
                                        <p>{item?.experianScore}</p>
                                        <p className="md:pl-12">{item?.equifaxScore}</p>
                                        <p className="md:pl-28">{item?.transunionScore}</p>
                                        <p className="md:pl-8"> {DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATE_MED)}</p>
                                        <p className="md:pr-7" onClick={() => handleDelete(item?.id)}><img className="cursor-pointer w-3 h-3"  src={trash} alt="delete" /></p>
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
                {/* {Array(10)
                        .fill(10)
                        .map((_,) => (
                        <div className="bg-white mx-1 md:mx-4 rounded-lg" >
                            <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:pl-28 px-3 pl- text-[.5rem] lg:text-[.9rem] ">
                                <p>534</p>
                                <p className="md:pl-12">564</p>
                                <p className="md:pl-28">532</p>
                                <p className="md:pl-8">12/14/2021</p>
                                <p className="md:pr-7"><img className="cursor-pointer w-3 h-3"  src={trash} alt="delete" /></p>
                            </div>

                        </div>
                    ))
                } */}

                {/* <div className="flex justify-end mx-4">
                    <p>Latest actions (Showing 01 to 09 of 259)</p>
                </div> */}

                <div className="flex justify-end mx-4">
                    <p>Latest actions (Showing 01 to {allScores?.length} of {allScores?.length})</p>
                </div>

                <PaginationBtn />
            </div>

      
    </>
  )
}

export default FicoScoreTable;
