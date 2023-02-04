import { InputFormAndResult } from './components/InputFormAndResult';
import './App.Style.css'



const App = () => {



  return (
    <div id="main">
      <div id="title">

        <h1>Delivery Fee Calculator</h1>
        <hr />
      </div>
      <div id="inputAndResult">
        <InputFormAndResult />
      </div>
      <div id="bottom">
        <hr />
      </div>
    </div>
  )
}

export default App;
