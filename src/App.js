import './App.scss';
import { useState } from 'react';

const minmaxprice = {
  minValue: 1000000,
  maxValue: 6000000
}
const minmaxinitial= {
  minValue: 10,
  maxValue: 60
}
const minmaxmonths = {
  minValue: 1,
  maxValue: 60
}



function App() {

  const getTotalSum = () => {
    let total_sum = {
      car_coast: minmaxprice.minValue,
      initial_payment: 0,
      initial_payment_percent: minmaxinitial.minValue,
      lease_term: minmaxmonths.minValue,
      total_sum: 0,
      monthly_payment_from: 0
    }
    return total_sum;
  }


  const [totalSum, setTotalSum] = useState(getTotalSum);

  const handleInputChange = (prop, e) => {  
    const numbers = e.target.value.replace(/(\D)/g, '');     
    setTotalSum({ ...totalSum, [prop]:numbers, total_sum:sum, monthly_payment_from:monthPay });    
  }

  const initialPercente = (totalSum.initial_payment/totalSum.car_coast)*100;
  const monthPay = Math.ceil((totalSum.car_coast - totalSum.initial_payment) * ((0.035 * Math.pow((1 + 0.035), totalSum.lease_term)) / (Math.pow((1 + 0.035), totalSum.lease_term) - 1)));
  const sum = Math.ceil(initialPercente + totalSum.lease_term * monthPay);
  
  const formChange = () =>{    
  }

  // console.log(initialPercente);
  // console.log(totalSum.initial_payment_percent);

  return (
    <div className='container'>
      <form onChange={formChange}>        
        <h1 className='title'>Рассчитайте стоимость автомобиля в лизинг</h1>
        <div className='inputs__block'>  
          <div className='input__item'>        
            <h4 className="calc-subtitle">Стоимость автомобиля</h4>
            <div className='input__inner'>
                <input 
                    type='text' 
                    maxLength={String(minmaxprice.maxValue).length+1}
                    onChange={(e) => handleInputChange("car_coast", e)} 
                    value={totalSum.car_coast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}           
                    className='input__number-price'
                />     
                <span className='price__input-number__icon'>₽</span>       

                <input 
                    type='range' 
                    min={minmaxprice.minValue}
                    max={minmaxprice.maxValue}
                    onChange={(e) => handleInputChange("car_coast", e)} 
                    value={totalSum.car_coast}
                    className='input__range-price'
                />
             </div>  
            </div>  

            <div className='input__item'>       
              <h4 className="calc-subtitle">Первоначальный взнос</h4>
              <div className='input__inner'>
                  <input 
                      type='text' 
                      minLength={minmaxinitial.minValue}
                      maxLength={String(totalSum.car_coast).length+1}
                      onChange={(e) => handleInputChange("initial_payment", e)} 
                      value={totalSum.initial_payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}           
                      className='input__number-initial-payment'            
                  />   
                  <span className='contribution__input-number__icon'>13%</span>

                  <input 
                      type='range' 
                      min={minmaxinitial.minValue}
                      max={totalSum.car_coast}
                      onChange={(e) => handleInputChange("initial_payment", e)} 
                      value={totalSum.initial_payment}
                      className='input__range-initial-payment'
                  />
              </div>    
            </div>

            <div className='input__item'>        
              <h4 className="calc-subtitle">Срок лизинга</h4>
              <div className='input__inner'>
                  <input 
                      type='text' 
                      maxLength={String(minmaxmonths.maxValue).length}
                      onChange={(e) => handleInputChange('lease_term', e)} 
                      value={totalSum.lease_term.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}           
                      className='input__number-lease-term'            
                  />                    
                  <span className="term__input-number__icon">мес.</span>

                  <input 
                      type='range' 
                      min={minmaxmonths.minValue}
                      max={minmaxmonths.maxValue}
                      onChange={(e) => handleInputChange('lease_term', e)} 
                      value={totalSum.lease_term}
                      className='input__range-lease-term'
                  />   
              </div>           
            </div>   
          
        </div>
        <div className='calc__sum'>
          <div className='calc__sum__contract'>
            <h4 className='calc-subtitle'>Сумма договора лизинга</h4>
            <span className='calc__text'>{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
          </div>
          <div className='calc__sum__payment'>
            <h4 className='calc-subtitle'>Ежемесячный платеж от</h4>
            <span className='calc__text'>{monthPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
          </div>
          <button className='calc__btn'>Оставить заявку</button>      
        </div>
      </form>
    </div>
  );
}

export default App;
