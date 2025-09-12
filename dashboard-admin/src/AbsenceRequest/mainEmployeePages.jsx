import { useState } from 'react'
import './style/absentReq.css'

export default function AbsentRequest() {
    const getName = sessionStorage.getItem('username')
    const getEmail = sessionStorage.getItem('email')
    const [popUpSickNotification, setPopUpSickNotification] = useState(false)
    const [popUpPermitNotification, setPopUpPermitNotification] = useState(false)
    return (
        <div className="main-container">
            <div className="container-option">
                <h1>Hai ada yang ingin disampaikan?</h1>
                <FormAbsent getName={getName} getEmail={getEmail} setPopUpSickNotification={setPopUpSickNotification} setPopUpPermitNotification={setPopUpPermitNotification} />
            </div>
            {popUpSickNotification === false ? '' : <SickNotification setPopUpSickNotification={setPopUpSickNotification} />}
            {popUpPermitNotification === false ? '' : <PermitNotification setPopUpPermitNotification={setPopUpPermitNotification} />}
        </div>
    )
}
function FormAbsent({ getName, getEmail, setPopUpSickNotification, setPopUpPermitNotification }) {
    const [absentStatus, setAbsentStatus] = useState('')
    const [reason, setReason] = useState('')
    const getDate = new Date().toLocaleDateString('en-CA')

    async function handleSubmit(e) {
        e.preventDefault();

        if (absentStatus.trim() === '' || reason.trim() === '') {
            alert("lengkapi semua data terlebih dahulu")
            return;
        }

        const data = {
            name: JSON.parse(getName),
            email: JSON.parse(getEmail),
            absentStatus: absentStatus,
            reason: reason,
            date: getDate,
        }
        // fetch POST
        try {
            const sendData = await fetch('http://localhost/API_ptmakmur/absentReqEmployee.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const res = await sendData.json()
            console.log(res)
            setAbsentStatus('')
            setReason('')
            if (res.success === true) {
                if (absentStatus == 'sick') {
                    setPopUpSickNotification(true);
                } else {
                    setPopUpPermitNotification(true)
                }
            }

        } catch (error) {
            console.log("error", error)
        }
    }
    return (
        <>
            <form className="absent-form">
                <label htmlFor="type">Pilih Jenis:</label>
                <select
                    id="type"
                    name="type"
                    value={absentStatus}
                    onChange={(e) => setAbsentStatus(e.target.value)}
                    required
                >
                    <option value="">-- Pilih --</option>
                    <option value="Sick">Sakit</option>
                    <option value="Permit">Izin</option>
                </select>

                <label htmlFor="reason">Pesan / Alasan:</label>
                <textarea
                    id="reason"
                    name="reason"
                    placeholder="Tulis alasanmu di sini..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                />

                <button type="submit" className="submit-btn" onClick={handleSubmit}>
                    Kirim
                </button>
            </form>
        </>
    )
}

function SickNotification({ setPopUpSickNotification }) {
    return (
        <>
            <div className="popup">
                <div className="popup-content">
                    <h3>Pesan mu berhasil dikirim</h3>
                    <h2>Semoga Lekas Sembuh yaa..</h2>
                    <button className="close-btn" onClick={() => setPopUpSickNotification(false)}>Tutup</button>
                </div>
            </div>
        </>
    );
}
function PermitNotification({ setPopUpPermitNotification }) {
    return (
        <>
            <div className="popup">
                <div className="popup-content">
                    <h3>Pesan mu berhasil dikirim</h3>
                    <h2>Jangan lupa balik ke kantor lagi ya..</h2>
                    <button className="close-btn" onClick={() => setPopUpPermitNotification(false)}>Tutup</button>
                </div>
            </div>
        </>
    )
}
