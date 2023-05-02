import React, { useState } from "react";
import InputNumberRange from "../InputNumberRange/InputNumberRange";
import "./Cals.scss";

interface IInput {
  minValue: number;
  maxValue: number;
  icon: string;
  title: string;
  defaultValue: number;
}

interface ITotalSum {
  car_coast: number;
  initial_payment: number;
  initial_payment_percent: number;
  lease_term: number;
  total_sum: number;
  monthly_payment_from: number;
}

const carCoast: IInput = {
  minValue: 100000,
  maxValue: 6000000,
  icon: "₽",
  title: "Стоимость автомобиля",
  defaultValue: 3300000,
};
const initial: IInput = {
  minValue: 10,
  maxValue: 60,
  icon: "10%",
  title: "Первоначальный взнос",
  defaultValue: 0,
};
const months: IInput = {
  minValue: 1,
  maxValue: 60,
  icon: "мес.",
  title: "Срок лизинга",
  defaultValue: 60,
};

const urlPost = "https://hookb.in/wNzyPR2WLJTqWVaqDVYZ";

const getTotalSum = () => {
  let total_sum: ITotalSum = {
    car_coast: carCoast.defaultValue,
    initial_payment: initial.defaultValue,
    initial_payment_percent: 0,
    lease_term: months.defaultValue,
    total_sum: 0,
    monthly_payment_from: 0,
  };
  return total_sum;
};

const Calc = () => {
  const [totalSum, setTotalSum] = useState(getTotalSum);
  const [isLoading, setIsLoading] = useState(false);

  const carCoastValue = (value: number) => {
    setTotalSum({
      ...totalSum,
      car_coast: value,
      total_sum: sum,
      monthly_payment_from: monthPay,
      initial_payment_percent: initialPercente,
    });
  };

  const initialValue = (value: number) => {
    setTotalSum({
      ...totalSum,
      initial_payment: value,
      monthly_payment_from: monthPay,
      total_sum: sum,
      initial_payment_percent: initialPercente,
    });
  };

  const monthsValue = (value: number) => {
    setTotalSum({
      ...totalSum,
      lease_term: value,
      monthly_payment_from: monthPay,
      total_sum: sum,
      initial_payment_percent: initialPercente,
    });
  };

  const postData = async function postData(url: string, data: ITotalSum) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response;
  };

  const initialPercente = Math.round(
    (totalSum.initial_payment / totalSum.car_coast) * 100
  );

  const monthPay = Math.round(
    (totalSum.car_coast - totalSum.initial_payment) *
      ((0.035 * Math.pow(1 + 0.035, totalSum.lease_term)) /
        (Math.pow(1 + 0.035, totalSum.lease_term) - 1))
  );

  const sum = Math.round(initialPercente + totalSum.lease_term * monthPay);

  const maxPercent = (totalSum.car_coast / 100) * initial.maxValue;
  const minPercent = (totalSum.car_coast / 100) * initial.minValue;

  initial.defaultValue = minPercent;

  const handleSumbit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postData(urlPost, totalSum)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(true);
      });
  };

  const localeString = (value: number) => {
    const options: Intl.NumberFormatOptions = {
      minimumFractionDigits: 0,
    };
    return value.toLocaleString("ru", options);
  };

  return (
    <div className="container">
      <form onSubmit={(e) => handleSumbit(e)}>
        <h1 className="calc-title">
          Рассчитайте стоимость автомобиля в лизинг
        </h1>
        <div className="input-block">
          <InputNumberRange
            inputValue={carCoastValue}
            title={carCoast.title}
            min={carCoast.minValue}
            max={carCoast.maxValue}
            defaultValue={carCoast.defaultValue}
            iconsInput={carCoast.icon}
            isLoading={isLoading}
          />

          <InputNumberRange
            inputValue={initialValue}
            title={initial.title}
            min={minPercent}
            max={maxPercent}
            defaultValue={initial.defaultValue}
            iconsInput={initial.icon}
            isLoading={isLoading}
          />

          <InputNumberRange
            inputValue={monthsValue}
            min={months.minValue}
            max={months.maxValue}
            title={months.title}
            defaultValue={months.defaultValue}
            iconsInput={months.icon}
            isLoading={isLoading}
          />
        </div>
        <div className="calc-block">
          <div className="calc-sum-contract">
            <h4 className="calc-subtitle">Сумма договора лизинга</h4>
            <span className="calc-sum-text">
              {localeString(sum)}
              <span className="money">{carCoast.icon}</span>
            </span>
          </div>
          <div className="calc-sum-payment">
            <h4 className="calc-subtitle">Ежемесячный платеж от</h4>
            <span className="calc-sum-text">
              {localeString(monthPay)}
              <span className="money">{carCoast.icon}</span>
            </span>
          </div>
          <div>
            <button className="calc-btn">
              {!isLoading ? "Оставить заявку" : ""}
              <svg
                className={isLoading ? "spinner" : "spinner__deactiv"}
                viewBox="0 0 50 50"
              >
                <circle
                  className="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="2"
                ></circle>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Calc;
