import React from 'react';

interface LabelIputProps {
  label: string
  text: string
};

const CustomLabelInput: React.FC<LabelIputProps> = ({label, text}) => {
    return(
        <div className="flex w-full lg:w-[21rem] mb-5 ">
            <div className="bg-[#DCDDE0] p-4  text-center w-[40%] rounded-tl-lg rounded-bl-lg text-[.7rem] sm:text-[.9rem] font-bold">{label}: </div>
            <div className="bg-white p-4   w-[60%] rounded-tr-lg rounded-br-lg text-[.7rem] sm:text-[.9rem]">{text}</div>
        </div>       
    )
}

export default CustomLabelInput;