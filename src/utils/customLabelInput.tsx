import React, { useState } from 'react';

interface LabelIputProps {
  label: string
  text: string
  isEditing?: boolean
  disabled?: boolean
  autoFocus?: boolean
  onChange?: (newValue: string) => void;
};

const CustomLabelInput: React.FC<LabelIputProps> = ({label, text, isEditing, disabled, autoFocus, onChange}) => {

    const [editedText, setEditedText] = useState(text);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(e.target.value);
        onChange && onChange(e.target.value);
    };

    return(
        // <div className="flex w-full lg:w-[21rem] mb-5 ">
        //     <div className="bg-[#DCDDE0] p-4  text-center w-[40%] rounded-tl-lg rounded-bl-lg text-[.7rem] sm:text-[.9rem] font-bold">{label}: </div>
        //     <div className="bg-white p-4   w-[60%] rounded-tr-lg rounded-br-lg text-[.7rem] sm:text-[.9rem]">{text}</div>
        // </div>       
        <div className="flex w-full lg:w-[rem] mb-5">
            <div className="bg-[#DCDDE0] p-4 text-center w-[40%] rounded-tl-lg rounded-bl-lg text-[.7rem] sm:text-[.9rem] font-bold">
                {label}:
            </div>
            {isEditing ? (
                <div className="bg-white p-4 w-[60%] rounded-tr-lg rounded-br-lg text-[.7rem] sm:text-[.9rem]">
                    <input
                        autoFocus={autoFocus}
                        type="text"
                        value={editedText}
                        onChange={handleTextChange}
                        disabled={disabled && disabled}
                        className='lg:w-[8rem] focus:outline-primary'
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