import React from "react";
import { useState } from "react";
import './Input.scss';



const minmax ={
    minValue: 0,
    maxValue: 100000000
}

const Input= () =>{
    const [price, setPrice] = useState(0);

    const handleOnChangeRange = (e) => {
        setPrice(e.target.value)      
    }

    const handleOnChangeNumber = (e) => {
        if (e.target.value > minmax.maxValue){
            return false
        }
        setPrice(e.target.value)        
    }


    return (
        <div className='input__block'>
        <input 
            type='number' 
            min={minmax.minValue} 
            max={minmax.maxValue} 
            onChange={(e) => handleOnChangeNumber(e)} 
            value={price} 
            className='input-number'
            placeholder=""
        />

        <input 
            type='range' 
            min={minmax.minValue} 
            max={minmax.maxValue} 
            onChange={(e) => handleOnChangeRange(e)} 
            value={price} 
            className='input-range'
        />       
        </div>
    )
}

export default Input;