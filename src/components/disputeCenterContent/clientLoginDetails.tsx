
const ClientLoginDetails = (singleClient: any) => {
  return (
    <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                    <h4 className="font-bold text-[1.3rem] text-primary mb-3">Client Details</h4>
                    <div className="ml-4">
                        <p><span className='font-bold'>Name :</span>  {singleClient?.firstName} {singleClient?.middleName} {singleClient?.lastName}</p>
                        <p ><span className='font-bold'>Address : </span>  {singleClient?.streetAddr}</p>
                        {/* <p><span className='font-bold'>DOB : </span>  {singleClient !== null && DateTime.fromFormat(singleClient?.dob, 'MM/dd/yyyy').toFormat('LLL d yyyy')}</p> */}
                        <p><span className='font-bold'>SSN : </span>  {singleClient?.ssn}</p>
                        <p><span className='font-bold'>ID Combined : </span>  <span className="text-primary">Analise.pdf</span></p>

                    </div>
                </div> 

                <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                    <h4 className="font-bold text-[1.3rem] text-primary mb-3">Log In Details</h4>
                    <p className='font-bold ml-4'>MyScoreIQ: </p>
                    <div className="ml-6">
                        <p>Username: {singleClient?.firstName} </p>
                        <p>Password: password1 </p>
                        <p>Last 4 Digits: {singleClient !== null && singleClient?.phone?.slice((singleClient.phone.length - 1) -3, singleClient.phone.length - 0)}</p>
                        
                    </div>

                    <p className='font-bold ml-4'>Transunion: </p>
                    <div className="ml-6">
                        <p>Username: {singleClient?.firstName}  </p>
                        <p>Password: password1 </p>
                        
                    </div>

                    <p className='font-bold ml-4'>Experian: </p>
                    <div className="ml-6">
                        <p>Username: {singleClient?.firstName} </p>
                        <p>Password: password1  </p>
                        <p>Publix: 3353 </p>
                        
                    </div>
                </div> 

                    
                <div className="bg-greyBg py-4 px-5 md:w-1/ w-full rounded-lg">
                    <h4 className="font-bold text-[1.3rem] text-primary mb-3">Team Notes <span className='text-[1rem]'>(updated regularly) :</span></h4>
                    <p className='font-bold ml-4'> Don’t Dispute Open Card </p>
                </div> 
            </div>
  )
}

export default ClientLoginDetails
