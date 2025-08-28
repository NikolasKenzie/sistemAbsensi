import '../style/sidebar.css'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="container-sidebar">
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='home'>
                    <i className="fa-solid fa-house"></i>
                    <p>Home</p>
                </div>
            </Link>
            <Link to='/dashboard/presence' style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='presence'>
                    <i className="fa-solid fa-users"></i>
                    <p>Presence</p>
                </div>
            </Link>
            <Link to='/dashboard/employeeData' style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='employee'>
                    <i className="fa-solid fa-user-tie"></i>
                    <p>Employee Data</p>
                </div>
            </Link>
        </div>
    )
}
