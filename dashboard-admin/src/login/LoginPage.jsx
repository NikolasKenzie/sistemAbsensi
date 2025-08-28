import { useState } from 'react'
import './style/loginPage.css'
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const navigate = useNavigate();

    const [inputId, setInputId] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const idAbsent = '112233';
    const password = 'absent1';

    async function handleSubmit(e) {
        e.preventDefault();

        if (inputId.trim() === '' || inputPassword.trim() === '') {
            alert("Lengkapi id dan password terlebih dahulu")
            return;
        }
        
        const data = {
            id: inputId,
            password: inputPassword
        }
        //fetch
        try {
            const sendData = await fetch("http://localhost/API_ptmakmur/loginSystem.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const res = await sendData.json();
            if (res.status === "success") {
                let name = res.data.name
                let role = res.data.role

                sessionStorage.setItem('isLogin', true);
                sessionStorage.setItem('username', JSON.stringify(name))
                sessionStorage.setItem('email', JSON.stringify(inputId))
                sessionStorage.setItem('userRole', JSON.stringify(role))

                if (res.data.role === 'admin') {
                    navigate("/dashboard/*")
                } 
                if (res.data.role === 'absent') {
                    navigate("/absentRFID")
                } 
                if (res.data.role === 'employee') {
                    navigate("/absentreq")
                } 
                
            } else {
                alert("iD atau ussername salah!")
            }
            if (res.status === 'failed') {
                alert("id atau password salah!")
            }
            

        } catch (error) {
            console.error("Error:", error);
        }
        
    }
    
    return (
        <div className='main-loginPage'>
            <div className='container-loginContent'>
                <div className="login-header">
                    <h2>Login</h2>
                </div>
                <form className="login-form">
                    <label htmlFor="employeeId">ID</label>
                    <input
                        type="text"
                        id="employeeId"
                        placeholder="Masukkan ID Anda"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Masukkan Password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                    />

                    <button type="submit" className="btn-login" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
}

// function PopupNotificattionFalse() {
//     return (
//         <>
            
//         </>
//     )
// }