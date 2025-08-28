import { useEffect, useState } from 'react';
import './style/absentSystemRIFD.css'
import { useRef } from 'react';

export default function AbsentSystemRFID() {
    const [showPopup, setShowPopup] = useState(false)
    const [resultFetch, setResultFetch] = useState('')


    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <>
            <div className='main-content-absentRFID'>
                <h1>Silahkan Tap Kartu</h1>

                {/* input buat RFID nya, masih prototype */}
                <InputIdCard 
                    setShowPopup={setShowPopup} 
                    formattedDate={formattedDate} 
                    formattedTime={formattedTime}
                    setResultFetch={setResultFetch}
                />

                {showPopup === true ? <PopupAbsent formattedTime={formattedTime} resultFetch={resultFetch} /> : ''}
            </div>
        </>
    )
}

function InputIdCard({ setShowPopup, formattedDate, formattedTime, setResultFetch }) {
    const [inputIdCard, setInputIdCard] = useState('')
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        if (inputIdCard.length === 10) {
            handleCardId();
        }
    }, [inputIdCard]);

    const handleShow = () => {
        setShowPopup(true)
        setTimeout(() => {
            setShowPopup(false)
        }, 2500)
    }

    async function handleCardId() {
        //fetchData

        const data = {
            idCard: inputIdCard,
            date: formattedDate,
            checkTime: formattedTime,
            departmentId: 'kantor A',
        }
        try {
            const sendData = await fetch("http://localhost/API_ptmakmur/absentRFID.php", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const res = await sendData.json();
            console.log("Server Response:", res)
            setInputIdCard('')
            setResultFetch(res)
            handleShow()

        } catch (error) {
            console.log("error => ", error)
        }

    }

    return (
        <>
            //nanti type inputnya pakai hidden kalau ada mesin card reader RFID
            <input
                type='number'
                ref={inputRef}
                placeholder='tap kartu!'
                value={inputIdCard}
                onChange={(e) => setInputIdCard(e.target.value)}
            ></input>
        </>
    )
}

function PopupAbsent({formattedTime, resultFetch}) {
    return (
        <div className="popup-overlay-absentsystem">
            <div className="popup-card-absentsystem">

                <div className="popup-photo">
                    <img
                        // src=""
                        alt="Foto Karyawan"
                    />
                </div>


                <div className="popup-data-absent">
                    <h2>Nama: <span className="value">{resultFetch.employee}</span></h2>
                    <p>Check In: <span className="value">{formattedTime}</span></p>
                    <p>Status: <span className="status hadir">{resultFetch.action.message}</span></p>
                </div>
            </div>
        </div>
    )
}
