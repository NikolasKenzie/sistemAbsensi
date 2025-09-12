import { useNavigate } from "react-router-dom";
import './style/addEmployee.css';
import { useState } from "react";
export default function AddEmployee() {
    const navigate = useNavigate()
    return (
        <>
            <div className="mainContent-AddEmployee">
                <BackButton navigate = {navigate}/>
                <FormCard />
            </div>
        </>
    )
}

function BackButton({navigate}) {
    function handleBack() {
        sessionStorage.removeItem('isVerify')
        navigate('/dashboard')
    }
    return(
        <>
            <button onClick={handleBack }>Back to Home</button>
        </>
    )
}

function FormCard() {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        email: '',
        password: '',
        birthDate: '',
        phoneNumber: '',
        idCard: '',
        jobPosition: '',
        role: '',
        departmentId: '',
        salary: '',

    })
    function handleChange(e) {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'birthDate') {
            newValue = new Date(value).toISOString().split("T")[0];
        }
        setFormData({ ...formData, [name]: newValue });
    }

    async function handleSubmit() {

        let confirmResponse = confirm('Apakah semua data sudah benar?')
        if (!confirmResponse) return;

        try {
            const sendData = await fetch("http://localhost/API_ptmakmur/CRUDEmployee/newEmployee.php", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const res = await sendData.json()
            if (res.status == true) {
                alert ("Data berhasil dikirim")
                
            }
        } catch (err) {
            console.log("error =>", err);
        }
    }

    return (
        <>
            <div className="form-container-card">
                <form className="form-card">
                    <h2 className="form-title">Tambah Karyawan</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Nama Lengkap"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Pilih Gender</option>
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                    </select>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />

                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Nomor Telepon"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="idCard"
                        placeholder="Nomor ID Card"
                        value={formData.idCard}
                        onChange={handleChange}

                    />

                    <input
                        type="text"
                        name="jobPosition"
                        placeholder="Posisi Pekerjaan"
                        value={formData.jobPosition}
                        onChange={handleChange}
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="">Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>

                    <input
                        type="text"
                        name="departmentId"
                        placeholder="ID Departemen"
                        value={formData.departmentId}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="salary"
                        placeholder="Gaji"
                        value={formData.salary}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn-submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>

        </>
    )
}