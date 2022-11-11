import React from "react";
import { useState } from "react";
import './TermInput.scss';

const minmaxTerm ={
    minValue: 0,
    maxValue: 60
}

const TermInput = () =>{
    const [term, setTerm] = useState('0');
    
    const handleChange = (e) =>{
        const numbers = e.target.value.replace(/(\D)/g, '');        
        setTerm(numbers);        
    }

    return (
        <div className='input__block'>        
            <span className="term__title">Срок лизинга</span>
            <div className="term__inputs">
                <input 
                    type='text' 
                    maxLength={String(minmaxTerm.maxValue).length}
                    onChange={(e) => handleChange(e)} 
                    value={term.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}           
                    className='term__input-number'            
                />
                <span className="term__input-number__icon">мес.</span>


                <input 
                    type='range' 
                    min={minmaxTerm.minValue}
                    max={minmaxTerm.maxValue}
                    onChange={(e) => handleChange(e)} 
                    value={term}
                    className='term__input-range'
                />   
            </div>    
        </div>
    )
}

export default TermInput;