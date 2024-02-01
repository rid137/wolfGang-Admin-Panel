import CustomAuthPage from "./customAuthPage";

const ResetPassword = () => {
    return(
        <CustomAuthPage
            title="Reset your password"
            description="Insert your new password"
            firstInputName="New Password"
            firstInputPlaceholder="Enter New password"
            secondInputName="Confirm new Password "
            secondInputPlaceholder="Confirm New password"
            route="/dashboard"
            btnText="Submit"        
        />
    )
}

export default ResetPassword;