import React from "react";
import { useState } from "react";
import './InputNumberRange.scss'


const InputNumberRange=({titlecomponent, inputValue, title, iconsInput, max, min, maxRange, minRange, defaultValue})=>{
    const [value, setValue] = useState(defaultValue)

    const handleInputChange=(e)=>{        
        const number = e.target.value.replace(/\s/g, "")
        setValue(number);
        inputValue(number)
    }   
    
    let maxInput;
    let minInput;
    
    switch(titlecomponent){
        case 'car_coast':
            maxInput = max
            minInput = min
        break
        case 'initial':
            maxInput = maxRange
            minInput = minRange
        break
        case 'monthPay':
            maxInput = max
            minInput = min
        break
        default: 
        maxInput = max
        minInput = min       
    }

   
    
    return (
        <div className='input'>
            <h4 className="input-title">{title}</h4>
            <div className="input-item">
                <input 
                    type='text'                 
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }}}              
                    minLength={minInput}      
                    maxLength={maxInput}
                    onChange={(e) => handleInputChange(e)}
                    value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}                                                      
                    // value={value}  
                    className='input-number'
                />     
                <span className={!null || !iconsInput.percent ? 'icon-money' : 'icon-percent'}>{iconsInput}</span>       
                  
                <input 
                    type='range' 
                    min={minInput}
                    max={maxInput}
                    onChange={(e) => handleInputChange(e)}                     
                    value={value}
                    className='input-range'
                />
            </div>
        </div>
    )
    

}


InputNumberRange.displayName = {};

export default InputNumberRange;