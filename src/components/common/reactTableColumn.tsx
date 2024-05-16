import { ColumnDef } from "@tanstack/react-table";
import { ClientDetailsType, DisputeAccountType, InquiryType, PaymentDataType, ficoScoreType } from "../../types/clientDetailsObj";
import { DateTime } from "luxon";
// import { Button } from "../../shadcn-components/ui/button";
import { Link } from "react-router-dom";
import { AdminAuth } from "../../hooks/useAdminAuthContext";
import toast from "react-hot-toast";
import { BASE_URL } from "../../libs";
import axios from "axios";
import trash from "../../assets/trash.svg"
import { Status } from "../../pages/payment";

const getStatusTextColor = (status: string | undefined) => {
    switch (status) {
        case Status.Success:
        return 'rgba(211, 252, 202, 1)';
        case Status.Pending:
        return 'rgba(252, 250, 202, 1)';
        case Status.Failed:
        return 'rgba(252, 205, 202, 1)';
        default:
        return 'black';
    }
};

const getStatusBgColor = (status: string | undefined) => {
    switch (status) {
        case Status.Success:
        return 'rgba(3, 105, 32, 1)';
        case Status.Pending:
        return 'rgba(192, 161, 2, 1)';
        case Status.Failed:
        return 'rgba(236, 19, 19, 1)';
        default:
        return 'black';
    }
}


export const clientColumns: ColumnDef<ClientDetailsType | null>[] = [
    {
        header: "Name",
        // accessorKey: "firstName"
        accessorFn: row => `${row?.firstName} ${row?.lastName}`
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({row}) => {
            const status = row.getValue("status")
            return status === null ? "Active" : status
        }
    },
    {
        header: "Refresh Date",
        accessorKey: "refreshDate",
        cell: ({row}) => {
            const refreshDate = row.getValue("refreshDate")
            return DateTime.fromISO(refreshDate as string).toLocaleString(DateTime.DATE_MED)
        }
    },
    {
        header: "Action",
        cell: ({row}) => {
            const client = row.original
            const clientId = client?.id
            // return <Button className="text-white text-[.8rem]"><Link to={`client_details/${clientId}`}>Details</Link></Button>
            return (
            <Link to={`client_details/${clientId}`}
                className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.5rem] sm:text-[.6rem] lg:text-[.9rem]"
                >
                Details
            </Link>
            )
        }
    }
]



export const managerColumns: ColumnDef<ClientDetailsType | null>[] = [
    {
        header: "Name",
        // accessorKey: "firstName"
        accessorFn: row => `${row?.firstName} ${row?.lastName}`
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({row}) => {
            const status = row.getValue("status")
            return status === null ? "Active" : status
        }
    },
    {
        header: "Refresh Date",
        accessorKey: "updatedAt",
        cell: ({row}) => {
            const refreshDate = row.getValue("updatedAt")
            return DateTime.fromISO(refreshDate as string).toLocaleString(DateTime.DATE_MED)
        }
    },
    {
        header: "Action",
        cell: ({row}) => {
            const manager = row.original
            const managerId = manager?.id
            // return <Button className="text-white text-[.8rem]"><Link to={`client_details/${managerId}`}>Details</Link></Button>
            return (
            <Link to={`admin_details/${managerId}`}
                className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.5rem] sm:text-[.6rem] lg:text-[.9rem]"
                >
                Details
            </Link>
            )
        }
    }
]


export const adminClientsColumns: ColumnDef<ClientDetailsType | null>[] = [
    {
        header: "Name",
        // accessorKey: "firstName"
        accessorFn: row => `${row?.firstName} ${row?.lastName}`
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({row}) => {
            const status = row.getValue("status")
            return status === null ? "Active" : status
        }
    },
    {
        header: "Refresh Date",
        accessorKey: "updatedAt",
        cell: ({row}) => {
            const refreshDate = row.getValue("updatedAt")
            return DateTime.fromISO(refreshDate as string).toLocaleString(DateTime.DATE_MED)
        }
    },
    {
        header: "Action",
        cell: ({row}) => {
            const client = row.original
            const clientId = client?.id
            // return <Button className="text-white text-[.8rem]"><Link to={`client_details/${clientId}`}>Details</Link></Button>
            return (
            <Link to={`/dashboard/client_details/${clientId}`}
                className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.5rem] sm:text-[.6rem] lg:text-[.9rem]"
                >
                Details
            </Link>
            )
        }
    }
]

// accType: string
//     accountName: string
//     accountNumber: string
//     balance: string
//     bureau: string
//     date: string
//     id: number
//     inDispute: boolean

// ["Name", "Status", "Refresh Date", "Action"]


