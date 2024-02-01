import { Outlet } from "react-router-dom";
import wolfAuthBg from "../../assets/wolfAuthBg.jpeg";

const AuthLayout = () => {
    return(
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${wolfAuthBg})` }}>
            <Outlet />
        </div>
    )
}

export default AuthLayout;


// const inputList = Array.from(new Array(4), (_, index) => {
//     return (
//       <div key={index}>
//         <Input
//           type="code"
//           maxLength={1}
//           autoComplete="off"
//           value={code[index]}
//           onPaste={(e) => handlePaste(e)}
//           onKeyDown={(e) => handleKeyDown(index, e)}
//           onChange={(e) => handleChange(index, e.target.value)}
//           ref={(ref) => inputRefs.current.push(ref!)}
//         />
//       </div>
//     );
//   });