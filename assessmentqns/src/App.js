import './App.css';
import UENValidation from './components/validation';
import WeatherService from './components/weatherservice';

function App() {

  return (

    <div className='Appdiv'>
      <UENValidation />
      <br/>
      <WeatherService />
    </div>
  );
}

export default App;
