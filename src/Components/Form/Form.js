import React, { Component } from "react";
import { FormErrors } from "./FormErrors";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      formErrors: { phone: "" },
      phoneValid: false,
      formValid: false,
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let phoneValid = this.state.phoneValid;

    switch (fieldName) {
      case "phone":
        phoneValid = value.match(
          /^(([+375]{1})([25|29|33|44]{1})(\d[0-9]{10}))$/gim
        );
        fieldValidationErrors.phone = phoneValid ? "" : " is invalid";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        phoneValid: phoneValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.phoneValid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    return (
      <form className="demoForm">
        <h2>Phone Validation</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.phone
          )}`}
        >
          <label htmlFor="phone">Your phone</label>
          <input
            type="phone"
            required
            className="form-control"
            name="phone"
            placeholder="Напишите ваш телефон в следующем формате: +375250000000"
            max="13"
            value={this.state.phone}
            onChange={this.handleUserInput}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.state.formValid}
        >
          Send
        </button>
      </form>
    );
  }
}

export default Form;
