import React, { useState } from 'react';
import InputNumberRange from '../InputNumberRange/InputNumberRange';
import './Cals.scss';

const minmaxCarCoast={
  minValue: '1000000',
  maxValue: '6000000'
}

const minmaxinitial= {
  minValue: '10',
  maxValue: '60'
}
const minmaxmonths={
  minValue: '1',
  maxValue: '60'
}

const iconsInput={
  money: '₽',
  percent: '13%',
  month: 'мес.'
}

const titleInput = {
  car_coast: 'Стоимость автомобиля',
  initial: 'Первоначальный взнос',
  months: 'Срок лизинга'
}

const defaultValues={
  defaulCarCoast: '3300000',
  defaultInitial: '0',
  defaultMonth: '60'
}

const getTotalSum=()=> {
  let total_sum={
    car_coast: defaultValues.defaulCarCoast,
    initial_payment: defaultValues.defaultInitial,
    initial_payment_percent: 0,
    lease_term: defaultValues.defaultMonth,
    total_sum: 0,
    monthly_payment_from: 0,     
  }
  return total_sum;
}

function Calc() {

  const [totalSum, setTotalSum]=useState(getTotalSum)

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

  const initialPercente = Math.round((totalSum.initial_payment / totalSum.car_coast)*100);
  const monthPay = Math.round((totalSum.car_coast - totalSum.initial_payment) * ((0.035 * Math.pow((1 + 0.035), totalSum.lease_term)) / (Math.pow((1 + 0.035), totalSum.lease_term) - 1)));
  const sum = Math.round(initialPercente + totalSum.lease_term * monthPay)

  const maxPercent = totalSum.car_coast/100*minmaxinitial.maxValue;
  const minPercent = totalSum.car_coast/100*minmaxinitial.minValue;  

 defaultValues.defaultInitial = minPercent.toString()

  const numSeparator = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  console.log(totalSum);

  return (
    <div className='container'>      
      <form>
        <h1 className='calc-title'>Рассчитайте стоимость автомобиля в лизинг</h1>
        <div className='input-block'>
          <InputNumberRange inputValue={carCoastValue}
                            titlecomponent='car_coast'
                            title={titleInput.car_coast}
                            min={minmaxCarCoast.minValue}
                            max={minmaxCarCoast.maxValue}
                            defaultValue={defaultValues.defaulCarCoast}
                            iconsInput = {iconsInput.money} 
                            />

          <InputNumberRange inputValue={initialValue}
                            titlecomponent='initial'
                            title={titleInput.initial}
                            minRange={minPercent}                       
                            maxRange={maxPercent}    
                            defaultValue={defaultValues.defaultInitial}                    
                            iconsInput = {iconsInput.percent} 
                            />

          <InputNumberRange inputValue={monthsValue}
                            titlecomponent='monthPay'
                            min={minmaxmonths.minValue}
                            max={minmaxmonths.maxValue}
                            title={titleInput.months} 
                            defaultValue={defaultValues.defaultMonth}
                            iconsInput = {iconsInput.month}
                            />
        </div>
        <div className='calc-block'>
          <div className='calc-sum-contract'>
            <h4 className='calc-subtitle'>Сумма договора лизинга</h4>
            <span className='calc-sum-text'>{numSeparator(sum)}</span>
          </div>
          <div className='calc-sum-payment'>
            <h4 className='calc-subtitle'>Ежемесячный платеж от</h4>
            <span className='calc-sum-text'>{numSeparator(monthPay)}</span>
          </div>
          <div>
            <button className='calc-btn'>Оставить заявку</button>  
          </div>
        </div>
      </form>
    </div>
  );
}

export default Calc;
