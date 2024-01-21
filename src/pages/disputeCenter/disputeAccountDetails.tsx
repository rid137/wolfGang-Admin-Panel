import CustomInput from "../../utils/customInput";
import backarrow from "../../assets/backarrow.svg";
import AddDisputeAccount from "../../components/disputeCenterContent/addDisputeAccount";
import AddInquiry from "../../components/disputeCenterContent/addInquiry";
import FicoScoreTable from "../../components/disputeCenterContent/ficoScoreTable";
import AccountListTable from "../../components/disputeCenterContent/accountListTable";
import InquiryListTable from "../../components/disputeCenterContent/inquiryListTable";

const DisputeAccountDetails = () => {

    const goBack = () => {
        history.back();
    }

  return (
    <section>
        
        <div className="sm:flex justify-between items-center mb-5">
            <div className="cursor-pointer" onClick={goBack}>
                <div className="flex items-center gap-2">
                    <img src={backarrow} alt="" />
                    <h4 className="font-bold text-[1.4rem]">Client Details</h4>
                </div>
            </div>

            
            <button className="btnXs mt-4 sm:mt-0">Send to Processing Team</button>
                
            
        </div>



        <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
            <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                <h4 className="font-bold text-[1.3rem] text-primary mb-3">Client Details</h4>
                <div className="ml-4">
                    <p><span className='font-bold'>Name :</span>  Dianne Russell</p>
                    <p ><span className='font-bold'>Address : </span>  3605 parker  Rd.</p>
                    <p><span className='font-bold'>DOB : </span>  03/08/1983</p>
                    <p><span className='font-bold'>SSN : </span>  456-55-0127</p>
                    <p><span className='font-bold'>ID Combined : </span>  <span className="text-primary">Analise.pdf</span></p>

                </div>
            </div> 

            <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                <h4 className="font-bold text-[1.3rem] text-primary mb-3">Log In Details</h4>
                <p className='font-bold ml-4'>MyScoreIQ: </p>
                <div className="ml-6">
                    <p>Username: Ziggynico </p>
                    <p>Password: Simba2020 </p>
                    <p>Last 4 Digits: 0196</p>
                    
                </div>

                <p className='font-bold ml-4'>Transunion: </p>
                <div className="ml-6">
                    <p>Username: Ziggynico  </p>
                    <p>Password: Simba2020 </p>
                    
                </div>

                <p className='font-bold ml-4'>Experian: </p>
                <div className="ml-6">
                    <p>Username: Ziggynico </p>
                    <p>Password: Okdv3353  </p>
                    <p>Publix: 3353 </p>
                    
                </div>
            </div> 

                
            <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                <h4 className="font-bold text-[1.3rem] text-primary mb-3">Team Notes <span className='text-[1rem]'>(updated regularly) :</span></h4>
                <p className='font-bold ml-4'> Don’t Dispute Open Card </p>
            </div> 


        </div>
        

        <h3 className="text-center font-bold text-[1.4rem] my-4">Add FICO Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-2   lg:grid-cols-3 gap-4 w-ful mb-6">
            <div className="flex flex-col w-1/">
                <label className="font-bold">Current Experian Score</label>
                <CustomInput placeholder="534" />
            </div>
            
            <div className="flex flex-col w-1/">
                <label className="font-bold">Current Equifax Score</label>
                <CustomInput placeholder="564" />
            </div>

            <div className="flex flex-col w-1/">
                <label className="font-bold">Current Transunion Score</label>
                <CustomInput placeholder="532" />
            </div>
            <div className="flex flex-col w-1/">
                <label className="font-bold">Experian FICO Score</label>
                <CustomInput placeholder="Enter Score" />
            </div>
            
            <div className="flex flex-col w-1/">
                <label className="font-bold">Equifax FICO Score</label>
                <CustomInput placeholder="Enter Score" />
            </div>

            <div className="flex flex-col w-1/">
                <label className="font-bold">Transunion FICO Score</label>
                <CustomInput placeholder="Enter Score" />
            </div>
        </div>
        <div className="flex__center">
            <button className="btnLg">Submit</button>

        </div>

        <AddDisputeAccount />
        <AddInquiry />
        <FicoScoreTable />
        <AccountListTable />
        <InquiryListTable /> 
    </section>
  )
}

export default DisputeAccountDetails;
