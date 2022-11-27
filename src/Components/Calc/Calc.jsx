import React, { useState } from 'react';
import InputNumberRange from '../InputNumberRange/InputNumberRange';
import './Cals.scss';

const minmaxCarCoast={
  minValue: 1000000,
  maxValue: 6000000
}

const minmaxInitial= {
  minValue: 10,
  maxValue: 60
}
const minmaxMonths={
  minValue: 1,
  maxValue: 60
}

const iconsInput={
  money: '₽',
  percent: '10%',
  month: 'мес.'
}

const titleInput = {
  car_coast: 'Стоимость автомобиля',
  initial: 'Первоначальный взнос',
  months: 'Срок лизинга'
}

const defaultValues={
  defaulCarCoast: 3300000,
  defaultInitial: 0,
  defaultMonth: 60
}

const urlPost = 'https://hookb.in/wNzyPR2WLJTqWVaqDVYZ';

const getTotalSum=()=> {
  let total_sum={
    'car_coast': defaultValues.defaulCarCoast,
    'initial_payment': defaultValues.defaultInitial,
    'initial_payment_percent': 0,
    'lease_term': defaultValues.defaultMonth,
    'total_sum': 0,
    'monthly_payment_from': 0,     
  }
  return total_sum;
}



function Calc() {

  const [totalSum, setTotalSum]=useState(getTotalSum);
  const [isLoading, setIsLoading]=useState(false);

  const carCoastValue=(value)=>{
    setTotalSum({...totalSum, 
                car_coast:value,
                total_sum:sum, 
                monthly_payment_from:monthPay, 
                initial_payment_percent:initialPercente})
  }
  
  const initialValue=(value)=>{
    setTotalSum({...totalSum, 
                initial_payment:value,
                monthly_payment_from:monthPay, 
                total_sum:sum,                 
                initial_payment_percent:initialPercente})
  }
  const monthsValue=(value)=>{
    setTotalSum({...totalSum, 
                lease_term: value,
                monthly_payment_from:monthPay,
                total_sum:sum,                 
                initial_payment_percent:initialPercente})
  } 

  const postData = async function postData(url, data) {
     const response = await fetch(url, {
      method: 'POST',     
      headers: {
        'Content-Type': 'application/json'        
      },     
      body: JSON.stringify(data) 
    });    
    return await response;
  }

  const initialPercente=Math.round((totalSum.initial_payment / totalSum.car_coast)*100);
  const monthPay=Math.round((totalSum.car_coast - totalSum.initial_payment) * ((0.035 * Math.pow((1 + 0.035), totalSum.lease_term)) / (Math.pow((1 + 0.035), totalSum.lease_term) - 1)));
  const sum=Math.round(initialPercente + totalSum.lease_term * monthPay)

  const maxPercent=totalSum.car_coast/100*minmaxInitial.maxValue;
  const minPercent=totalSum.car_coast/100*minmaxInitial.minValue;  

 defaultValues.defaultInitial=minPercent
 
  const numSeparator=num=>num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const handleSumbit=(e)=>{
    e.preventDefault();    
    setIsLoading(true)
    postData(urlPost, totalSum)
        .then((response) => response.json())
        .then(res => {            
          console.log(res); 
          setIsLoading(false)         
        })
        .catch(() => {         
          setIsLoading(true)
        })        
  }   

  return (
    <div className='container'>      
      <form onSubmit={e=>handleSumbit(e)}>
        <h1 className='calc-title'>Рассчитайте стоимость автомобиля в лизинг</h1>
        <div className='input-block'>
          <InputNumberRange inputValue={carCoastValue}                            
                            title={titleInput.car_coast}
                            min={minmaxCarCoast.minValue}
                            max={minmaxCarCoast.maxValue}
                            defaultValue={defaultValues.defaulCarCoast}
                            iconsInput={iconsInput.money}
                            isLoading={isLoading}                            
                            />

          <InputNumberRange inputValue={initialValue}                            
                            title={titleInput.initial}
                            min={minPercent}                       
                            max={maxPercent}    
                            defaultValue={defaultValues.defaultInitial}                    
                            iconsInput = {iconsInput.percent}
                            isLoading={isLoading}  
                            />

          <InputNumberRange inputValue={monthsValue}                            
                            min={minmaxMonths.minValue}
                            max={minmaxMonths.maxValue}
                            title={titleInput.months} 
                            defaultValue={defaultValues.defaultMonth}
                            iconsInput = {iconsInput.month}
                            isLoading={isLoading} 
                            />
        </div>
        <div className='calc-block'>
          <div className='calc-sum-contract'>
            <h4 className='calc-subtitle'>Сумма договора лизинга</h4>
            <span className='calc-sum-text'>{numSeparator(sum)}<span className='money'>{iconsInput.money}</span></span>
          </div>
          <div className='calc-sum-payment'>
            <h4 className='calc-subtitle'>Ежемесячный платеж от</h4>
            <span className='calc-sum-text'>{numSeparator(monthPay)}<span className='money'>{iconsInput.money}</span></span>
          </div>
          <div>
            <button className='calc-btn'>{!isLoading ? 'Оставить заявку' : ''}            
              <svg className={isLoading ? 'spinner' : 'spinner__deactiv'} viewBox="0 0 50 50"> 
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="2"></circle>
              </svg>
            </button>  
          </div>
        </div>
      </form>
    </div>
  );
}

export default Calc;
