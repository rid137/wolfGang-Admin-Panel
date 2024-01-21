interface CustomInputProps {
    placeholder: string;
}

const CustomInput: React.FC<CustomInputProps> = ({placeholder}) => {
    return(
        <input type="text" className="bg-white py-3 px-4 shadow-md rounded-xl mt-2" placeholder={placeholder} />
    )
}

export default CustomInput;