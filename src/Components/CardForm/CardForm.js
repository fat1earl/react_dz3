import React from "react";
import "./CardForm.css";

function validateHasOnlyNumbers(value) {
  if (value.split("").find((x) => x < "0" || x > "9")) {
    return ["Должны быть одни цифры"];
  }

  return [];
}

function validateCardNumber(number) {
  const errors = [];

  if (number.length !== 16) {
    errors.push("Длина должна быть 16 символов.");
  }

  return [...errors, ...validateHasOnlyNumbers(number)];
}

function validateCardHolder(cardHolder) {
  const errors = [];

  if (!cardHolder.match(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/)) {
    errors.push("Введите корректное имя и фамилию указанное на карте");
  }

  return [...errors];
}

function validateValidToMonth(validToMonth) {
  const errors = [];

  if (validToMonth.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
    errors.push("Введите корректный месяц");
  }

  return [...errors, ...validateHasOnlyNumbers(validToMonth)];
}
function validateValidToYear(validToYear) {
  const errors = [];
  const currentYear = new Date().getFullYear().toString().substr(2, 2);

  if (validToYear < currentYear) {
    errors.push("Введите корректный год.");
  }

  return [...errors, ...validateHasOnlyNumbers(validToYear)];
}

function validateCvv(cvv) {
  const errors = [];

  if (cvv.length < 3 || cvv.length > 4) {
    errors.push("Длина должна быть 3 или 4 символа.");
  }

  return [...errors, ...validateHasOnlyNumbers(cvv)];
}

function Errors({ errors }) {
  return (
    <ul>
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}

export class CardForm extends React.Component {
  state = {
    number: "",
    cardHolder: "",
    validToMonth: "",
    validToYear: "",
    cvv: "",

    errors: {
      number: [],
      cardHolder: [],
      validToMonth: [],
      validToYear: [],
      cvv: [],
    },
  };

  onChangeNumber = (e) => this.setState({ number: e.target.value });
  onChangeCardHolder = (e) => this.setState({ cardHolder: e.target.value });
  onChangeValidToMonth = (e) => this.setState({ validToMonth: e.target.value });
  onChangeValidToYear = (e) => this.setState({ validToYear: e.target.value });
  onChangeCvv = (e) => this.setState({ cvv: e.target.value });

  render() {
    const numberHasErrors = Boolean(this.state.errors.number.length);
    const cardHolderHasErrors = Boolean(this.state.errors.cardHolder.length);
    const validToMonthHasErrors = Boolean(
      this.state.errors.validToMonth.length
    );
    const validToYearHasErrors = Boolean(this.state.errors.validToYear.length);
    const cvvHasErrors = Boolean(this.state.errors.cvv.length);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();

          this.setState((state) => ({
            errors: {
              ...state.errors,
              number: validateCardNumber(this.state.number),
              cardHolder: validateCardHolder(this.state.cardHolder),
              validToMonth: validateValidToMonth(this.state.validToMonth),
              validToYear: validateValidToYear(this.state.validToYear),
              cvv: validateCvv(this.state.cvv),
            },
          }));
        }}
      >
        <h2>Card Validation</h2>
        <div className="panel panel-default"></div>
        <input
          className={numberHasErrors ? "error" : ""}
          className="form-control"
          type="text"
          placeholder="Номер карты"
          value={this.state.number}
          onChange={this.onChangeNumber}
        />
        {numberHasErrors && <Errors errors={this.state.errors.number} />}

        <input
          className={cardHolderHasErrors ? "error" : ""}
          className="form-control"
          type="text"
          placeholder="Имя и фамилия владельца карты"
          value={this.state.cardHolder}
          onChange={this.onChangeCardHolder}
        />
        {cardHolderHasErrors && (
          <Errors errors={this.state.errors.cardHolder} />
        )}

        <input
          className={validToMonthHasErrors ? "error" : ""}
          className="form-control"
          type="text"
          placeholder="Действительна до (месяц)"
          value={this.state.validToMonth}
          onChange={this.onChangeValidToMonth}
        />
        {validToMonthHasErrors && (
          <Errors errors={this.state.errors.validToMonth} />
        )}
        <input
          className={validToYearHasErrors ? "error" : ""}
          className="form-control"
          type="text"
          placeholder="Действительна до (год)"
          value={this.state.validToYear}
          onChange={this.onChangeValidToYear}
        />
        {validToYearHasErrors && (
          <Errors errors={this.state.errors.validToYear} />
        )}

        <input
          className={cvvHasErrors ? "error" : ""}
          className="form-control"
          type="text"
          placeholder="Ваш CVV"
          value={this.state.cvv}
          onChange={this.onChangeCvv}
        />
        {cvvHasErrors && <Errors errors={this.state.errors.cvv} />}

        <button className="btn btn-primary">Добавить карту</button>
      </form>
    );
  }
}

export default CardForm;
