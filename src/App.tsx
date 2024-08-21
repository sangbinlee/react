import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import FormComponent from './components/employee/FormComponent'
import HomeComponent from './components/employee/HomeComponent'
import ListComponent from './components/employee/ListComponent'

// import ShowRenderedHTML from "./components/ShowRenderedHTML.jsx";
function App() {
  // const [count, setCount] = useState(0)

  return (
    // <ShowRenderedHTML>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<HomeComponent />}></Route>
          <Route path='/list' element={<ListComponent />}></Route>
          <Route path='/form' element={<FormComponent />}></Route>
          <Route path='/form/:id' element={<FormComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    // </ShowRenderedHTML>
  )
}

export default App
