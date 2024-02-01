import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import inquiryLine from "../../../assets/inquiryLine.png";
import PaginationBtn from "../../common/paginationBtn";
import { BASE_URL } from "../../../libs";
// import { UserAuth } from "../../../hooks/userAuthContext";
import { NewCustomTableSkeleton } from "../../common/newCustomTable";


interface DisputesProps {
    id: string;
    accessToken: string
}


const Disputes: React.FC<DisputesProps> = ({id, accessToken}): any => {
    const [selectedMonth, setSelectedMonth] = useState('1');
    const [selectedYear, setSelectedYear] = useState('2024');
    const [months, setMonths] = useState<any>([]);
    const [years, setYears] = useState<any>([]);


    // const {userAuthData} = UserAuth()
    
    const [allAccounts, setAllAccounts] = useState<any>()

    const fetchDisputeAccounts = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/account/findUnattendedAccounts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const allAccountsData = response.data;

          setAllAccounts(allAccountsData);
      
          return allAccountsData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
    };

    useEffect(() => {
        const fetchAllDisputeAccountsInfo = async () => {
          const allDisputeAccountsInfo = await fetchDisputeAccounts();
          console.log("allDisputeAccountsInfo", allDisputeAccountsInfo);
        };
        
        accessToken && fetchAllDisputeAccountsInfo();
    }, [accessToken]);

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

    const filterByMonthAndYear = (allAccounts?: any[], targetMonth?: string , targetYear?: string) => {
        return allAccounts?.filter((item) => {
          const dateObject = DateTime.fromISO(item.date);
          const itemMonth = dateObject.month.toString();
          const itemYear = dateObject.year.toString();
      
          return itemMonth === targetMonth && itemYear === targetYear;        });
    };
    const filteredArray = filterByMonthAndYear(allAccounts, selectedMonth, selectedYear);
    // console.log("filteredArray", filteredArray);
      

  return (
    <section>
        <div className="text-center bg-greyBg p-4 md:p-10 w-full mt-4 rounded-md pb-10">
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
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
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
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Select Year</option>
                    {years.map((year: any) => (
                    <option key={year.value} value={year.value}>
                        {year.label}
                    </option>
                    ))}
                </select>

            </div>

            <h4 className="font-bold text-[1.4rem]">Disputes Account By Month (2022)</h4>
            <p>Listed below are the account we identified  to be challenged in each  month</p>
        </div>

            <div className="bg-greyBg w-ful text-black pb-4 m-w-[90%] w-full overflow-x-scrol "> 
                <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem]">
                    <p>Account name</p>
                    <p>Account number</p>
                    <p>Bureau</p>
                    <p>Balance</p>
                </div>


                {
                allAccounts?.length > 0 ?
                <>
                    {
                        filteredArray && filteredArray?.length > 0 ? 
                        <>
                            {
                                filteredArray?.slice(0, 10).map((item: any) => (
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
                            <p>No Dispute Account Available </p>
                        </>
                    }
                </>
                :
                <>
                    <NewCustomTableSkeleton />
                </>
            }

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

                <div className="flex justify-center sm:justify-end mx-4">
                    <p>Latest actions (Showing 01 to 10 of {allAccounts?.length})</p>
                </div>

                <PaginationBtn />
                <div className="w-full mx-auto flex items-center justify-center">
                    <img src={inquiryLine} className="w-[70%]" alt="" />
                </div>

                <div className="text-center mb-8 mt-4">
                    <h4 className="font-bold text-[1.4rem]">Inquiries Disputed By Month (2022)</h4>

                    <p className="mx-4 my-2">Listed below are the account we identified  to be challenged in each  month</p>
                </div>

                <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-7 lg:mx-10 text-[.7rem] lg:text-[.9rem]">
                    <p>Name</p>
                    <p>Date Of Inquiry</p>
                    <p>Bureau</p>
                </div>

                {Array(10)
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
                }

                <div className="flex justify-end mx-4">
                    <p>Latest actions (Showing 01 to 09 of 259)</p>
                </div>

                <PaginationBtn />
            </div>
        </section>
        
  )
}

export default Disputes;
