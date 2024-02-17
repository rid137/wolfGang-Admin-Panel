// import PaginationBtn from '../common/paginationBtn';
// import trash from "../../assets/trash.svg";
// import axios from 'axios';
// import { BASE_URL } from '../../libs';
// import { NewCustomTableSkeleton } from '../common/newCustomTable';
// import toast from 'react-hot-toast';
import { UserTable } from '../common/userTable';
import { useMemo } from 'react';
import { disputeAccountWithActionTableColumns } from '../common/reactTableColumn';


interface AccountListTableProps {
    id: string;
    accessToken: string
    allAccounts: any
    fetchAllAccounts: () => any
}
  
const AccountListTable: React.FC<AccountListTableProps> = ({ allAccounts }): any => {
    // const [allAccounts, setAllAccounts] = useState<any>()
    // console.log("allAccounts", allAccounts)


    // const fetchAllAccounts = async () => {
    //     try {
    //       const response = await axios.get(
    //         `${BASE_URL}/account/findUnattendedAccounts/${id}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         }
    //       );
    //       const allAccountsData = response.data;

    //     //   setAllAccounts(allAccountsData);
      
    //       return allAccountsData;
    //     } catch (error) {
    //       console.error('Error fetching all clients:', error);
    //     }
    // };

    // useEffect(() => {
    //     const fetchAllAccountsInfo = async () => {
    //     //   await fetchAllAccounts();
    //     };
        
    //     accessToken && fetchAllAccountsInfo();
    // }, [accessToken]);

    // const handleDelete = async (id: string | number) => {
    //     if(window.confirm('Are you sure you want to delete the account?'))  {

    //         const toastId = toast.loading("Deleting Account, Please Wait!");


    //         try {
    //             const response = await axios.delete(
    //               `${BASE_URL}/account/deleteAccount/${id}`,
    //               {
    //                 headers: {
    //                   Authorization: `Bearer ${accessToken}`,
    //                 },
    //               }
    //             );

    //             if (response.status === 200) {
    //                 toast.success('Account deleted successfully', { id: toastId })
    //                 await fetchAllAccounts();
    //             }

    //         } catch (error) {
    //             toast.remove()
    //             toast.error('something went wrong!')
    //             console.error('Error occur:', error);
    //         }

    //     }        
    // }
    const memoizedAllAccountData = useMemo(() => allAccounts, [allAccounts])




  return (
    <>
        <div className="flex justify-between items-center mt-10">
            <div>
                <h4 className="font-bold text-[1.4rem]">Accounts</h4>
                <p className="">Lists of account</p>
            </div>

            {/* <button className="btnXs">Edit</button> */}
                
            
        </div>

        <UserTable data={memoizedAllAccountData ?? []} columns={disputeAccountWithActionTableColumns} />
        {/* <div className="bg-greyBg text-black text-center py-6 mt-5 rounded-md"> 
                
            <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-16 text-[.6rem] lg:text-[.9rem] mt-">
                <p>Date</p>
                <p>Account Name</p>
                <p >Account Number </p>
                <p>Bureau</p>
                <p>Balance</p>
                <p>Delete</p>
            </div>

            {
                    allAccounts ? (
                        allAccounts.length > 0 ? (
                            allAccounts.slice(0, 10).map((item: any) => ( 
                                <div key={item.id} className="bg-white mx-1 md:mx-4 rounded-lg" >
                                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:pl-6 lg:pr-14 px-3 text-[.5rem] lg:text-[.9rem] ">
                                        <p>{item?.date}</p>
                                        <p className="-12">{item?.accountName}</p>
                                        <p className="-28">{item?.accountNumber}</p>
                                        <p className="-8">{item?.bureau}</p>
                                        <p className="-8">${item?.balance}</p>
                                        <p className="-7" onClick={() => handleDelete(item?.id)}><img className="cursor-pointer w-3 h-3"  src={trash} alt="delete" /></p>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="ml-5 mt-4 text-left mb-10">No Dispute Accounts Available </p>
                        )
                    ) : (
                        <NewCustomTableSkeleton />
                    )
                } */}

            {/* {
                allAccounts?.length > 0 ? 
                <>
                    {
                        allAccounts?.slice(0, 10).map((item: any) => (
                            <div key={item.id} className="bg-white mx-1 md:mx-4 rounded-lg" >
                                <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:pl-6 lg:pr-14 px-3 text-[.5rem] lg:text-[.9rem] ">
                                    <p>{item?.date}</p>
                                    <p className="-12">{item?.accountName}</p>
                                    <p className="-28">{item?.accountNumber}</p>
                                    <p className="-8">{item?.bureau}</p>
                                    <p className="-8">${item?.balance}</p>
                                    <p className="-7" onClick={() => handleDelete(item?.id)}><img className="cursor-pointer w-3 h-3"  src={trash} alt="delete" /></p>
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

            {/* {Array(10)
                .fill(10)
                .map((_,) => (
                <div className="bg-white mx-1 md:mx-4 rounded-lg" >
                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:pl-6 lg:pr-14 px-3 text-[.5rem] lg:text-[.9rem] ">
                        <p>12/14/2021</p>
                        <p className="-12">Cameron Williamson</p>
                        <p className="-28">3468632112</p>
                        <p className="-8">Equifax & Transunion</p>
                        <p className="-8">$1,158</p>
                        <p className="-7"><img className="cursor-pointer w-3 h-3"  src={trash} alt="delete" /></p>
                    </div>

                </div>
                ))
            } */}

            <div className="mb-16">
                {/* <p>Latest actions (Showing 1 to 10 of {allAccounts?.length})</p> */}
            </div>

            {/* <PaginationBtn /> */}
        {/* </div> */}

    </>
  )
}

export default AccountListTable