export const disputeCenterTableColumns: ColumnDef<ClientDetailsType | null>[] = [
    {
        header: "Name",
        // accessorKey: "firstName"
        accessorFn: row => `${row?.firstName} ${row?.lastName}`
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({row}) => {
            const status = row.getValue("status")
            return status === null ? "Active" : status
        }
    },
    {
        header: "Refresh Date",
        accessorKey: "refreshDate",
        cell: ({row}) => {
            const refreshDate = row.getValue("refreshDate")
            return DateTime.fromISO(refreshDate as string).toLocaleString(DateTime.DATE_MED)
        }
    },
    {
        header: "Action",
        cell: ({row}) => {
            const client = row.original
            const clientId = client?.id
            // return <Button className="text-white text-[.8rem]"><Link to={`client_details/${clientId}`}>Details</Link></Button>
            return (
            <Link to={`/dashboard/dispute_center/dispute_account_details/${clientId}`}
                className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.5rem] sm:text-[.6rem] lg:text-[.9rem]"
                >
                Details
            </Link>
            )
        }
    }
]


export const letterCreationTableColumns: ColumnDef<ClientDetailsType | null>[] = [
    {
        header: "Name",
        // accessorKey: "firstName"
        accessorFn: row => `${row?.firstName} ${row?.lastName}`
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({row}) => {
            const status = row.getValue("status")
            return status === null ? "Active" : status
        }
    },
    {
        header: "Refresh Date",
        accessorKey: "refreshDate",
        cell: ({row}) => {
            const refreshDate = row.getValue("refreshDate")
            return DateTime.fromISO(refreshDate as string).toLocaleString(DateTime.DATE_MED)
        }
    },
    {
        header: "Action",
        cell: ({row}) => {
            const client = row.original
            const clientId = client?.id
            // return <Button className="text-white text-[.8rem]"><Link to={`client_details/${clientId}`}>Details</Link></Button>
            return (
            <Link to={`/dashboard/letter_creation/letter_creation_details/${clientId}`}
                className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.5rem] sm:text-[.6rem] lg:text-[.9rem]"
                >
                Details
            </Link>
            )
        }
    }
]


export const disputeAccountTableColumns: ColumnDef<DisputeAccountType | null>[] = [
    {
        header: "Account name",
        accessorKey: "accountName"
        // accessorFn: "accountName"
    },
    {
        header: "Account number",
        accessorKey: "accountNumber",
    },
    {
        header: "Bureau",
        accessorKey: "bureau",
    },
    {
        header: "Balance",
        accessorKey: "balance"
    }
]


export const inquiryTableColumns: ColumnDef<InquiryType | null>[] = [
    {
        header: "Name",
        accessorKey: "name"
    },
    {
        header: "Date Of Inquiry",
        accessorKey: "date",
    },
    {
        header: "Bureau",
        accessorKey: "bureau",
    },
]


export const ficoScoreTableColumns: ColumnDef<ficoScoreType | null>[] = [

    {
        header: "Experian FICO Score",
        accessorKey: "experianScore"
    },
    {
        header: "Equifax FICO Score",
        accessorKey: "equifaxScore",
    },
    {
        header: "Transunion FICO Score",
        accessorKey: "transunionScore",
    },
    {
        header: "Date",
        accessorKey: "updatedAt",
        cell: ({row}) => {
            const refreshDate = row.getValue("updatedAt")
            return DateTime.fromISO(refreshDate as string).toLocaleString(DateTime.DATE_MED)
        }
    },
    {
        header: "Delete",
        cell: ({ row }) => {
            const client = row.original;
            const clientId = client?.id;
            return <DeleteFicoButton clientId={clientId} />;
        },
    },
    
]

