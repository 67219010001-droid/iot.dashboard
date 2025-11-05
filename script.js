// ฟังก์ชันสำหรับจำลองการอ่านค่า BMP280
function readSensorData() {
    // 1. อุณหภูมิ: ค่าสุ่มในช่วง 20.0 ถึง 35.0 °C
    const temperature = (Math.random() * (35.0 - 20.0) + 20.0).toFixed(1); 
    
    // 2. ความดันอากาศ: ค่าสุ่มในช่วง 1000.00 ถึง 1020.00 hPa
    const pressure_hPa = (Math.random() * (1020.00 - 1000.00) + 1000.00).toFixed(2); 

    // 3. ความสูง (Altitude): คำนวณจากความดันอากาศ
    const P0 = 1013.25; // ความดันมาตรฐานที่ระดับน้ำทะเล (hPa)
    // สูตรคำนวณความสูงโดยประมาณ: Altitude (m) = 44330 * [1 - (P/P0)^(1/5.255)]
    const altitude = 44330 * (1 - Math.pow(pressure_hPa / P0, 1 / 5.255));
    const altitude_m = altitude.toFixed(1); 

    return {
        temperature: temperature,
        pressure: pressure_hPa,
        altitude: altitude_m,
        // รูปแบบเวลาไทย
        timestamp: new Date().toLocaleTimeString('th-TH') 
    };
}

// ฟังก์ชันสำหรับอัปเดต Dashboard
function updateDashboard() {
    const data = readSensorData();

    // อัปเดตค่าใน Card
    document.getElementById('temp-value').textContent = data.temperature;
    document.getElementById('pressure-value').textContent = data.pressure;
    document.getElementById('altitude-value').textContent = data.altitude;

    // อัปเดตเวลาล่าสุดใน Footer
    document.getElementById('last-update').textContent = data.timestamp;
}

// เริ่มต้นการทำงานเมื่อหน้าจอโหลดเสร็จ
window.onload = function() {
    updateDashboard(); // อัปเดตครั้งแรกทันที
    
    // ตั้งเวลาให้มีการอัปเดตทุกๆ 2 วินาที (2000 มิลลิวินาที)
    setInterval(updateDashboard, 2000); 
};