import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../libs';
import { AdminAuth } from '../../../hooks/useAdminAuthContext';
import { useQuery } from '@tanstack/react-query';
import { ClientDetailsType } from '../../../types/clientDetailsObj';

interface AssignManagerModalContentProps {
    clientId: number;
}

const AssignManagerModalContent = ({clientId}: AssignManagerModalContentProps) => {
    const [search, setSearch] = useState<string>("")

    const { adminAuthData  } = AdminAuth();
    const accessToken = adminAuthData?.token;

    const fetchAllManagers = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/admin/getAllManagers`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const managersData = response.data;
    
          // setAllManagers(managersData);
      
          return managersData;
        } catch (error) {
          console.error('Error fetching all managers:', error);
        }
    };

    const assignManager = async (managerId: number) => {
        const toastId = toast.loading("Assigning Manager! Please Wait...");
    
        try {        
            const response = await axios.post(`${BASE_URL}/user/assignManager?clientId=${clientId}&managerId=${managerId}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            // console.log("response", response.data);
            
            if (response.status === 200) {
                toast.success("Manager Assigned successfully", { id: toastId });
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

    const { isLoading, data } = useQuery({
        queryKey: ['allManager'],
        queryFn: fetchAllManagers,
        enabled: !!accessToken
    })

    // console.log("all MAN")

    const allManagerData: ClientDetailsType[] = data
    


    // const [allManagers, assignManagerData ] = useQueries({
    //     queries: [
    //       { queryKey: ['allManagerInfo'], queryFn: fetchAllManagers, enabled: !!accessToken },
    //       { queryKey: ['disputeAccountInfo'], queryFn: assignManager, enabled: !!accessToken },
    //     ]
    // })

    if(isLoading) {
        return <p>Loading...</p>
    }
    

  return (
        <div className='p-10'>
            <h2 className='md:text-[2rem] text-[1.3rem] mb-6 font-bold text-primary'>All Managers</h2>

            <input 
                type="search" 
                className='py-3 px-4 bg-greyBg mb-6 focus:outline-primary rounded-xl'
                placeholder='Search by first name' 
                onChange={(e) => setSearch(e.target.value)} 
            />

            {
                allManagerData && allManagerData?.length > 0 ? 
                    (
                        allManagerData
                        .filter((manager) => {
                            return search.toLowerCase() === '' ? manager : manager?.firstName?.toLowerCase().includes(search);
                        })
                        .map((manager) => (
                            <div key={manager?.id} className="flex items-center justify-start gap-6 mb-4">
                                <p>{manager?.firstName} {manager?.lastName}</p>
                                <button className='btnSm' onClick={() => assignManager(manager?.id)}>Assign</button>
                            </div>
                        ))
                    ) : 
                    <p>No Manager Available</p>
            }
        </div>
    )
}
export default AssignManagerModalContent
