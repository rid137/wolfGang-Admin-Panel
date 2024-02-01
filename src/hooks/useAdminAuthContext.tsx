import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { AdminAuthContext } from "../context/adminAuthContext";

export const AdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
      throw new Error("useUserAuth must be used within an AuthContextProvider");
    }
    return context;
};