import React, { Component } from "react";

import "./App.css";
import Form from "./Components/Form/Form.js";
import CardForm from "./Components/CardForm/CardForm.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />

        <CardForm />
      </div>
    );
  }
}

export default App;
