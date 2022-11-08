import React from "react";
import { useState } from "react";
import './Input.scss';



const minmax ={
    minValue: '0',
    maxValue: '10000000'
}

const Input= () =>{
    const [price, setPrice] = useState('0');
    
    const handleChange = (e) =>{
        const numbers = e.target.value.replace(/(\D)/g, '');        
        setPrice(numbers);        
    }

    return (
        <div className='input__block'>
        <input 
            type='text' 
            maxLength={Number(minmax.maxValue)}
            onChange={(e) => handleChange(e)} 
            value={price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}           
            className='input-number'            
        />      

        <input 
            type='range' 
            min={minmax.minValue}
            max={minmax.maxValue}
            onChange={(e) => handleChange(e)} 
            value={price}
            className='input-range'
        />       
        </div>
    )
}

export default Input;