import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { FormErrors } from './FormErrors';

class UENValidation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uen: '',
            formErrors: { uen: '' },
            uenValid: false,
            formValid: false,
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name
        const value = e.target.value;
        console.log(name, value)
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let uenValid = this.state.uenValid;

        switch (fieldName) {
            case 'uen':
                uenValid = value.toUpperCase().match(/((S|T)([\d]{2})([A-Z]{2})([\d]{4})([A-Z])|(\d{9})([A-Z]))/g);
                fieldValidationErrors.uen = uenValid ? '' : ' Please enter correct syntax!';
                break;

            default:
                break;
        }

        this.setState({ formErrors: fieldValidationErrors, uenValid: uenValid }, this.validateForm);

    }

    validateForm() {
        this.setState({ formValid: this.state.uenValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    render() {
        return (
            <div className='validationform'>
                <h1>UEN Validation</h1>
                <form className='UENValidate'>
                    <FormErrors formErrors={this.state.formErrors} />
                    <div>
                        <label>UEN:</label>
                        <input type='text'
                            name='uen'
                            className='form-control'
                            value={this.state.uen}
                            onChange={this.handleUserInput} />

                        <button type='submit' disabled={!this.state.formValid}>OK</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UENValidation;