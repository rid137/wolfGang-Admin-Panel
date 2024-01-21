import backarrow from "../../assets/backarrow.svg"
import CustomLabelInput from "../../utils/customLabelInput";
import file from "../../assets/file.jpg";
import CustomTableWithLetter from "../../components/letterCreation/customTableWithLetter";
import Inquiries from "../../components/dashboardContent/clientDetailsContent/inquiries";
import inquiryLine from "../../assets/inquiryLine.png";

const LetterCreationDetails = () => {

    const goBack = () => {
        history.back();
    }
  return (
    <section>
         <div className="md:flex justify-between items-center ">
                <div className="cursor-pointer mb-4 md:mb-0" onClick={goBack}>
                    <div className="flex items-center gap-2">
                        <img src={backarrow} alt="" />
                        <h4 className="font-bold text-[1.4rem]">Client Details</h4>
                    </div>
                    <p className="ml-5">View Client Details</p>
                </div>

                <button className="btnXs ml-3" >Combine and Download Letters Batches</button>
            </div>

            <div className="bg-[#E7E7E7] p-4 mt-6">
                <form action="">                     
                    <div className="flex items-center justify-start gap-3  lg:flex-row flex-col">
                        <CustomLabelInput label="Name" text="Sariah Howell"/>
                        <CustomLabelInput label="DOB" text="12/02/1987"/>
                        <CustomLabelInput label="SSN" text="987-67-8645"/>
                    </div>

                    <div className="flex items-center justify-start gap-3 my-6 lg:flex-row flex-col">
                        <CustomLabelInput label="Address" text="3605 Parker Rd."/>
                        <CustomLabelInput label="ID Combined" text="Analise.pdf"/>
                    
                    </div>
                </form>
            </div>

        <CustomTableWithLetter label="Experian Disputed Accounts (1-5)" text="Experian"/>
        <Inquiries />
        <CustomTableWithLetter label="Next Group Of Experian Disputed Accounts (6-10)" text="Experian"/>


        <div className=" gap-4 flex flex-col md:flex-row items-center justify-center mt-6">
                <div className="w-full md:w-2/3">
                    <h4 className="font-bold text-[1.4rem]">Next Group Of Experian Disputed Accounts (11-13)</h4>
                    <p className="">Lists of accounts under Experian. In groups of five.  </p>

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
                    </div>

                </div>
                <div className="w-full md:w-1/3">
                    <h4 className="font-bold text-[1.4rem]">FTC Letters</h4>
                    <p className="">Upload document(s) the accounts.</p>
                    <div className="bg-greyBg w-full h-[14.4rem] flex__center mt-5">
                        <img src={file} className="bg-greyBg text-greyBg" alt="" />
                    </div>
                </div>             
            </div>

            <CustomTableWithLetter label="Equifax Disputed Accounts (1-5)" text="Equifax"/>
            <Inquiries />
            <CustomTableWithLetter label="Next Group Of Equifax Disputed Accounts (6-10)" text="Equifax"/>
            

            <div className=" gap-4 flex flex-col md:flex-row items-center justify-center mt-6">
                <div className="w-full md:w-2/3">
                    <h4 className="font-bold text-[1.4rem]">Next Group Of Equifax Disputed Accounts (11-12)</h4>
                    <p className="">Lists of accounts under Experian. In groups of five.  </p>

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
                                <p className="-12">3468632112</p>
                                <p className="-28">$1,245</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="w-full md:w-1/3">
                    <h4 className="font-bold text-[1.4rem]">FTC Letters</h4>
                    <p className="">Upload document(s) the accounts.</p>
                    <div className="bg-greyBg w-full h-[11rem] flex__center mt-5">
                        <img src={file} className="bg-greyBg text-greyBg" alt="" />
                    </div>
                </div>             
            </div>
            <div className="w-full mx-auto flex items-center justify-center mt-8">
                <img src={inquiryLine} className="w-[70%]" alt="" />
            </div>

            <CustomTableWithLetter label="Transunion Disputed Accounts (1-5)" text="Transunion"/>
            <Inquiries />

            <CustomTableWithLetter label="Next Group Of Transunion Disputed Accounts (6-10)" text="Transunion"/>
            <CustomTableWithLetter label="Next Group Of Transunion Disputed Accounts (11-15)" text="Transunion"/>
    </section>
  )
}

export default LetterCreationDetails;
