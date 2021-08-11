
import './App.css';
import Image from './components/Image.js'
import Handtrack from './components/Handtrack.js'

function App() {
  return (
    <div className="App">
      <div id="webgl-canvas">
      <Image/> 
      <Handtrack/>
      </div>
    </div>
  );
}

export default App;
