import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import DisplayPage from './DisplayPage';
import Form from "./Form";
function App() {
  return (
      <BrowserRouter>
      <Routes>
      <Route path ="/" element = {<Form/>}></Route>
      <Route path ="/display" element = {<DisplayPage/>}></Route>
      </Routes>
      </BrowserRouter>
      
  );
}

export default App;
