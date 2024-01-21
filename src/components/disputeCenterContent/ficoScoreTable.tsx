import PaginationBtn from '../common/paginationBtn';
import trash from "../../assets/trash.svg";


const FicoScoreTable = () => {
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

                {Array(10)
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
                }

                <div className="flex justify-end mx-4">
                    <p>Latest actions (Showing 01 to 09 of 259)</p>
                </div>

                <PaginationBtn />
            </div>

      
    </>
  )
}

export default FicoScoreTable;
