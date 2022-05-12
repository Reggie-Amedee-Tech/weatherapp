import logo from './logo.svg';
import './App.css';
import Forecast from './components/Forecast/Forecast'
import Logo from './components/Logo/Logo';

console.log(process.env.REACT_APP_API_KEY)

function App() {
  return (
    <div className="App">
      <header>
      <Logo />
      </header>
      <main>
        <Forecast />
      </main>
      <footer>
          Page Created By Reginald Jean Amedee
        </footer>
    </div>
  );
}

export default App;
