import { useState, useEffect } from 'react'
import '../style/employeeData.css'
import { useNavigate } from 'react-router-dom';



export default function EmployeeData() {

    const APIKEY = 'f13b2'
    const APILink = `http://localhost/API_ptmakmur/employeesData.php?apikey=${APIKEY}`;
    const [employeesData, setEmployeesData] = useState([])
    const [reqData, setReqData] = useState(APILink) // FERRARI WIN
    const [employeeDataLog, setEmployeeDataLog] = useState([]);
    const [showEmployeeCard, setShowEmployeeCard] = useState(false)
    const [showVerify, setShowVerify] = useState(false)
    const [targetPath, setTargetPath] = useState('');

    useEffect(() => {
        getDataEmployees()
    }, [reqData])

    async function getDataEmployees() {
        try {
            const getData = await fetch(reqData)
            const result = await getData.json()
            setEmployeesData(result)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="employee-data-container">

            <EmployeeDataFilters
                APIKEY={APIKEY}
                setReqData={setReqData}
                reqData={reqData}
                employeesData={employeesData}
                setEmployeesData={setEmployeesData}
                getDataEmployees={getDataEmployees}
            />

            <AddEmployeeButton
                setShowVerify={setShowVerify}
                setTargetPath={setTargetPath}
            />

            {showVerify == false ? '' :
                <Verify setShowVerify={setShowVerify} employeeDataLog={employeeDataLog}
                    targetPath={targetPath} />
            }

            <TableEmployeeData
                employeesData={employeesData}
                APIKEY={APIKEY}
                setEmployeeDataLog={setEmployeeDataLog}
                setShowEmployeeCard={setShowEmployeeCard}
            />

            {showEmployeeCard == false ? ''
                :
                <EmployeeCardDetail
                    employeesData={employeesData}
                    employeeDataLog={employeeDataLog}
                    setShowEmployeeCard={setShowEmployeeCard}
                    setShowVerify={setShowVerify}
                    setTargetPath={setTargetPath} />
            }
        </div>
    )
}

function EmployeeDataFilters({ APIKEY, setReqData, setEmployeesData }) {
    const [inputValue, setInputValue] = useState('')
    const [searchBy, setSearchBy] = useState('id')

    async function handleFilterSubmmit(e) {
        e.preventDefault();
        const filteredLink = `http://localhost/API_ptmakmur/employeesData.php?apikey=${APIKEY}&${searchBy}=${inputValue}`;
        setReqData(filteredLink)
        try {
            const req = await fetch(filteredLink)
            const data = await req.json()
            setEmployeesData(data);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="employee-data-filters">
                <h3>Filters</h3>
                <form>
                    <input
                        placeholder="Cari kata kunci..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <label htmlFor="searchBy">Cari berdasarkan</label>
                    <select
                        id="searchBy"
                        name="searchBy"
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                    >
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                    </select>
                    <button type="submit" onClick={handleFilterSubmmit}>Cari</button>
                </form>

            </div>
        </>
    )
}
function AddEmployeeButton({ setShowVerify, setTargetPath }) {
    function handleClickAdd(path) {
        setTargetPath(path)
        setShowVerify(true)
    }
    return (
        <>
            <button onClick={() => handleClickAdd('/AddEmployee')}>Tambah Karyawan</button>
        </>
    )
}

function Verify({ setShowVerify, targetPath }) {
    const emailAdmin = sessionStorage.getItem('email')
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (inputValue.trim() == '') return;

        const data = {
            emailAdmin: emailAdmin,
            password: inputValue,
        }
        //fetch
        try {
            const sendData = await fetch("http://localhost/API_ptmakmur/verifyAccess.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const res = await sendData.json()
            if (res.status === true) {
                sessionStorage.setItem('isVerify', true)
                setShowVerify(false)
                navigate(targetPath)

                // navigate('/AddEmployee')
            }
            if (res.status === false) {
                alert("Kata sandi salah!")
                return;
            }
        } catch (error) {
            console.log("error=>", error)
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3 className="popup-title">Verifikasi Akses</h3>
                <form className="verify-form" onSubmit={handleSubmit}>
                    <input
                        className="input-verify"
                        placeholder="Masukkan password"
                        type="password"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" className="button-submit-verify">
                        Submit
                    </button>
                </form>
                <button className="button-close" onClick={() => setShowVerify(false)}>×</button>
            </div>
        </div>
    );
}

function TableEmployeeData({ employeesData, setEmployeeDataLog, setShowEmployeeCard }) {

    function handleClickTable(selectedId) {
        const employee = employeesData.find(emp => emp.id === selectedId);
        setEmployeeDataLog(employee);
        setShowEmployeeCard(true);
    }

    return (
        <>
            <div className="employee-data-table-wrapper">
                <table className="employee-data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>No telp</th>
                            <th>departement id</th>
                            <th>Jabatan</th>

                        </tr>
                    </thead>
                    <tbody>
                        {employeesData.map(emp => (
                            <tr key={emp.id} onClick={() => handleClickTable(emp.id)}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.phone_number}</td>
                                <td>{emp.departement_id}</td>
                                <td>{emp.job_position}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
function EmployeeCardDetail({ employeeDataLog, setShowEmployeeCard, setShowVerify, setTargetPath }) {

    function handleClickAction(id) {
        setTargetPath(`/EditEmployee/${id}`)
        setShowEmployeeCard(false)
        setShowVerify(true)
        
    }
    
    return (
        <div className="employee-detail-overlay">
            <div className="employee-detail-card">
                <h3>Detail Karyawan</h3>

                <div className="employee-detail-table-wrapper">
                    <table className="employee-detail-table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{employeeDataLog.id}</td>
                            </tr>
                            <tr>
                                <th>ID Card</th>
                                <td>{employeeDataLog.id_card}</td>
                            </tr>
                            <tr>
                                <th>Nama</th>
                                <td>{employeeDataLog.name}</td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>{employeeDataLog.gender}</td>
                            </tr>
                            <tr>
                                <th>Tanggal Lahir</th>
                                <td>{employeeDataLog.birth_date}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{employeeDataLog.email}</td>
                            </tr>
                            <tr>
                                <th>Nomor Telepon</th>
                                <td>{employeeDataLog.phone_number}</td>
                            </tr>
                            <tr>
                                <th>Posisi</th>
                                <td>{employeeDataLog.job_position}</td>
                            </tr>
                            <tr>
                                <th>Departemen</th>
                                <td>{employeeDataLog.departement_id}</td>
                            </tr>
                            <tr>
                                <th>Gaji</th>
                                <td>{employeeDataLog.salary}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='employee-detail-action'>
                    <button
                        className='btn-detail-action'
                        onClick={() => handleClickAction(employeeDataLog.id)}
                    >
                        Edit
                    </button>
                    <button
                        className='btn-detail-action'

                    >
                        Hapus
                    </button>
                </div>
                <div className="employee-detail-close">
                    <button className="btn-detail-action" onClick={() => setShowEmployeeCard(false)}>Tutup</button>
                </div>

            </div>
        </div>
    )
}
