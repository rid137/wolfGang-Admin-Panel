import PaginationBtn from './paginationBtn';


interface CustomTableProps {
    firstTitle: string;
    secondTitle: string;
    thirdTitle: string;
    fourthTitle: string;
    firstBody: string;
    secondBody: string;
    thirdBody: string;
    fourthBody: string;
    isButton?: boolean;
    colored?: boolean;
    handleBtnClick?: () => void;
}

const CustomTable: React.FC<CustomTableProps> = ({firstTitle, secondTitle, thirdTitle, fourthTitle, firstBody, secondBody, thirdBody, fourthBody, isButton, colored, handleBtnClick}) => {
  return (
    <section>
        <div className="bg-greyBg text-black text-center py-6 mt-5 rounded-md"> 
                
                <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-16 text-[.7rem] lg:text-[.9rem] mt-8">
                    <p>{firstTitle}</p>
                    <p>{secondTitle}</p>
                    <p >{thirdTitle}</p>
                    <p>{fourthTitle}</p>
                </div>

                {Array(10)
                        .fill(10)
                        .map((_, index) => (
                    <div key={index} className="bg-white mx-1 sm:mx-4 rounded-lg" >
                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-1 xs:px-2 sm:px-3 text-[.6rem] sm:text-[.7rem] lg:text-[.9rem] ">
                            <p>{firstBody}</p>
                            <p>{secondBody}</p>
                            <p>{thirdBody}</p>
                            { isButton ? <button className='bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.8rem]' onClick={handleBtnClick && handleBtnClick}>{fourthBody}</button> : <p className={`${colored && "text-green-600"}`}>{fourthBody}</p>}
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

export default CustomTable
