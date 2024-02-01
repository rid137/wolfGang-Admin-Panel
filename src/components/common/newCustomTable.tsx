import PaginationBtn from "./paginationBtn";

interface NewCustomTableProps {
    titles: string[];
    data: {
        id: number;
        firstBody: string;
        secondBody: string;
        thirdBody: string;
        fourthBody: string;
    }[];
    totalLength: number,
    isButton?: boolean;
    colored?: boolean;
    handleBtnClick?: (id: number) => void;
}

const NewCustomTable: React.FC<NewCustomTableProps> = ({ titles, data, isButton, colored, totalLength, handleBtnClick }) => {

    if (!data || data.length === 0) {
        return <div><NewCustomTableSkeleton /></div>;
    }

      
    return (
        <section>
            <div className="bg-greyBg text-black text-center py-6 mt-5 rounded-md">
                <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-16 text-[.7rem] lg:text-[.9rem] mt-">
                    {titles.map((title, index) => (
                        <p key={index}>{title}</p>
                    ))}
                </div>

                {data.map((row, index) => (
                    <div key={index} className="bg-white mx-1 sm:mx-4 rounded-lg">
                        <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3 lg:px-6 px-1 xs:px-2 sm:px-3 text-[.6rem] sm:text-[.7rem] lg:text-[.9rem] ">
                            <p>{row.firstBody}</p>
                            <p>{row.secondBody}</p>
                            <p>{row.thirdBody}</p>
                            {isButton ? (
                                <button
                                    className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.8rem]"
                                    onClick={() => handleBtnClick && handleBtnClick(row.id)}>
                                    {row.fourthBody}
                                </button>
                            ) : (
                                <p className={`${colored && "text-green-600"}`}>{row.fourthBody}</p>
                            )}
                        </div>
                    </div>
                ))}

                <div className="flex justify-end mx-4">
                    <p>Latest actions (Showing 01 to {data.length} of {totalLength})</p>
                </div>

                <PaginationBtn />
            </div>
        </section>
    );
};

export default NewCustomTable;


export const NewCustomTableSkeleton = () => {
    return(
        <section>
            <div className="bg-greyBg text-black text-center py-6 mt-5 rounded-md">
                <div className="animate-pulse flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-16 text-[.7rem] lg:text-[.9rem] mt- bg-[#bbbaba]">
                   
                </div>

                {Array(10)
                        .fill(10)
                        .map((_, index) => (
                    <div key={index} className="bg-[#bbbaba] mx-1 sm:mx-4 rounded-lg animate-pulse" >
                        <div className="flex  w-full  mb-2 py-6">
                            
                        </div>

                    </div>
                    ))
                }

                <div className="flex justify-end mx-4 bg-[#bbbaba] animate-pulse h-4">

                </div>

                <div className="flex justify-end mx-4 bg-[#bbbaba] animate-pulse h-4">

                </div>

            </div>
        </section>
    )
}
