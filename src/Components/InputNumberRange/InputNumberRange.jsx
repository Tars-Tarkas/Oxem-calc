import React from "react";
import { useState } from "react";
import './InputNumberRange.scss'


const InputNumberRange=({inputValue, title, iconsInput, max, min, defaultValue, isLoading})=>{
    const [value, setValue] = useState(defaultValue)

    const handleInputChange=(e)=>{        
        const number = e.target.value.replace(/\s/g, "")
        setValue(parseInt(number));
        inputValue(parseInt(number)) 
    }           
    const numSeparator = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (
        <div className='input'>
            <h4 className="input-title">{title}</h4>
            <div className={isLoading 
                                ? 'input-item__deactiv' 
                                : 'input-item'}>
                <input 
                    type='text' 
                    disabled={isLoading ? 'disabled' : ''}                                                       
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }}}              
                    minLength={numSeparator(min).length}
                    maxLength={numSeparator(max).length}
                    onChange={(e) => handleInputChange(e)}
                    value={numSeparator(value)}                       
                    className='input-number'
                />     
                <span className={(iconsInput ==='10%') 
                                    ? 'icon-percent' 
                                    : 'icon-money'}>
                                    {iconsInput}
                </span>
                <input 
                    type='range' 
                    disabled={isLoading ? 'disabled' : ''}  
                    min={min}
                    max={max}
                    onChange={(e) => handleInputChange(e)}                     
                    value={value}
                    className='input-range'
                />
            </div>
        </div>       
    )  
}




export default InputNumberRange;