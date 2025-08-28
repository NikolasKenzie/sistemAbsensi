import { useEffect, useState } from 'react';
import '../style/presence.css'

export default function Presence() {
    const today = new Date().toISOString().split('T')[0];
    const formattedDate = today.replace(/-/g, '/');

    const APIKEY = 'f13b2' // jan lupa di .env sebelum di git push sayang
    const APIDataEmployee = `http://localhost/API_ptmakmur/employeesData.php?apikey=${APIKEY}`;
    const APIEmployeeStatus = `http://localhost/API_ptmakmur/attendanceStatus.php?apikey=${APIKEY}&date=${formattedDate}`;

    const [employeeStatus, setEmployeeStatus] = useState([])
    const [employeeTotal, setEmployeeTotal] = useState([])


    const [urlEmployeeStatus, setUrlEmployeeStatus] = useState(APIEmployeeStatus)

    useEffect(() => {
        countEmployeeTotal()
        getEmployeeStatus()

    }, [urlEmployeeStatus])
    async function countEmployeeTotal() {
        try {
            const req = await fetch(APIDataEmployee)
            const data = await req.json()
            setEmployeeTotal(data)

        } catch (error) {
            console.error(error)
        }
    }

    async function getEmployeeStatus() {
        try {
            const req = await fetch(urlEmployeeStatus)
            const data = await req.json()
            setEmployeeStatus(data)


        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="attendance-container">
            <div className="attendance-header">
                Kehadiran Karyawan
            </div>
            <SumarizeCard
                employeeTotal={employeeTotal}
                employeeStatus={employeeStatus}
            />
            <Filters
                APIKEY={APIKEY}
                urlEmployeeStatus={urlEmployeeStatus}
                setUrlEmployeeStatus={setUrlEmployeeStatus}
            />

            <TablePresence employeeStatus={employeeStatus} />
        </div>
    );
}


function SumarizeCard({ employeeTotal, employeeStatus }) {
    const sickCount = employeeStatus.filter(item => item.status === "Sick").length;
    const presentCount = employeeStatus.filter(item => item.status === "Present").length;
    const permitCount = employeeStatus.filter(item => item.status === 'Permit').length;
    const alphaCount = employeeStatus.filter(item => item.status === 'Alpha').length

    return (
        <div className="attendance-summary">
            <div className="attendance-summary-item">
                <p>Total Karyawan</p>
                <h3>{employeeTotal.length}</h3>
            </div>
            <div className="attendance-summary-item">
                <p>Hadir</p>
                <h3>{presentCount}</h3>
            </div>
            <div className="attendance-summary-item">
                <p>Izin</p>
                <h3>{permitCount}</h3>
            </div>
            <div className="attendance-summary-item">
                <p>Sakit</p>
                <h3>{sickCount}</h3>
            </div>
            <div className="attendance-summary-item">
                <p>Alpha</p>
                <h3>{alphaCount}</h3>
            </div>
        </div>
    )
}

function Filters({ APIKEY, setUrlEmployeeStatus }) {
    const today = new Date().toISOString().split('T')[0];
    
    const [searchBy, setSearchBy] = useState('all')
    const [inputValue, setInputValue] = useState('')
    const [searchByDate, setSearchByDate] = useState(today)
    const formattedDate = searchByDate.replace(/-/g, '/');
    async function handleFilter(e) {
        e.preventDefault()
        const filteredDataUrl = `http://localhost/API_ptmakmur/attendanceStatus.php?apikey=${APIKEY}&status=${searchBy}&name=${inputValue}&date=${formattedDate}`;
        setUrlEmployeeStatus(filteredDataUrl)
       
    }

    return (
        <div className="attendance-filters">
            <input
                type="date"
                value={searchByDate}
                onChange={(e) => setSearchByDate(e.target.value)}
            />
            <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
            >
                <option value="all">Semua Status</option>
                <option value="present">Hadir</option>
                <option value="permit">Izin</option>
                <option value="sick">Sakit</option>
                <option value="Alpha">Alpha</option>
            </select>
            <input
                type="text"
                placeholder="Cari nama karyawan..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className='presence-filters-button' onClick={handleFilter}>Cari</button>
        </div>
    )
}


function TablePresence({ employeeStatus }) {
    return (
        <div className="attendance-table-wrapper">
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Tanggal</th>
                        <th>Jam Masuk</th>
                        <th>Jam Pulang</th>
                        <th>Status</th>
                        <th>Lokasi</th>
                        <th>Alasan</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeStatus.map((status) => (
                        <tr key={status.employee_id}>
                            <td>{status.employee_name}</td>
                            <td>{status.date}</td>
                            <td>{status.check_in}</td>
                            <td>{status.check_out}</td>
                            <td className={
                                status.status === 'Present' ? 'status-hadir' :
                                    status.status === 'Permit' ? 'status-izin' :
                                        status.status === 'Sick' ? 'status-sakit' :
                                            'status-alpha'
                            }>
                                {status.status}
                            </td>
                            <td>{status.location}</td>
                            <td>{status.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
