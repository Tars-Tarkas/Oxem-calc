import './App.scss';
import React, { useState } from 'react';
import Calc from './Components/Calc/Calc';
// import InputNumberRange from './Components/InputNumberRange/InputNumberRange';

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
  percent: '13%'
}


const titleInput = {
  car_coast: 'Стоимость автомобиля',
  initial: 'Первоначальный взнос',
  months: 'Срок лизинга'
}

const getTotalSum=()=> {
  let total_sum={
    car_coast: minmaxCarCoast.minValue,
    initial_payment: minmaxinitial.minValue,
    initial_payment_percent: 0,
    lease_term: minmaxmonths.minValue,
    total_sum: 0,
    monthly_payment_from: minmaxmonths.minValue,     
  }
  return total_sum;
}

function App() {

  const [totalSum, setTotalSum]=useState(getTotalSum)

  const carCoastValue=()=>{
    setTotalSum({...totalSum})
  }
  const initialValue=()=>{
    setTotalSum({...totalSum})
  }
  const monthsValue=()=>{
    setTotalSum({...totalSum})
  }


  console.log(totalSum)
 
  return (
    <div className='container'>
      <Calc />
      {/* <InputNumberRange carCoastValue={carCoastValue}
                        title={titleInput.car_coast}
                        MinMax={minmaxCarCoast} 
                        iconsInput = {iconsInput.money} />

      <InputNumberRange carCoastValue={initialValue}
                        title={titleInput.initial}
                        MinMax={minmaxinitial} 
                        iconsInput = {iconsInput.percent}/>

      <InputNumberRange carCoastValue={monthsValue}
                        title={titleInput.months}
                        MinMax={minmaxmonths}/> */}
    </div>
  );
}

export default App;
