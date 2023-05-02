# Фронтенд-разработчик — задание от Oxem Studio

## Для запуска:

```
git clone https://github.com/Tars-Tarkas/Oxem-calc.git
cd oxem
npm install
npm start
```

При выполнении задания приветствуется использование:

- React/Vue
- SASS/SCSS
- Webpack

Задание: сверстать калькулятор лизинга авто
Макеты

В Figma отражены адаптивные версии и все состояния элементов при наведении, клике и т.д.
https://www.figma.com/community/file/1159127080169628640
Для работы с макетами необходимо создать их копию: http://joxi.ru/vAWnYv5cR1WK52

## Общие требования:

1. Теги Title и Description должны располагаться сразу после открытия тега head. Значения можно прописать любые.
2. Вынести все стили, которые используются в макете в отдельные CSS-файлы.
3. Не допускать конфликта CSS-стилей.
4. Добиться кроссбраузерности:
   - Google Chrome
   - Android
   - Mobile Safari
   - Яндекс.Браузер
   - Firefox
   - Opera.
5. Пройти валидацию https://validator.w3.org/. Это не критичное требование, но элементарных ошибок верстки не должно быть (например, незакрытые теги, пропуск обязательных атрибутов и т.п.).

## Брейкпоинты:

- 320-767 (макет на 320px)
- 768-1119px (макет на 768px)
- 1120-1439px (макет на 1120px)
- 1440+ (макет на 1440px)

## Требования к калькулятору

1. Калькулятор должен инициализироваться с указанными значениями по умолчанию;
2. В каждое поле можно ввести значение как с клавиатуры, так и с помощью ползунка;
3. При выборе значения с помощью ползунка, все числа должны пересчитываться динамически в процессе движения ползунка, а не только после его остановки;
4. У каждого поля есть максимальное и минимальное значение — ползунок должен ограничивать пользователя в выборе данных, а при вводе некорректного значения с клавиатуры, оно должно сбрасываться к ближайшему корректному числу (максимуму или минимуму).
   - Для поля “Стоимость автомобиля” границы: 1 млн.руб. — 6 млн.руб.;
   - Для поля “Первоначальный взнос” границы: 10% - 60% (здесь ввод происходит именно в процентах от стоимости, а не рублях; рубли - результат расчета от введенной стоимости автомобиля);
   - Для поля “Срок лизинга” границы: 1 - 60 месяцев;
5. Формулы расчета для полей:

   - Процентная ставка = 3.5%
   - Для поля “Первоначальный взнос”: `Первоначальный взнос (в процентах) * Стоимость автомобиля `

   - Для поля “Сумма договора лизинга”: `Первоначальный взнос + Срок кредита в месяцах * Ежемесячный платеж `
   - Для поля “Ежемесячный платеж от”:

```
(Стоимость автомобиля - Первоначальный взнос) * ((Процентная ставка * (1 + Процентная ставка)^Срок кредита в месяцах) / ((1 + Процентная ставка)^Срок кредита в месяцах - 1))
const monthPay = (price - initial) * ((0.035 * Math.pow((1 + 0.035), months)) / (Math.pow((1 + 0.035), months) - 1));
```

6. По кнопке “Оформить заявку” должен формироваться запрос, который отправляет все данные калькулятора на бэкенд, например, чтобы потом backend мог использовать эти данные для передачи в CRM-систему.
   URL для запроса: https://hookb.in/eK160jgYJ6UlaRPldJ1P
   Метод запроса: POST
   Заголовок Content-Type: application/json
   Все данные с формы передавать в JSON-формате в теле запроса.
   Пример тела запроса:

```
{
  "car_coast": 4000000,
  "initail_payment": 400000,
  "initail_payment_percent": 10,
  "lease_term": 24,
  "total_sum": 5000000,
  "monthly_payment_from": 30000
}
API всегда возвращает:
{
  "success": true
}
```

В момент клика по кнопке кнопка должна блокироваться от возможности повторной отправки данных на время выполнения запроса к бэкенду, а внутри кнопки отображаться прелоадер. Инпуты и слайдеры на время отправки должны блокироваться.
