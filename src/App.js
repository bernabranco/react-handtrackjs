
import './App.css';
import Video from './components/Video.js'
import Handtrack from './components/Handtrack.js'
import Loading from './components/Loading.js'

function App() {
  return (
    <div className="App">
      <Video/> 
      <Handtrack/>
      <Loading/>
    </div>
  );
}

export default App;
