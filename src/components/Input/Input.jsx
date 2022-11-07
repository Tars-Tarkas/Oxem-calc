import React from "react";
import { useState, useRef, useEffect } from "react";
import './Input.scss';



const minmax ={
    minValue: '0',
    maxValue: '1000'
}

const Input= () =>{
    const [price, setPrice] = useState('0');

    const maskInput = useRef(0);

    const handleChangeNumber = (e) =>{      
        const numbers = e.target.value.replace(/(\D)/g, '');        
        setPrice(numbers);        
        console.log('price ' + numbers);
    }
    const handleChangeRange = (e) =>{
        const numbers = e.target.value.replace(/\s/g, '');
        setPrice(numbers);        
        console.log('price ' + numbers);
    }

    useEffect(() => {                
        setPrice(maskInput.current.value.replace(/\B(?=(\d{3})+(?!\d))/g, " "))
      }, [price]);

     return (
        <div className='input__block'>
        <input 
            type='text' 
            maxLength={minmax.maxValue}                      
            onChange={(e) => handleChangeNumber(e)} 
            value={price} 
            ref={maskInput}
            className='input-number'            
        />
        {console.log(maskInput)}

        <input 
            type='range' 
            min={minmax.minValue}
            max={minmax.maxValue}
            onChange={(e) => handleChangeRange(e)} 
            value={price}
            className='input-range'
        />       
        </div>
    )
}

export default Input;