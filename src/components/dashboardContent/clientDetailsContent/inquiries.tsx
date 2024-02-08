import PaginationBtn from '../../common/paginationBtn';

interface InqType {
    bureau: string
    date: string
    id: number
    inDispute: boolean
    name: string
}

interface InquiriesProps {
    InqAcc?: InqType[];
}   

const Inquiries: React.FC<InquiriesProps> = ({InqAcc}) => {
    // console.log("InqAcc", InqAcc)
  return (
    <section>
        <h4 className="font-bold text-[1.4rem] mt-6">Inquiries</h4>
        <p className="">Lists of Inquiries under this bureau.  </p>

        <div className="bg-greyBg text-black text-center py-5 mt-5 rounded-md"> 
                
                <div className="flex justify-around items-center gap-[.4rem] md:gap-0  font-bold mb-3 ml-8   mr-5 text-[.7rem] lg:text-[.9rem] mt-">
                    <p>Name</p>
                    <p>Date Of Inquiries</p>
                    
                </div>

                {
                    InqAcc && InqAcc?.length > 0 ? 
                    <>
                        {
                            InqAcc && InqAcc?.slice(0, 10).map((item) => (
                                <div key={item?.id} className="bg-white mx-4 rounded-lg" >
                                    <div className="flex justify-around items-center gap-2 md:gap-0 w-full  mb-2 py-3  text-[.7rem] lg:text-[.9rem] ">
                                        <p>{item?.name}</p>
                                        <p>{item?.date}</p>
                                        
                                    </div>

                                </div>

                            ))
                        }
                    </>
                    :
                    <>
                        <p className="text-left ml-5 mt-5">No Data Available</p>
                    </>
                }

                {/* {Array(9)
                        .fill(9)
                        .map((_,) => (
                    <div className="bg-white mx-4 rounded-lg" >
                        <div className="flex justify-around items-center gap-2 md:gap-0 w-full  mb-2 py-3  text-[.7rem] lg:text-[.9rem] ">
                            <p>Cap One Na</p>
                            <p>08/12/2023</p>
                            
                        </div>

                    </div>
                    ))
                } */}

                <div className="flex justify-end mx-4">
                    <p>Latest actions (Showing 01 to 10 of {InqAcc?.length})</p>
                </div>

                <PaginationBtn />
            </div>
      
    </section>
  )
}

export default Inquiries;
