import PaginationBtn from '../../common/paginationBtn';

const Inquiries = () => {
  return (
    <section>
        <h4 className="font-bold text-[1.4rem] mt-6">Inquiries</h4>
        <p className="">Lists of Inquiries under this bureau.  </p>

        <div className="bg-greyBg text-black text-center py-5 mt-5 rounded-md"> 
                
                <div className="flex justify-around items-center gap-[.4rem] md:gap-0  font-bold mb-3 ml-8   mr-5 text-[.7rem] lg:text-[.9rem] mt-">
                    <p>Name</p>
                    <p>Date Of Inquiries</p>
                    
                </div>

                {Array(9)
                        .fill(9)
                        .map((_,) => (
                    <div className="bg-white mx-4 rounded-lg" >
                        <div className="flex justify-around items-center gap-2 md:gap-0 w-full  mb-2 py-3  text-[.7rem] lg:text-[.9rem] ">
                            <p>Cap One Na</p>
                            <p>08/12/2023</p>
                            
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

export default Inquiries;
