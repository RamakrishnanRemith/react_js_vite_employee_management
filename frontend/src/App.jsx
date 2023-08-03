import './App.css'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Projects from './Projects'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Profile from './Profile'
import Home from './Home'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import EmployeeDetail from './EmployeeDetail'
import EmployeeLogin from './EmployeeLogin'
import Email from './Email'
import Signup from './Signup'
import Empmanagement from './Empmanagement'
import Bmi from './Bmi'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
      <Route path='' element={<Home />}></Route>
      <Route path='/employee' element={<Employee />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/create' element={<AddEmployee />}></Route>
      <Route path='/employeeEdit/:id' element={<EditEmployee />}></Route>
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/Start' element={<Projects />}></Route>
      <Route path='/empmanagement' element={<Empmanagement />}></Route>
      <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
      <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route>
      <Route path='/email' element={<Email />}></Route>
      <Route path='/bmi' element={<Bmi />}></Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
