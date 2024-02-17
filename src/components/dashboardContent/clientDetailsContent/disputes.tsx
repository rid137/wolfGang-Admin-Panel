import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
// import inquiryLine from "../../../assets/inquiryLine.png";
// import PaginationBtn from "../../common/paginationBtn";
// import { UserAuth } from "../../../hooks/userAuthContext";
// import { NewCustomTableSkeleton } from "../../common/newCustomTable";
import { UserTable } from "../../common/userTable";
import { disputeAccountTableColumns, inquiryTableColumns } from "../../common/reactTableColumn";
// import { ManagerProfileType } from "../../../types/managerObj";


interface DisputesProps {
    id: string;
    accessToken: string;
    clientDisputeAccounts?: any;
    clientInquiries?: any;
}


const Disputes: React.FC<DisputesProps> = ({clientDisputeAccounts, clientInquiries}): any => {
    
    // const memoizedDisputeAccountsData = useMemo(() => filteredDisputeAccounts, [filteredDisputeAccounts])
    // const memoizedClientInquiriesData = useMemo(() => filteredInquiries, [filteredInquiries])

    const [selectedMonthForDispute, setSelectedMonthForDispute] = useState('2');
    const [selectedYearForDispute, setSelectedYearForDispute] = useState('2024');
    const [selectedMonthForInquiry, setSelectedMonthForInquiry] = useState('2');
    const [selectedYearForInquiry, setSelectedYearForInquiry] = useState('2024');
    const [months, setMonths] = useState<any>([]);
    const [years, setYears] = useState<any>([]);


    // const {userAuthData} = UserAuth()
    // console.log("clinetDeeee", clientInquiries)
    

    

    
    // WORK ON TYPE LATER
    useEffect(() => {
        const currentYear = new Date().getFullYear();
    
        const monthOptions = Array.from({ length: 12 }, (_, index) => ({
          value: index + 1,
          label: new Date(2000, index, 1).toLocaleString('default', { month: 'long' }),
        }));
    
        const yearOptions = Array.from({ length: 10 }, (_, index) => ({
          value: currentYear - index,
          label: currentYear - index,
        }));
    
        setMonths(monthOptions);
        setYears(yearOptions);
    }, []);

    // WORK ON TYPE LATER
    const filterByMonthAndYear = (arrayToFilter?: any[], targetMonth?: string , targetYear?: string) => {
        return arrayToFilter?.filter((item) => {
          const dateObject = DateTime.fromISO(item.date);
          const itemMonth = dateObject.month.toString();
          const itemYear = dateObject.year.toString();
      
          return itemMonth === targetMonth && itemYear === targetYear;       
        
        });
    };
    const filteredDisputeAccounts = filterByMonthAndYear(clientDisputeAccounts, selectedMonthForDispute, selectedYearForDispute);
    const filteredInquiries = filterByMonthAndYear(clientInquiries, selectedMonthForInquiry, selectedYearForInquiry);

    const memoizedDisputeAccountsData = useMemo(() => filteredDisputeAccounts, [filteredDisputeAccounts])
    const memoizedClientInquiriesData = useMemo(() => filteredInquiries, [filteredInquiries])

    const getMonthName = (month: number): string => {
        if (month < 1 || month > 12) {
          return 'Invalid month';
        }
      
        const date = new Date(2000, month - 1, 1);
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
      
        return monthName;
    };
    const monthNameForDispute = getMonthName(Number(selectedMonthForDispute));
    const monthNameForInquiry = getMonthName(Number(selectedMonthForInquiry));

      

  return (
    <section>
        <div className="text-center bg-greyBg pt-12 md:p- w-full mt-6 rounded-md pb-4">
            <h4 className="font-bold text-[1.4rem]">Disputes and  Inquiries</h4>

            <div className="flex flex-col mx-auto">
                <p>Please choose the year of dispute you wish to look at.</p>
            </div>

            {/* <div className="flex items-center justify-center gap-3 mx-auto my-3">
                <div className="bg-white py-3 px-2 flex__center gap-1 w-24 ">
                    <p>Feb</p>
                    <img src={downarrow} alt="" />
                </div>

                <div className="bg-white py-3 px-2 flex__center gap-1 w-24 ">
                    <p>2022</p>
                    <img src={downarrow} alt="" />
                </div>
            </div> */}

            <div className="flex items-center justify-center gap-3 mx-auto my-3">
                <select
                    className="bg-white py-3 px-2 flex__center gap-1 w-24 "
                    id="month"
                    value={selectedMonthForDispute}
                    onChange={(e) => setSelectedMonthForDispute(e.target.value)}
                >
                    <option value="">Select Month</option>
                    {months.map((month: any) => (
                    <option key={month.value} value={month.value}>
                        {month.label}
                    </option>
                    ))}
                </select>

                <select
                    className="bg-white py-3 px-2 flex__center gap-1 w-24 "
                    id="year"
                    value={selectedYearForDispute}
                    onChange={(e) => setSelectedYearForDispute(e.target.value)}
                >
                    <option value="">Select Year</option>
                    {years.map((year: any) => (
                    <option key={year.value} value={year.value}>
                        {year.label}
                    </option>
                    ))}
                </select>

            </div>

            <h4 className="font-bold text-[1.4rem]">Disputes Account By {monthNameForDispute} ({selectedYearForDispute})</h4>
            <p>Listed below are the accounts we identified  to be challenged in each  month</p>


        </div>



        <div className="bg-greyBg w-ful text-black pb-14 m-w-[90%] w-full overflow-x-scro "> 
            <UserTable data={memoizedDisputeAccountsData ?? []} columns={disputeAccountTableColumns}/>
            {/* <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem]">
                <p>Account name</p>
                <p>Account number</p>
                <p>Bureau</p>
                <p>Balance</p>
            </div> */}



                {/* {
                clientDisputeAccounts && clientDisputeAccounts?.length >= 0 ?
                <>
                    {
                        filteredDisputeAccounts && filteredDisputeAccounts?.length > 0 ? 
                        <>
                            {
                                filteredDisputeAccounts?.slice(0, 10).map((item: any) => (
                                    <div key={item?.id} className="bg-white mx-4 rounded-lg" >
                                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-3 text-[.7rem] lg:text-[.9rem]">
                                            <p>{item?.accountName}</p>
                                            <p>{item?.accountNumber}</p>
                                            <p>{item?.bureau}</p>
                                            <p>{item?.balance}</p>
                                        </div>
        
                                    </div>
                                ))
                            }
                        </>
                        :
                        <>
                            <p className="mb-[5rem] ml-[1rem]">No Dispute Account Available </p>
                        </>
                    }
                </>
                :
                <>
                    <NewCustomTableSkeleton />
                </>
            } */}

                {/* {Array(10)
                        .fill(10)
                        .map((_, index) => (
                    <div key={index} className="bg-white mx-4 rounded-lg" >
                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-3 text-[.7rem] lg:text-[.9rem]">
                            <p>Dianne Russell</p>
                            <p>******* 7869</p>
                            <p>Experian</p>
                            <p>***</p>
                        </div>

                    </div>
                    ))
                } */}

                {/* <div className="flex justify-center sm:justify-end mx-4">
                    <p>Latest actions (Showing 01 to 10 of {clientDisputeAccounts?.length})</p>
                </div>

                <PaginationBtn />
                <div className="w-full mx-auto my-[3rem] flex items-center justify-center">
                    <img src={inquiryLine} className="w-[70%]" alt="" />
                </div> */}


                <div className="flex items-center justify-center gap-3 mx-auto mb-3 mt-20">
                <select
                    className="bg-white py-3 px-2 flex__center gap-1 w-24 "
                    id="month"
                    value={selectedMonthForInquiry}
                    onChange={(e) => setSelectedMonthForInquiry(e.target.value)}
                >
                    <option value="">Select Month</option>
                    {months.map((month: any) => (
                    <option key={month.value} value={month.value}>
                        {month.label}
                    </option>
                    ))}
                </select>

                <select
                    className="bg-white py-3 px-2 flex__center gap-1 w-24 "
                    id="year"
                    value={selectedYearForInquiry}
                    onChange={(e) => setSelectedYearForInquiry(e.target.value)}
                >
                    <option value="">Select Year</option>
                    {years.map((year: any) => (
                    <option key={year.value} value={year.value}>
                        {year.label}
                    </option>
                    ))}
                </select>

            </div>


                <div className="text-center my-4">
                    <h4 className="font-bold text-[1.4rem]">Inquiries Disputed By {monthNameForInquiry} ({selectedYearForInquiry})</h4>

                    <p className="mx-4 my-2">Listed below are the account we identified  to be challenged in each  month</p>
                </div>

                <UserTable data={memoizedClientInquiriesData ?? []} columns={inquiryTableColumns} />
                {/* <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-7 lg:mx-10 text-[.7rem] lg:text-[.9rem]">
                    <p>Name</p>
                    <p>Date Of Inquiry</p>
                    <p>Bureau</p>
                </div>

                {
                clientInquiries && clientInquiries?.length >= 0 ?
                <>
                    {
                        filteredInquiries && filteredInquiries?.length > 0 ? 
                        <>
                            {
                                filteredInquiries?.slice(0, 10).map((item: any, index: number) => (
                                    <div key={index} className="bg-white mx-4 rounded-lg" >
                                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-3 text-[.7rem] lg:text-[.9rem]">
                                        <p>{item?.name}</p>
                                        <p>{item?.date}</p>
                                        <p>{item?.bureau}</p>
                                    </div>

                                </div>
                                ))
                            }
                        </>
                        :
                        <>
                            <p className="mb-[5rem] ml-[1rem]">No Inquiries Available </p>
                        </>
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
                    <div className="bg-white mx-4 rounded-lg" >
                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-3 text-[.7rem] lg:text-[.9rem]">
                            <p>Dianne Russell</p>
                            <p>06/02/2022</p>
                            <p>Experian</p>
                        </div>

                    </div>
                    ))
                } */}

                {/* <div className="flex justify-end mx-4">
                    <p>Latest actions (Showing 01 to 10 of {clientInquiries?.length})</p>
                </div>

                <PaginationBtn /> */}
            </div>
        </section>
        
  )
}

export default Disputes;
