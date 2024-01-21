import PaginationBtn from '../common/paginationBtn';
import trash from "../../assets/trash.svg";

const InquiryListTable = () => {
  return (
    <>
      <h4 className="font-bold text-[1.4rem] mt-10">Inquiries</h4>
      <p>Lists of inquiries</p>

      <div className="bg-greyBg text-black text-center py-6 mt-5 rounded-md overflow-x-auto">
        <div className="flex justify-between items-center gap-[.4rem] md:gap-0 font-bold mb-3 ml-7 md:mx-5 lg:ml-20 lg:mr-10 text-[.5rem] lg:text-[.9rem] mt-">
          <p>Date</p>
          <p>Name</p>
          <p>Date Of Inquiry</p>
          <p>Bureau</p>
          <p>Print?</p>
          <p className='pr-2 md:pr-0'>Delete</p>
        </div>

        {Array(10)
          .fill(10)
          .map((_, index) => (
            <div key={index} className="bg-white mx-1 md:mx-4 rounded-lg">
              <div className="flex justify-between items-center gap-2 md:gap-0 w-full mb-2 py-3 lg:pl-6 lg:pr-14 px-2 md:px-3 text-[.5rem] lg:text-[.9rem] ">
                <p>12/14/2021</p>
                <p className="-12">Cameron Williamson</p>
                <p className="-28">12/14/2021</p>
                <p className="-8">Experian</p>
                <p className="-8">Yes</p>
                <p className="-7">
                  <img src={trash} className='cursor-pointer w-3 h-3' alt="delete" />
                </p>
              </div>
            </div>
          ))}
        <div className="flex justify-end mx-4">
          <p>Latest actions (Showing 01 to 09 of 259)</p>
        </div>

        <PaginationBtn />
      </div>
    </>
  );
};

export default InquiryListTable;
