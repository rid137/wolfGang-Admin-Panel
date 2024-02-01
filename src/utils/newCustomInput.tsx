import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface NewCustomInputProps {
  field: {
    name: string;
    placeholder?: string;
    type?: string;
  };
  register: UseFormRegister<FieldValues>;
}

const NewCustomInput: React.FC<NewCustomInputProps> = ({ field, register }) => {
  const { name, placeholder, type } = field;

  return (
    <input
      type={type || 'text'}
      className="bg-[#E7E7E7] py-3 px-4 shadow-md rounded-xl mt-2"
      placeholder={placeholder}
      {...register(name)}
    />
  );
};

export default NewCustomInput