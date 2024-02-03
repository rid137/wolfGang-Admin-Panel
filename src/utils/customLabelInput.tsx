import React from 'react';

interface LabelIputProps {
  label: string
  text: string
  isEditing?: boolean
};

const CustomLabelInput: React.FC<LabelIputProps> = ({label, text, isEditing}) => {
    return(
        // <div className="flex w-full lg:w-[21rem] mb-5 ">
        //     <div className="bg-[#DCDDE0] p-4  text-center w-[40%] rounded-tl-lg rounded-bl-lg text-[.7rem] sm:text-[.9rem] font-bold">{label}: </div>
        //     <div className="bg-white p-4   w-[60%] rounded-tr-lg rounded-br-lg text-[.7rem] sm:text-[.9rem]">{text}</div>
        // </div>       
        <div className="flex w-full lg:w-[21rem] mb-5">
            <div className="bg-[#DCDDE0] p-4 text-center w-[40%] rounded-tl-lg rounded-bl-lg text-[.7rem] sm:text-[.9rem] font-bold">
                {label}:
            </div>
            {isEditing ? (
                <div className="bg-white p-4 w-[60%] rounded-tr-lg rounded-br-lg text-[.7rem] sm:text-[.9rem]">
                    <input
                        autoFocus
                        type="text"
                        value={text}
                        // onChange={(e) => setEditedText(e.target.value)}
                    />
                </div>
            ) : (
                <div className="bg-white p-4 w-[60%] rounded-tr-lg rounded-br-lg text-[.7rem] sm:text-[.9rem]">
                    {text}
                {/* <button onClick={handleEditClick}>Edit</button> */}
                </div>
            )}
        </div>
    )
}

export default CustomLabelInput;