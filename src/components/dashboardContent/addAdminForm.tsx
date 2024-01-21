import CustomInput from "../../utils/customInput";

const AddAdminForm = () => {
    return(
        <div className="bg-[#D7D7D7] py-5 px-8 ">
            <h3 className="text-primary text-[1.4rem] md:text-[2rem] font-bold text-center">Add New Admin</h3>
            <p className="text-center mb-6">Enter the following details of the new admin</p>

            <form action="">
                <div className="flex items-center justify-center md:flex-row flex-col gap-4">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">First Name <span>*</span></label>
                        <CustomInput placeholder="Enter first name" />
                    </div>
                    
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Last Name <span>*</span></label>
                        <CustomInput placeholder="Enter last name" />
                    </div>
                </div>

                <div className="flex items-center justify-center md:flex-row flex-col gap-4 mt-3">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Email Address <span>*</span></label>
                        <CustomInput placeholder="Enter email address" />
                    </div>
                    
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="font-bold">Phone Number <span>*</span></label>
                        <CustomInput placeholder="Enter phone number" />
                    </div>
                </div>

                <div className=" flex__center mt-6 mb-3">                
                    <button type="submit" className="btnLg ">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddAdminForm;