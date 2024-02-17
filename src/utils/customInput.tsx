interface CustomInputProps {
    placeholder: string;
    disabled?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({placeholder, disabled}) => {
    return(
        <input type="text" disabled={disabled} className="bg-white py-3 px-4 shadow-md rounded-xl mt-2" placeholder={placeholder} />
    )
}

export default CustomInput;