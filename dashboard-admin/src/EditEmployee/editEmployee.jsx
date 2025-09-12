import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
export default function EditEmployee() {
    const APIKEY = 'f13b2'
    const { id } = useParams();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        getEmployeeData()
    }, [])


    async function getEmployeeData() {
        try {
            const url = `http://localhost/API_ptmakmur/CRUDEmployee/getEmployeeData.php?apikey=${APIKEY}&id=${id}`
            const reqData = await fetch(url)
            const res = await reqData.json()
            // setFormData(res)
            setFormData(res.data)

        } catch (error) {
            console.log("error ===", error)
        }
    }

    return (
        <>
            <BackButton />
            <FormEdit formData={formData} setFormData={setFormData} />
        </>
    )
}

function BackButton() {
    const navigate = useNavigate()
    function handleBack() {
        sessionStorage.removeItem('isVerify')
        navigate('/dashboard');
    }
    return (
        <>
            <button onClick={handleBack}>Back to Home</button>
        </>
    )
}

function FormEdit({ formData, setFormData }) {
    const navigate = useNavigate()
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isEmpty = Object.values(formData).some(value => value === "");
        if (isEmpty) {
            alert('isi semua data terlebih dahulu!')
            return;
        }

        try {
            const url = 'http://localhost/API_ptmakmur/CRUDEmployee/editEmployee.php'
            const senData = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const res = await senData.json()
            if (res.status == true) {
                alert(res.message)
                sessionStorage.removeItem('isVerify')
                navigate('/dashboard');
            }

        } catch (error) {
            console.log('error =>', error)
        }


    }

    return (
        <>
            <div className="form-container-card">
                <form className="form-card">
                    <h2 className="form-title">Edit Karyawan</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nama Lengkap"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />

                    <select
                        name="gender"
                        value={formData.gender || ''}
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
                        value={formData.email || ''}
                        onChange={handleChange}

                    />

                    {/* <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    /> */}

                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birth_date || ''}
                        onChange={handleChange}
                    />

                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Nomor Telepon"
                        value={formData.phone_number || ''}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="idCard"
                        placeholder="Nomor ID Card"
                        value={formData.id_card || ''}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="jobPosition"
                        placeholder="Posisi Pekerjaan"
                        value={formData.job_position || ''}
                        onChange={handleChange}
                    />

                    {/* <select
                        name="role"
                    >
                        <option value="">Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select> */}

                    <input
                        type="text"
                        name="departmentId"
                        placeholder="ID Departemen"
                        value={formData.departement_id || ''}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="salary"
                        placeholder="Gaji"
                        value={formData.salary || ''}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn-submit" onClick={handleSubmit} >Submit</button>
                </form>
            </div>
        </>
    )
}
