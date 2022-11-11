import React from "react";
import { useState } from "react";
import './ContributionInput.scss';

const minmaxContribution ={
    minValue: 0,
    maxValue: 1000
}

const ContributionInput = () =>{
    const [contribution, setContribution] = useState('0');
    
    const handleChange = (e) =>{
        const numbers = e.target.value.replace(/(\D)/g, '');        
        setContribution(numbers);        
    }

    return (
        <div className='input__block'>       
            <span className="contribution__title">Первоначальный взнос</span>
            <div className="contribution__inputs">
                <input 
                    type='text' 
                    maxLength={String(minmaxContribution.maxValue).length}
                    onChange={(e) => handleChange(e)} 
                    value={contribution.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}           
                    className='contribution__input-number'            
                />   
                <span className='contribution__input-number__icon'>13%</span>


                <input 
                    type='range' 
                    min={minmaxContribution.minValue}
                    max={minmaxContribution.maxValue}
                    onChange={(e) => handleChange(e)} 
                    value={contribution}
                    className='input-range__contribution'
                />
            </div>    
        </div>
    )
}

export default ContributionInput;