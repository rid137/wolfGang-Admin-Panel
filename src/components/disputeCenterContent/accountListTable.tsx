import PaginationBtn from '../common/paginationBtn';
import trash from "../../assets/trash.svg";


const AccountListTable = () => {
  return (
    <>
        <div className="flex justify-between items-center mt-10">
            <div>
                <h4 className="font-bold text-[1.4rem]">Accounts</h4>
                <p className="">Lists of account</p>
            </div>

            <button className="btnXs">Edit</button>
                
            
        </div>


        <div className="bg-greyBg text-black text-center py-6 mt-5 rounded-md"> 
                
            <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-16 text-[.6rem] lg:text-[.9rem] mt-">
                <p>Date</p>
                <p>Account Name</p>
                <p >Account Number </p>
                <p>Bureau</p>
                <p>Balance</p>
                <p>Delete</p>
            </div>

            {Array(10)
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
            }

            <div className="flex justify-end mx-4">
                <p>Latest actions (Showing 01 to 09 of 259)</p>
            </div>

            <PaginationBtn />
        </div>

    </>
  )
}

export default AccountListTable
