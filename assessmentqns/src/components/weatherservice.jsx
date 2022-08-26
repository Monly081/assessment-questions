import React, { Component } from "react";


class WeatherService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectValue: '',
            selectedValueForecast: '',
            metadata: [],
            items: [],
            isLoaded: false,
        }
    }


    //Fetching API and storing into variables to work with
    componentDidMount() {
        fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json['items'],
                    metadata: json['area_metadata'],
                })
            });
    }

    handleChange = (e) => {
        var selected = this.state.items[0]['forecasts'].find(obj => { return obj.area === 'Bedok' });

        this.setState({
            selectValue: e.target.value,
            selectedValueForecast: selected['forecast']
        });



    }

    render() {

        var { isLoaded, items, metadata } = this.state;
        var message = 'You\'ve selected ' + this.state.selectValue;
        var message2 = 'Forecast: ' + this.state.selectedValueForecast;

        //Fail API Fetch
        if (!isLoaded) {
            return <div>Loading...</div>
        }

        //Success API Fetch
        else {
            return (
                <div className="Weatherdiv">
                    <h1>Weather Forecast Service</h1>

                    <h3>Date: {items.map(data => {
                        return (data.update_timestamp).slice(0, 10);
                    })}</h3>

                    <h3>Time: {items.map(data => {
                        return (data.valid_period.start).slice(11, 16) + ' to ' + (data.valid_period.end).slice(11, 16);
                    })}</h3>

                    <select value={this.state.selectValue} onChange={this.handleChange}>
                        {metadata.map(e => (<option value={e['name']}>{e['name']}</option>))}
                    </select>


                    <p>{message}</p>
                    <p>{message2}</p>






                </div>
            );
        }


    }
}

export default WeatherService;