import React from "react";
import { useState } from "react";
import './PriceInput.scss';



const minmax ={
    minValue: 0,
    maxValue: 100000000
}

const PriceInput= () =>{
    const [price, setPrice] = useState('0');
    
    const handleChange = (e) =>{
        const numbers = e.target.value.replace(/(\D)/g, '');        
        setPrice(numbers);        
    }
    
    return (
        <div className='input__block'>        
            <span className="price__title">Стоимость автомобиля</span>
            <div className="price__inputs">
                <input 
                    type='text' 
                    maxLength={String(minmax.maxValue).length+1}
                    onChange={(e) => handleChange(e)} 
                    value={price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}           
                    className='price__input-number'
                />     
                <span className='price__input-number__icon'>₽</span>       

                <input 
                    type='range' 
                    min={minmax.minValue}
                    max={minmax.maxValue}
                    onChange={(e) => handleChange(e)} 
                    value={price}
                    className='input-range__price'
                />
            </div>    
        </div>
    )
}

export default PriceInput;