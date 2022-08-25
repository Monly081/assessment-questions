import React, { Component } from 'react';

class UENValidation extends Component {

    constructor(props) {
        super(props);
        this.state = { uen: '', errors: {},  };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    // handleChange(event) {
    //     this.setState({ value: event.target.value });
    // }

    // handleSubmit(event) {
    //     if (this.handleValidation()){
    //         alert('UEN submitted as: ' + this.state.value);
    //     } else{
    //         alert('Form has errors');

    //     }

    //     event.preventDefault();
    // }

    // handleValidation(){
    //     let uen = this.state.value;
    //     let errors = {};
    //     let formIsValid = true;

    //     if (!this.state.value){
    //         formIsValid = false;
    //         errors['uen'] = 'Cannot be empty!';
    //     }
    // }

    // const initialValues = { uen: '' };
    // const [formValues, setFormValues] = useState(initialValues);
    // const [formErrors, setFormErrors] = useState({});
    // const [isSubmit, setIsSubmit] = useState(false);

    handleChange = (e) => {
        console.log(formValues);
        const { uen, value } = e.target;
        setFormValues({ ...formValues, uen: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(handleValidation(formValues));
        setIsSubmit(true);
    };


    handleValidation = (values) => {
        const errors = {};
        const regex = /((S|T)([\d]{2})([A-Z]{2})([\d]{4})([A-Z])|(\d{9})([A-Z]))/g; //Enter UEN REGEX here
        if (!values.uen) {
            errors.uen = 'UEN is required!'
        }

        else if (!regex.test(values.uen)) {
            errors.uen = 'Please ensure UEN is entered correctly!'
        }

        return errors;
    }


    render() {
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
    }
}

export default UENValidation;