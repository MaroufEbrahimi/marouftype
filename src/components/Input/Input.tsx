import React from "react";

interface InputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input = ({
  inputValue,
  setInputValue,
  isStarted,
  setIsStarted,
}: InputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isStarted && e.target.value.length > 0) {
      setIsStarted(true);
    }
  };

  return (
    <div className="main_input">
      <div className="input_container">
        <input
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Input;
