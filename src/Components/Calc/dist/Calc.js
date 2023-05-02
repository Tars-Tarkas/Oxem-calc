"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var InputNumberRange_1 = require("../InputNumberRange/InputNumberRange");
require("./Cals.scss");
var carCoast = {
    minValue: 100000,
    maxValue: 6000000,
    icon: "₽",
    title: "Стоимость автомобиля",
    defaultValue: 3300000
};
var initial = {
    minValue: 10,
    maxValue: 60,
    icon: "10%",
    title: "Первоначальный взнос",
    defaultValue: 0
};
var months = {
    minValue: 1,
    maxValue: 60,
    icon: "мес.",
    title: "Срок лизинга",
    defaultValue: 60
};
var urlPost = "https://hookb.in/wNzyPR2WLJTqWVaqDVYZ";
var getTotalSum = function () {
    var total_sum = {
        car_coast: carCoast.defaultValue,
        initial_payment: initial.defaultValue,
        initial_payment_percent: 0,
        lease_term: months.defaultValue,
        total_sum: 0,
        monthly_payment_from: 0
    };
    return total_sum;
};
var Calc = function () {
    var _a = react_1.useState(getTotalSum), totalSum = _a[0], setTotalSum = _a[1];
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var carCoastValue = function (value) {
        setTotalSum(__assign(__assign({}, totalSum), { car_coast: value, total_sum: sum, monthly_payment_from: monthPay, initial_payment_percent: initialPercente }));
    };
    var initialValue = function (value) {
        setTotalSum(__assign(__assign({}, totalSum), { initial_payment: value, monthly_payment_from: monthPay, total_sum: sum, initial_payment_percent: initialPercente }));
    };
    var monthsValue = function (value) {
        setTotalSum(__assign(__assign({}, totalSum), { lease_term: value, monthly_payment_from: monthPay, total_sum: sum, initial_payment_percent: initialPercente }));
    };
    var postData = function postData(url, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var initialPercente = Math.round((totalSum.initial_payment / totalSum.car_coast) * 100);
    var monthPay = Math.round((totalSum.car_coast - totalSum.initial_payment) *
        ((0.035 * Math.pow(1 + 0.035, totalSum.lease_term)) /
            (Math.pow(1 + 0.035, totalSum.lease_term) - 1)));
    var sum = Math.round(initialPercente + totalSum.lease_term * monthPay);
    var maxPercent = (totalSum.car_coast / 100) * initial.maxValue;
    var minPercent = (totalSum.car_coast / 100) * initial.minValue;
    initial.defaultValue = minPercent;
    var handleSumbit = function (e) {
        e.preventDefault();
        setIsLoading(true);
        postData(urlPost, totalSum)
            .then(function (response) { return response.json(); })
            .then(function (res) {
            console.log(res);
            setIsLoading(false);
        })["catch"](function () {
            setIsLoading(true);
        });
    };
    var localeString = function (value) {
        var options = {
            minimumFractionDigits: 0
        };
        return value.toLocaleString("ru", options);
    };
    return (react_1["default"].createElement("div", { className: "container" },
        react_1["default"].createElement("form", { onSubmit: function (e) { return handleSumbit(e); } },
            react_1["default"].createElement("h1", { className: "calc-title" }, "\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0439\u0442\u0435 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F \u0432 \u043B\u0438\u0437\u0438\u043D\u0433"),
            react_1["default"].createElement("div", { className: "input-block" },
                react_1["default"].createElement(InputNumberRange_1["default"], { inputValue: carCoastValue, title: carCoast.title, min: carCoast.minValue, max: carCoast.maxValue, defaultValue: carCoast.defaultValue, iconsInput: carCoast.icon, isLoading: isLoading }),
                react_1["default"].createElement(InputNumberRange_1["default"], { inputValue: initialValue, title: initial.title, min: minPercent, max: maxPercent, defaultValue: initial.defaultValue, iconsInput: initial.icon, isLoading: isLoading }),
                react_1["default"].createElement(InputNumberRange_1["default"], { inputValue: monthsValue, min: months.minValue, max: months.maxValue, title: months.title, defaultValue: months.defaultValue, iconsInput: months.icon, isLoading: isLoading })),
            react_1["default"].createElement("div", { className: "calc-block" },
                react_1["default"].createElement("div", { className: "calc-sum-contract" },
                    react_1["default"].createElement("h4", { className: "calc-subtitle" }, "\u0421\u0443\u043C\u043C\u0430 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430 \u043B\u0438\u0437\u0438\u043D\u0433\u0430"),
                    react_1["default"].createElement("span", { className: "calc-sum-text" },
                        localeString(sum),
                        react_1["default"].createElement("span", { className: "money" }, carCoast.icon))),
                react_1["default"].createElement("div", { className: "calc-sum-payment" },
                    react_1["default"].createElement("h4", { className: "calc-subtitle" }, "\u0415\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043F\u043B\u0430\u0442\u0435\u0436 \u043E\u0442"),
                    react_1["default"].createElement("span", { className: "calc-sum-text" },
                        localeString(monthPay),
                        react_1["default"].createElement("span", { className: "money" }, carCoast.icon))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("button", { className: "calc-btn" },
                        !isLoading ? "Оставить заявку" : "",
                        react_1["default"].createElement("svg", { className: isLoading ? "spinner" : "spinner__deactiv", viewBox: "0 0 50 50" },
                            react_1["default"].createElement("circle", { className: "path", cx: "25", cy: "25", r: "20", fill: "none", strokeWidth: "2" }))))))));
};
exports["default"] = Calc;
