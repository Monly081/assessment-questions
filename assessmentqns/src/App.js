import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialValues = { uen: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    console.log(formValues);
    const { uen, value } = e.target;
    setFormValues({ ...formValues, uen: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(handleValidation(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors])

  const handleValidation = (values) => {
    const errors = {};
    const regex = /((S|T)([\d]{2})([A-Z]{2})([\d]{4})([A-Z])|(\d{9})([A-Z]))/g; //Enter UEN REGEX here
    if (!values.uen) {
      errors.uen = 'UEN is required!'
    }

    else if (!regex.test(values.uen.toUpperCase())) {
      errors.uen = 'Please ensure UEN is entered correctly!'
    }

    return errors;
  }

  return (

    <div className='container'>
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <form onSubmit={handleSubmit}>
        <h1>UEN Validation</h1>
        <div className='ui divider'></div>
        <div className='ui form'>
          <div className='field'>
            <label>UEN: </label>
            <input type='text' value={formValues.uen} onChange={handleChange} />
            <p>{formErrors.uen}</p>
            <input type='Submit' />
          
          </div>

        </div>
      </form>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
