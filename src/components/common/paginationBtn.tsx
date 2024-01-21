import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";

const PaginationBtn = () => {
  return (
    <div className="w-full mx-auto flex items-center justify-center gap-2 sm:gap-4 text-primary my-4">
        <div className="sm:w-6 sm:h-6 w-4 h-4 border-[3px] border-white rounded-full flex__center cursor-pointer">
            <IoChevronBack />

        </div>
        <div className="sm:w-12 sm:h-12 w-8 h-8 text-[.8rem] sm:text-[1rem] border-[3px] border-primary rounded-full flex__center cursor-pointer text-white bg-primary">
            1
        </div>
        <div className="sm:w-12 sm:h-12 w-8 h-8 text-[.8rem] sm:text-[1rem] border-[3px] border-primary rounded-full flex__center cursor-pointer">
            2
        </div>
        <div className="sm:w-12 sm:h-12 w-8 h-8 text-[.8rem] sm:text-[1rem] border-[3px] border-primary rounded-full flex__center cursor-pointer">
            3
        </div>
        <div className="sm:w-12 sm:h-12 w-8 h-8 text-[.8rem] sm:text-[1rem] border-[3px] border-primary rounded-full flex__center cursor-pointer">
            ...
        </div>
        <div className="sm:w-12 sm:h-12 w-8 h-8 text-[.8rem] sm:text-[1rem] border-[3px] border-primary rounded-full flex__center cursor-pointer">
            10
        </div>
        <div className="sm:w-6 sm:h-6 w-4 h-4 border-[3px] border-white rounded-full flex__center cursor-pointer">
            <IoChevronForward />

        </div>
        
    </div>
  )
}

export default PaginationBtn;
