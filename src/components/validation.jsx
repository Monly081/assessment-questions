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
                uenValid = value.match(/(^((S|R)([\d]{2})|T[0-1][0-9]|T2[0-2])(LP|LL|FC|PF|RF|MQ|MM|NB|CC|CS|MB|FM|GS|DP|CP|NR|CM|CD|MD|HS|VH|CH|MH|CL|XL|CX|HC|RP|TU|TC|FB|FN|PA|PB|SS|MC|SM|GA|GB)([\d]{4})([A-Z])$|^(((18|19)\d{2}|20[0-1][0-9]|202[0-2])\d{5})([A-Z])$|(^\d{8})([A-Z]))$/gi);
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