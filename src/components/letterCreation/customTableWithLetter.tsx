import file from "../../assets/file.jpg";

interface CustomTableWithLetterProps {
    label: string;
    text: string
}

const CustomTableWithLetter: React.FC<CustomTableWithLetterProps> = ({label, text}) => {
  return (
    <div className=" gap-4 flex flex-col md:flex-row items-center justify-center mt-6">
        <div className="w-full md:w-2/3">
            <h4 className="font-bold text-[1.4rem]">{label}</h4>
            <p className="">Lists of accounts under {text}. In groups of five. </p>

            <div className="bg-greyBg text-black text-center py-5 mt-5 rounded-md"> 
        
                <div className="flex justify-between items-center gap-[.4rem] md:gap-0  font-bold mb-3  mx-5 lg:mx-10 text-[.7rem] lg:text-[.9rem] mt-">
                    <p>Account Name</p>
                    <p>Account Number</p>
                    <p >Balance</p>
                    
                </div>
                
                <div className="bg-white mx-4 rounded-lg" >
                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                        <p>PENN CREDIT</p>
                        <p className="">3468632112</p>
                        <p className="">$1,245</p>
                    </div>

                </div>
                
                <div className="bg-white mx-4 rounded-lg" >
                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                        <p>PENN CREDIT</p>
                        <p className="">3468632112</p>
                        <p className="" style={{visibility: "hidden"}}>$1,245</p>
                    </div>

                </div>

                <div className="bg-white mx-4 rounded-lg" >
                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                        <p>PENN CREDIT</p>
                        <p className="-12">3468632112</p>
                        <p className="-28">$1,245</p>
                    </div>

                </div>

                <div className="bg-white mx-4 rounded-lg" >
                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                        <p>PENN CREDIT</p>
                        <p className="-12">3468632112</p>
                        <p className="" style={{visibility: "hidden"}}>$1,245</p>
                    </div>

                </div>

                <div className="bg-white mx-4 rounded-lg" >
                    <div className="flex justify-between items-center gap-2 md:gap-0 w-full  mb-2 py-3  px-5 text-[.7rem] lg:text-[.9rem] ">
                        <p>PENN CREDIT</p>
                        <p className="-12">3468632112</p>
                        <p className="-28">$2,547</p>
                    </div>

                </div>                
            </div>
        </div>


        <div className="w-full md:w-1/3">
            <h4 className="font-bold text-[1.4rem]">FTC Letters</h4>
            <p className="">Upload document(s) the accounts.</p>

            <div className="bg-greyBg w-full h-[21rem] flex__center mt-5">
                <img src={file} className="bg-greyBg text-greyBg" alt="" />
            </div>
        </div>
        
    </div>
  )
}

export default CustomTableWithLetter;
