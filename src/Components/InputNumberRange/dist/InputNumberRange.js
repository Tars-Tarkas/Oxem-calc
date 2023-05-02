"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var prop_types_1 = require("prop-types");
require("./InputNumberRange.scss");
var InputNumberRange = function (props) {
    var inputValue = props.inputValue, title = props.title, iconsInput = props.iconsInput, max = props.max, min = props.min, defaultValue = props.defaultValue, isLoading = props.isLoading;
    var _a = react_2.useState(defaultValue), value = _a[0], setValue = _a[1];
    var handleInputChange = function (e) {
        var value = Number(e.target.value.replace(/[\D\s\._\-]+/g, ""));
        setValue(Number(value));
        inputValue(value);
    };
    var localeString = function (value) {
        return value.toLocaleString("ru");
    };
    return (react_1["default"].createElement("div", { className: "input" },
        react_1["default"].createElement("h4", { className: "input-title" }, title),
        react_1["default"].createElement("div", { className: isLoading ? "input-item__deactiv" : "input-item" },
            react_1["default"].createElement("input", { type: "text", disabled: isLoading ? true : false, minLength: min, maxLength: Number(max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").length), onChange: handleInputChange, value: localeString(value), className: "input-number" }),
            react_1["default"].createElement("span", { className: iconsInput === "10%" ? "icon-percent" : "icon-money" }, iconsInput),
            react_1["default"].createElement("input", { type: "range", disabled: isLoading ? true : false, min: min, max: max, onChange: handleInputChange, value: value, className: "input-range" }))));
};
InputNumberRange.propTypes = {
    defaultValue: prop_types_1["default"].number.isRequired,
    iconsInput: prop_types_1["default"].string.isRequired,
    inputValue: prop_types_1["default"].func.isRequired,
    isLoading: prop_types_1["default"].bool.isRequired,
    max: prop_types_1["default"].number.isRequired,
    min: prop_types_1["default"].number.isRequired
};
InputNumberRange.defaultProps = {
    defaultValue: 1000,
    iconsInput: "₽",
    inputValue: undefined,
    isLoading: false,
    max: 6000000,
    min: 3300000
};
exports["default"] = InputNumberRange;