const DeleteFicoButton: React.FC<{ clientId?: number }> = ({ clientId }) => {
    const { adminAuthData } = AdminAuth();
    const accessToken = adminAuthData?.token;

    const handleDeleteClick = async () => {
        if (window.confirm('Are you sure you want to delete the score?')) {
            toast.loading("Deleting FICO score");

            try {
                const response = await axios.delete(
                    `${BASE_URL}/scores/delete/${clientId}?id=${clientId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (response.status === 200) {
                    toast.success('FICO score deleted successfully');
                    // await fetchAllScores();
                }

            } catch (error) {
                toast.error('FICO score deletion failed');
                console.error('Error deleting FICO score:', error);
            }

            toast.remove();
        }
    };

    return (
        <button onClick={handleDeleteClick}>
            <img className="cursor-pointer w-3 h-3"  src={trash} alt="delete" />
        </button>
    );
};


// export const disputeAccountWithActionTableColumns: ColumnDef<DisputeAccountType | null>[] = [
//     {
//         header: "Date",
//         accessorKey: "date",
//         cell: ({row}) => {
//             const refreshDate = row.getValue("date")
//             return DateTime.fromISO(refreshDate as string).toLocaleString(DateTime.DATE_MED)
//         }
//     },
//     {
//         header: "Account name",
//         accessorKey: "accountName"
//         // accessorFn: "accountName"
//     },
//     {
//         header: "Account number",
//         accessorKey: "accountNumber",
//     },
//     {
//         header: "Bureau",
//         accessorKey: "bureau",
//     },
//     {
//         header: "Balance",
//         accessorKey: "balance"
//     },
//     {
//         header: "Delete",
//         cell: ({ row }) => {
//             const dispute = row.original;
//             const disputeId = dispute?.id;
//             return <DeleteDisputeAccountButton disputeId={disputeId} />;
//         },
//     },
// ]


// const DeleteDisputeAccountButton: React.FC<{ disputeId?: number }> = ({ disputeId }) => {
//     const { adminAuthData } = AdminAuth();
//     const accessToken = adminAuthData?.token;

//     const handleDisputeAccountDelete = async () => {
//         if(window.confirm('Are you sure you want to delete the account?'))  {

//             const toastId = toast.loading("Deleting Account, Please Wait!");


//             try {
//                 const response = await axios.delete(
//                   `${BASE_URL}/account/deleteAccount/${disputeId}`,
//                   {
//                     headers: {
//                       Authorization: `Bearer ${accessToken}`,
//                     },
//                   }
//                 );

//                 if (response.status === 200) {
//                     toast.success('Account deleted successfully', { id: toastId })
//                     // await fetchAllAccounts();
//                 }

//             } catch (error) {
//                 toast.remove()
//                 toast.error('something went wrong!')
//                 console.error('Error occur:', error);
//             }

//         }        
//     }

//     return (
//         <button onClick={handleDisputeAccountDelete}>
//             <img className="cursor-pointer w-3 h-3"  src={trash} alt="delete" />
//         </button>
//     );
// };


export const inquiryWithActionTableColumns: ColumnDef<InquiryType | null>[] = [
    {
        header: "Name",
        accessorKey: "name"
    },
    {
        header: "Date Of Inquiry",
        accessorKey: "date",
        cell: ({row}) => {
            const refreshDate = row.getValue("date")
            return DateTime.fromISO(refreshDate as string).toLocaleString(DateTime.DATE_MED)
        }
    },
    {
        header: "Bureau",
        accessorKey: "bureau",
    },
    {
        header: "Delete",
        cell: ({ row }) => {
            const inquiry = row.original;
            const inquiryId = inquiry?.id;
            return <DeleteInquiryButton inquiryId={inquiryId} />;
        },
    },
]


const DeleteInquiryButton: React.FC<{ inquiryId?: number }> = ({ inquiryId }) => {
    const { adminAuthData } = AdminAuth();
    const accessToken = adminAuthData?.token;

    const handleInquiryDelete = async () => {
        if(window.confirm('Are you sure you want to delete this inquiry?'))  {
    
            const toastId = toast.loading("Deleting inquiry");
    
            try {
                const response = await axios.delete(
                  `${BASE_URL}/inquiry/delete/${inquiryId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );
    
                if (response.status === 200) {
                    toast.success('Inquiry deleted successfully', { id: toastId })
                    // await fetchAllInquiries();
                }
    
            } catch (error) {
              toast.remove()
                toast.error('Something went wrong')
                console.error('Error deleting account:', error);
            }
            
          }        
          // toast.remove()
      }
    

    return (
        <button onClick={handleInquiryDelete}>
            <img className="cursor-pointer w-3 h-3"  src={trash} alt="delete" />
        </button>
    );
};


export const letterCreationInquiryTableColumns: ColumnDef<InquiryType | null>[] = [
    {
        header: "Name",
        accessorKey: "name"
    },
    {
        header: "Date Of Inquiry",
        accessorKey: "date",
        cell: ({row}) => {
            const refreshDate = row.getValue("date")
            return DateTime.fromISO(refreshDate as string).toLocaleString(DateTime.DATE_MED)
        }
    },
]


export const paymentTableColumns: ColumnDef<PaymentDataType | null>[] = [
{
    header: "Date",
    accessorKey: "date",
    cell: ({row}) => {
        const paymentDate = row.getValue("date")
        return DateTime.fromISO(paymentDate as string).toLocaleString(DateTime.DATE_MED)
    }
},
{
    header: "Amount",
    // accessorKey: "amount",
    accessorFn: row => `$${row?.amount}`
},
{
    header: "Status",
    accessorKey: "status",
    cell: ({row}) => {
        const getRow = row.original
        const getStatus = getRow?.status
        return (
            <button className={`px-4 py-1 my- rounded-md cursor-default`} style={{ color: getStatusBgColor(getStatus) , background: getStatusTextColor(getStatus)}}>{getStatus}</button>
        )
    }
},
]
                    