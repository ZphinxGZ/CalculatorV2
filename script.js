let curInput = '';
let preInput = '';
let operator = '';

function calculator(button) {
    const display = document.querySelector('.display');
    const value = button.value; // ดึงค่าจากปุ่ม
    
    if (['+', '-', '*', '/', '=', 'AC', 'DE', '%'].includes(value)) {
        manageOpera(value); // ถ้าปุ่มเป็นตัวดำเนินการ ให้เรียก manageOpera
    } else {
        appendNum(value); // ถ้าปุ่มเป็นตัวเลข ให้เรียก appendNum
    }
    // อัปเดตหน้าจอ
    display.value = formatDisplay();
}
// ฟังก์ชันเพื่อจัดการการป้อนตัวเลข
function appendNum(value) {
    // ป้องกันการป้อนเลข 0 ที่นำหน้า
    if (curInput === '' && value === '0') return;
    // แทนที่เลข 0 ที่นำหน้า ด้วยตัวเลขที่ป้อน
    if (curInput === '0' && value !== '.') {
        curInput = value;
    } else {
        // เพิ่มตัวเลขที่ป้อน
        curInput = curInput + value;
    }
}
// ฟังก์ชันจัดการตัวดำเนินการ (+, -, *, /, AC, DE, %)
function manageOpera(value) {
    switch (value) {
        case 'AC':
            allClear(); 
            break;
        case 'DE':
            deleteL(); 
            break;
        case '%':
            percentCal(); 
            break;
        case '=':
            calcuResult(); 
            break;
        default:
            basicOpera(value); 
            break;
    }
}
// จัดการตัวดำเนินการ (+, -, *, /)
function basicOpera(value) {
    // ป้องกันการป้อนตัวดำเนินการโดยไม่มีตัวเลข
    if (curInput === '' && value !== '-') return;
    // ถ้ามีการป้อนค่าก่อนหน้านี้ ให้คำนวณผลลัพธ์ก่อน
    if (preInput !== '') {
        calcuResult();
    }
    operator = value; 
    preInput = curInput; 
    curInput = ''; 
}
// ฟังก์ชันเพื่อคำนวณเปอร์เซ็นต์
function percentCal() {
    if (curInput === '') return;
    curInput = (parseFloat(curInput) / 100).toString(); // คำนวณเปอร์เซ็นต์ แปลงเป็นสตริง
}
// ฟังก์ชันเพื่อคำนวณผลลัพธ์
function calcuResult() {
    // ตรวจข้อมูล
    if (preInput === '' || curInput === '' || operator === '') return;
    const prev = parseFloat(preInput);
     num2 = parseFloat(curInput);
    
    switch (operator) {
        case '+':
            result = prev + num2;
            break;
        case '-':
            result = prev - num2;
            break;
        case '*':
            result = prev * num2;
            break;
        case '/':
            result = prev / num2;
            break;
    }
    curInput = result.toString(); // แปลงป็นสตริง
    preInput = ''; 
    operator = ''; 
}
// หน้าจอ
function formatDisplay() {
    if (preInput === '' && curInput === '') return '0'; // ถ้าไม่มีข้อมูล ให้แสดง 0
    if (operator === '') return numberWithCommas(curInput); // ถ้าไม่มีตัวดำเนินการ ให้แสดงค่าปัจจุบัน

    // แสดงข้อมูลการคำนวณทั้งหมด (เช่น 1 + 5)
    return `${numberWithCommas(preInput)}${operator}${numberWithCommas(curInput)}`
    //${numberWithCommas(preInput)} ${operator}  
}
// ฟังก์ชันเพื่อทำการล้างข้อมูลทั้งหมด
function allClear() {
    curInput = '';
    preInput = '';
    operator = '';
}
// ปุ่ม DE
function deleteL() {
    if (curInput.length > 0) {
        curInput = curInput.slice(0, -1); // ลบตัวเลขตัวสุดท้าย
    }
}
//เอามาจาก stackOverflow ><
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
const checkKeyboard = (e) => {
    if (e.key === 'Enter') {
        manageOpera('=')
    } else if (e.key === 'Escape') {
        manageOpera('AC')
    } else if (e.key === '+' || e.key === '=') {
        manageOpera('+')
    } else if (e.key === '-') {
        manageOpera('-')
    } else if (e.key === '*') {
       manageOpera('*')
    } else if (e.key === '/') {
       manageOpera('/')
    } else if (e.key >= '0' && e.key <= '9') {
        appendNum(e.key)
    } else if (e.key === '%') {
        manageOpera('%')
    } else if (e.key === 'Backspace') {
        manageOpera('DE')
    }
    document.querySelector('.display').value = formatDisplay();
}
 document.addEventListener("DOMContentLoaded", () =>{
    document.addEventListener('keydown', checkKeyboard)
 })

