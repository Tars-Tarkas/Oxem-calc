import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./InputNumberRange.scss";

interface IInputProps {
  inputValue: (num: number) => void;
  title: string;
  iconsInput: string;
  max: number;
  min: number;
  defaultValue: number;
  isLoading: boolean;
}

const InputNumberRange: React.FC<IInputProps> = (props): JSX.Element => {
  const { inputValue, title, iconsInput, max, min, defaultValue, isLoading } =
    props;

  const [value, setValue] = useState(defaultValue);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.target.value.replace(/[\D\s\._\-]+/g, ""));
    setValue(Number(value));
    inputValue(value);
  };

  const localeString = (value: number) => {
    return value.toLocaleString("ru");
  };

  return (
    <div className="input">
      <h4 className="input-title">{title}</h4>
      <div className={isLoading ? "input-item__deactiv" : "input-item"}>
        <input
          type="text"
          disabled={isLoading ? true : false}
          minLength={min}
          maxLength={Number(
            max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").length
          )}
          onChange={handleInputChange}
          value={localeString(value)}
          className="input-number"
        />
        <span className={iconsInput === "10%" ? "icon-percent" : "icon-money"}>
          {iconsInput}
        </span>
        <input
          type="range"
          disabled={isLoading ? true : false}
          min={min}
          max={max}
          onChange={handleInputChange}
          value={value}
          className="input-range"
        />
      </div>
    </div>
  );
};

InputNumberRange.propTypes = {
  defaultValue: PropTypes.number.isRequired,
  iconsInput: PropTypes.string.isRequired,
  inputValue: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
};

InputNumberRange.defaultProps = {
  defaultValue: 1000,
  iconsInput: "₽",
  inputValue: undefined,
  isLoading: false,
  max: 6000000,
  min: 3300000,
};

export default InputNumberRange;
