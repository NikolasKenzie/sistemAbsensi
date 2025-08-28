import { Routes, Route } from "react-router-dom";
import Sidebar from './component/Sidebar'
import Home from './component/Home'
import Presence from './component/Attendance'
import EmployeeData from './component/EmployeeData'
import './style/app.css'

export default function Dashboard() {
  return (
    <div className="container-dashboard">
      <div className="sidebar-navigation">
        <Sidebar />
      </div>
      <div className="dashboard-display">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="presence" element={<Presence />} />
          <Route path="employeeData" element={<EmployeeData />} />
        </Routes>
      </div>
    </div>
  )
}
