import React from "react";
import { useState } from "react";
import './InputNumberRange.scss'



const InputNumberRange=({title, MinMax, iconsInput}, carCoastValue)=>{
    const [value, setValue] = useState('0')

    const handleInputChange=(e)=>{
        carCoastValue(value);
        setValue(e.target.value.replace(/\s/g, ""));
    }    
    
    return (
        <div className='input'>
            <h4 className="input-title">{title}</h4>
            <div className="input-block">
                <input 
                    type='text'                 
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }}}                    
                    maxLength={MinMax.maxValue.length+1}
                    onChange={(e) => handleInputChange(e)}
                    value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}                    
                    className='input-number'
                />     
                <span className={!null || !iconsInput.percent ? 'icon-money' : 'icon-percent'}>{iconsInput}</span>       
                  
                <input 
                    type='range' 
                    min={MinMax.minValue}
                    max={MinMax.maxValue}
                    onChange={(e) => handleInputChange(e)}                     
                    value={value}
                    className='input-range'
                />
            </div>
        </div>
    )
    InputNumberRange.displayName = {title};

}



export default InputNumberRange;