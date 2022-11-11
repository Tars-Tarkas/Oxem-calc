import './App.scss';
import PriceInput from './components/PriceInput/PriceInput';
import ContributionInput from './components/СontributionInput/ContributionInput';
import TermInput from './components/TermInput/TermInput';

function App() {
  return (
    <div className='container'>
      <form>
        <div className='inputs'>
          <h1 className='title'>Рассчитайте стоимость автомобиля в лизинг</h1>
          <div className="inputs__block">        
            <PriceInput />
            <ContributionInput />
            <TermInput />
          </div>
        </div>
        <div className='total'>
          <div className='total__contract'>
            <span className='total__contract__title'>Сумма договора лизинга</span>
            <span className='total__contract__sum'>12121212</span>
          </div>
          <div className='total__payment'>
            <span className='total__payment__title'>Ежемесячный платеж от</span>
            <span className='total__contract__sum'>79879898</span>
          </div>
          <button className='btn'>Оставить заявку</button>      
        </div>
      </form>
    </div>
  );
}

export default App;
