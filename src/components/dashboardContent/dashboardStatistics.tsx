import { HiMiniUsers } from "react-icons/hi2";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { TbTriangleInverted } from "react-icons/tb";
import line from "../../assets/line.png";

interface DashboardStatisticsProps {
    allClients: any
    allDisputeAccounts: any
}

const DashboardStatistics: React.FC<DashboardStatisticsProps> = ({allClients, allDisputeAccounts}) => {

    // if (!allClients || allClients.length === 0) {
    //     return <div><StatSkeleton /></div>;
    // }

      
    return(
        <div className="grid grid-cols-1 xs lg:grid-cols-4 md:grid-cols-2 gap-8">
                <div className="bg-[#E6E6E6] p-5 rounded-xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[1.3rem] sm:text-xl font-bold">{allClients?.length}</h2>
                        <HiMiniUsers className="text-[1.5rem] sm:text-[2.4rem]" />

                    </div>
                    <p className="text-[1.5rem] sm:text-[2rem] my-2">Active Clients</p>
                    <img src={line} alt="line" className="mx-auto w-2/3" />

                </div>

                <div className="bg-[#E6E6E6] p-5 rounded-xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[1.3rem] sm:text-xl font-bold">50</h2>
                        <HiMiniUsers className="text-[1.5rem] sm:text-[2.4rem]" />

                    </div>
                    <p className="text-[1.5rem] sm:text-[2rem] my-2">Inactive clients</p>
                    <img src={line} alt="line" className="mx-auto w-2/3" />

                </div>

                <div className="bg-[#E6E6E6] p-5 rounded-xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[1.3rem] sm:text-xl font-bold">{allDisputeAccounts?.length}</h2>
                        <HiMiniUsers className="text-[1.5rem] sm:text-[2.4rem]" />

                    </div>
                    <p className="text-[1.5rem] sm:text-[2rem] my-2">Current disputes</p>
                    <img src={line} alt="line" className="mx-auto w-2/3" />

                </div>

                <div className="bg-[#E6E6E6] p-5 rounded-xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[1.3rem] sm:text-xl font-bold">$10,000</h2>
                        <PiCurrencyDollarSimpleBold className="text-[1.5rem] sm:text-[2.4rem]" />

                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-[1.5rem] sm:text-[2rem] my-2">Total money </p>
                        <TbTriangleInverted className="text-[1.4rem]"/>
                        
                    </div>
                    <img src={line} alt="line" className="mx-auto w-2/3" />

                </div>
                
            </div>
    )
}

export default DashboardStatistics;


export const StatSkeleton = () => {
    return(
        <div className="grid grid-cols-1 xs lg:grid-cols-4 md:grid-cols-2 gap-8">
            <div className="bg-[#E6E6E6] py-8 px-6 rounded-xl">
                <div className="mb-4">
                    <h2 className="bg-[#bbbaba] h-6  animate-pulse"></h2>

                </div>
                <p className="bg-[#bbbaba] h-10 animate-pulse"></p>

            </div>

            <div className="bg-[#E6E6E6] py-8 px-6 rounded-xl">
                <div className="mb-4">
                    <h2 className="bg-[#bbbaba] h-6 animate-pulse"></h2>

                </div>
                <p className="bg-[#bbbaba] h-10 animate-pulse"></p>

            </div>

            <div className="bg-[#E6E6E6] py-8 px-6 rounded-xl">
                <div className="mb-4">
                    <h2 className="bg-[#bbbaba] h-6 animate-pulse"></h2>

                </div>
                <p className="bg-[#bbbaba] h-10 animate-pulse"></p>

            </div>

            <div className="bg-[#E6E6E6] py-8 px-6 rounded-xl">
                <div className="mb-4">
                    <h2 className="bg-[#bbbaba] h-6 animate-pulse"></h2>

                </div>
                <p className="bg-[#bbbaba] h-10 animate-pulse"></p>

            </div>

        </div>
    )
}