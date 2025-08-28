import { useState } from 'react';
import '../style/home.css'
export default function Home() {
    const dateNow = new Date();
    const formattedDate = dateNow.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const hours = dateNow.getHours()
    const minutes = dateNow.getMinutes()
    const getAdmin = sessionStorage.getItem('username')
    const admin = JSON.parse(getAdmin)


    const [showPopUp, setShowPopUp] = useState(false)
    const [todoTask, setTodoTask] = useState([])
    return (
        <>
            <div className="dashboard-home">
                <div className="dashboard-header">
                    <h1>👋 Hi, {admin} </h1>
                    <h3>📅 Hari ini: {formattedDate}</h3>
                </div>
            </div>
            <StatusToday />
            <WeeklySummary />
            <TodoCard setShowPopUp={setShowPopUp} todoTask={todoTask} />
            <ActivitiesCard hours={hours} minutes={minutes} />
            {showPopUp == false ? (
                ''
            ) : (
                <PopupAddTask showPopUp={showPopUp} setShowPopUp={setShowPopUp} setTodoTask={setTodoTask} />
            )}
            <ReminderCard />
        </>
    )
}

function StatusToday() {
    return (
        <>
            <section className="card card-status">
                <h2>🔄 Status Hari Ini</h2>
                <ul className="status-list">
                    <li><strong>🕒 Absen Masuk:</strong> <span className="status-green">✅ 08:11 WIB</span></li>
                    <li><strong>📍 Lokasi Absen:</strong> 🏢 Kantor Pusat - Jakarta </li>
                    <li><strong>⏳ Jam Kerja:</strong> 8 jam</li>
                    <li><strong>📌 Jadwal:</strong> Meeting Tim Proyek A - 10:00 WIB</li>
                </ul>
            </section>
        </>
    )
}

function WeeklySummary() {
    return (
        <>
            <section className="card card-summary">
                <h2>📈 Ringkasan Mingguan (3 – 9 Agustus)</h2>
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Kehadiran</th>
                            <th>Jam Kerja</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Senin</td><td>✅ Hadir</td><td>8j 05m</td><td className="status-green">On Time</td></tr>
                        <tr><td>Selasa</td><td>✅ Hadir</td><td>7j 45m</td><td className="status-orange">Telat 10m</td></tr>
                        <tr><td>Rabu</td><td>✅ Hadir</td><td>8j 20m</td><td className="status-green">On Time</td></tr>
                        <tr><td>Kamis</td><td>✅ Hadir</td><td>9j 00m</td><td className="status-blue">Lembur</td></tr>
                        <tr><td>Jumat</td><td>⬜ Aktif</td><td>2j 13m</td><td className="status-gray">-</td></tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}
function TodoCard({ setShowPopUp, todoTask }) {
    return (
        <>
            <section className="card card-todo">
                <h2>📋 Tugas Mingguan</h2>
                <ul className="todo-list">
                    <li><input type="checkbox" /> Update progress laporan mingguan <span className="deadline">17:00</span></li>
                    <li><input type="checkbox" /> Join meeting tim proyek A <span className="deadline">10:00</span></li>
                    <li><input type="checkbox" checked disabled /> Kirim rekap absensi ke HR <span className="deadline">08:30</span></li>
                </ul>
                <button className="btn-add-task" onClick={() => setShowPopUp(true)}>+ Tambah Tugas</button>
            </section>

        </>
    )
}
function PopupAddTask({ showPopUp, setShowPopUp, setTodoTask }) {
    const [inputTask, setInputTask] = useState('')
    const [inputDeadline, setInputDeadline] = useState('')
    function handleSubmitTask(e) {
        e.preventDefault();

        if ((inputTask.trim() === "") || (inputDeadline.trim() === '')) {
            alert("enter your task please...")
            return;
        }

        const newTodo = {
            id: new Date(),
            task: inputTask,
            deadLine: inputDeadline,
            isComplete: false,
        }
        setTodoTask((prevList) => [...prevList, newTodo])
        setInputTask('')
        setInputDeadline('')

    }
    return (
        <>
            <div className="popup-overlay">
                <div className="popup-card">
                    <h3>➕ Tambah Tugas Baru</h3>
                    <form>
                        <label>Nama Tugas</label>
                        <input
                            type="text"
                            placeholder="Contoh: Review laporan harian"
                            value={inputTask}
                            onChange={(e) => setInputTask(e.target.value)}
                        />
                        <label>Deadline</label>
                        <input
                            type="date"
                            value={inputDeadline}
                            onChange={(e) => setInputDeadline(e.target.value)}
                        />
                        <div className="popup-actions">
                            <button className="btn-submit" onClick={handleSubmitTask}>Simpan</button>
                            <button type="button" className="btn-cancel" onClick={() => setShowPopUp(false)}>Batal</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

function ActivitiesCard({ hours, minutes }) {
    return (
        <>

            <section className="card card-activity">
                <h2>🧾 Aktivitas Terakhir</h2>
                <ul className="activity-list">
                    <li>🔓 Login ke sistem - {hours}-{minutes} WIB</li>
                    <li>🟢 Check-In - 08:11 WIB</li>
                    <li>📁 Upload dokumen laporan proyek A - 08:35 WIB</li>
                </ul>
            </section>
        </>
    )
}
function ReminderCard() {
    return (
        <>
            <section className="card card-reminder">
                <h2>🔔 Notifikasi & Reminder</h2>
                <ul className="reminder-list">
                    <li>⏰ 16:45 - Reminder: Absen pulang</li>
                    <li>📌 Hari Ini - Deadline laporan mingguan divisi</li>
                    <li>🎂 Hari Ini - Ulang Tahun: Rina Oktaviani 🎉</li>
                </ul>
            </section>
        </>
    )
}