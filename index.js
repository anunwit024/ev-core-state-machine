const EV_Core_System = {
  currentState: "PARKED",
  speed: 0,
  batteryLevel: 70, // เริ่มต้นที่ 70%

  transition(action, payload = {}) {
    switch (this.currentState) {
      case "PARKED":
        if (action === "START_DRIVE") {
          this.currentState = "DRIVING";
          this.speed = 60; // รถออกตัว ความเร็วเป็น 60 km/h
        } else if (action === "PLUG_IN") {
          this.currentState = "CHARGING";
        }
        break;

      case "DRIVING":
        if (action === "STOP_CAR") {

           if (this.speed > 0) {
            console.log("🚨 อันตราย! ห้ามจอดรถขณะรถกำลังวิ่ง!")
           }else{
            this.currentState ="PARKED";
           }
          /* 🚨 TASK 1: กฎความปลอดภัย 
            ตรวจสอบว่าถ้ารถมีความเร็ว (this.speed > 0) ให้พ่น log เตือนว่า "🚨 อันตราย! ห้ามจอดรถขณะรถกำลังวิ่ง!"
            แต่ถ้ารถหยุดนิ่งแล้ว (this.speed === 0) ให้เปลี่ยน currentState เป็น "PARKED" ได้
          */
        }
        break;

      case "CHARGING":
        if (action === "CHARGE_TICK") {
          if (this.batteryLevel < 100) {
            this.batteryLevel += 10;
            console.log(`🔋 กำลังชาร์จ... แบตเตอรี่ปัจจุบัน: ${this.batteryLevel}%`);
          }if(this.batteryLevel ===100){
            this.currentState ="PARKED";
          }
        }
        
        if (action === "UNPLUG") {
            if(this.batteryLevel < 100){
                console.log("🚨 ห้ามถอดปลั๊ก! ระบบกำลังชาร์จไฟด่วนแบบแรงดันสูง")
            }       
        }
        break;
    }
    console.log(`[EV System Status] -> State: ${this.currentState} | Speed: ${this.speed} km/h | Battery: ${this.batteryLevel}% \n`);
  }
};

// ==========================================
// 🧪 ชุดทดสอบระบบจำลอง (Simulation Test)
// ==========================================
console.log("--- เริ่มต้นจำลองระบบรถยนต์ไฟฟ้า ---\n");

// 1. ลองขับรถ และพยายามกดจอดรถตอนความเร็วสูง
EV_Core_System.transition("START_DRIVE"); 
EV_Core_System.transition("STOP_CAR"); // ❌ สเตตต้องห้ามเปลี่ยน! ต้องอยู่ DRIVING เหมือนเดิม

// 2. จำลองสถานการณ์คนขับเหยียบเบรคจนความเร็วเป็น 0 แล้วกดจอด
EV_Core_System.speed = 0; 
EV_Core_System.transition("STOP_CAR"); // ✅ สเตตต้องเปลี่ยนเป็น PARKED

// 3. เสียบสายชาร์จ และพยายามกระชากปลั๊กออกขณะชาร์จอยู่
EV_Core_System.transition("PLUG_IN"); // เข้าสู่สเตต CHARGING
EV_Core_System.transition("UNPLUG"); // ❌ สเตตต้องห้ามเปลี่ยน! ต้องพ่นเตือนระบบแรงดันสูง

// 4. จำลองบอร์ดควบคุมรันโหมดชาร์จไฟไปเรื่อย ๆ จนเต็ม
EV_Core_System.transition("CHARGE_TICK"); // 80%
EV_Core_System.transition("CHARGE_TICK"); // 90%
EV_Core_System.transition("CHARGE_TICK"); // 100% -> ⚡ ระบบต้องตัดกลับไป PARKED อัตโนมัติ!