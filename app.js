const form = document.querySelector("#reminderForm");
const severity = document.querySelector("#severity");
const severityValue = document.querySelector("#severityValue");
const category = document.querySelector("#category");
const vehicleFields = document.querySelector("#vehicleFields");
const dynamicFields = document.querySelector("#dynamicFields");
const formShell = document.querySelector("#formShell");
const resultPanel = document.querySelector("#resultPanel");
const questionnaireTitle = document.querySelector("#questionnaireTitle");
const topicCards = Array.from(document.querySelectorAll(".topic-card"));
const quickChecks = document.querySelector("#quickChecks");
const timeline = document.querySelector("#timeline");
const riskLevel = document.querySelector("#riskLevel");
const riskBadge = document.querySelector("#riskBadge");
const alertSummary = document.querySelector("#alertSummary");
const messagePreview = document.querySelector("#messagePreview");
const sendLog = document.querySelector("#sendLog");
const copyMessage = document.querySelector("#copyMessage");
const simulateSend = document.querySelector("#simulateSend");
const notificationSlots = document.querySelector("#notificationSlots");
const acknowledgeToday = document.querySelector("#acknowledgeToday");
const resetAck = document.querySelector("#resetAck");
const rescheduleDate = document.querySelector("#rescheduleDate");
const rescheduleTime = document.querySelector("#rescheduleTime");
const rescheduleButton = document.querySelector("#rescheduleButton");
const notificationStatus = document.querySelector("#notificationStatus");
const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");
const userCountInput = document.querySelector("#userCountInput");
const exactUserCount = document.querySelector("#exactUserCount");
const publicUserCount = document.querySelector("#publicUserCount");
const paymentCards = Array.from(document.querySelectorAll(".payment-card"));
const paymentNote = document.querySelector("#paymentNote");
const adminLoginForm = document.querySelector("#adminLoginForm");
const adminDashboard = document.querySelector("#adminDashboard");
const adminGateStatus = document.querySelector("#adminGateStatus");
const adminLogout = document.querySelector("#adminLogout");
const serviceChart = document.querySelector("#serviceChart");
const requestChart = document.querySelector("#requestChart");
const languageButtons = Array.from(document.querySelectorAll(".language-option"));
const richMenuButtons = Array.from(document.querySelectorAll(".rich-menu-preview button"));
const actionToast = document.createElement("div");
actionToast.className = "action-toast";
actionToast.setAttribute("role", "status");
actionToast.setAttribute("aria-live", "polite");
document.body.appendChild(actionToast);
let toastTimer;

const i18n = {
  th: {
    htmlLang: "th",
    locale: "th-TH",
    title: "จำให้ที - Reminder Draft",
    html: {
      ".hero h1": "<span>บริการดูแล</span><span>การแจ้งเตือน</span><span>เรื่องสำคัญ</span>",
      ".profile-lead h2": "<span>บริการสำหรับคนที่</span><span>มีเรื่องสำคัญต้องดูแล</span><span>แต่ไม่อยากพลาดเวลา</span>"
    },
    text: {
      ".top-actions a[href=\"#membership\"]": "สมัครสมาชิก",
      ".top-actions a[href=\"#owner\"]": "เจ้าของเว็บ",
      ".top-actions a[href=\"#line-expert\"]": "ผู้เชี่ยวชาญ",
      ".top-actions a[href=\"#pricing\"]": "แพ็กเกจ",
      ".top-actions a[href=\"#topics\"]": "เริ่มตั้งเตือน",
      ".hero .eyebrow": "CARE REMINDER SERVICE",
      ".hero-copy": "เราช่วยจัดระบบเรื่องที่ไม่ควรถูกลืม ตั้งแต่รถ สุขภาพ เอกสาร บ้าน ไปจนถึงธุรกิจ ด้วยการเตือนที่ตรงเวลา สุภาพ และคำนึงถึงความปลอดภัยของข้อมูลลูกค้าเป็นอันดับแรก",
      ".hero-summary span:nth-child(1)": "ดูแลเป็นรายบุคคล",
      ".hero-summary span:nth-child(2)": "SMS / LINE พร้อมต่อยอด",
      ".hero-summary span:nth-child(3)": "รายงานภาพรวมผู้ดูแล",
      ".hero-summary span:nth-child(4)": "ข้อมูลลูกค้าปลอดภัยก่อน",
      ".primary-link": "ดูแนวทางบริการ",
      ".mission-topline span": "เรดาร์ตลาดจากข้อมูล",
      ".mission-topline strong": "อ้างอิงแหล่งจริง",
      ".radial-meter strong": "50%",
      ".radial-meter span": "ยาต่อเนื่อง",
      ".kpi-one strong": "สัญญาณหลัก",
      ".kpi-one span": "สุขภาพ/นัดหมาย",
      ".kpi-two strong": "LINE 54M",
      ".kpi-two span": "ช่องทางไทย",
      ".mission-grid div:nth-child(1) span": "หลักฐาน 1",
      ".mission-grid div:nth-child(1) strong": "ยา/นัดหมาย",
      ".mission-grid div:nth-child(2) span": "หลักฐาน 2",
      ".mission-grid div:nth-child(2) strong": "รถ/ยาง/ของเหลว",
      ".mission-grid div:nth-child(3) span": "หลักฐาน 3",
      ".mission-grid div:nth-child(3) strong": "บิล/เอกสารต่ออายุ",
      ".trust-strip strong": "เราออกแบบบริการให้ห่วงใยลูกค้า และระวังข้อมูลตั้งแต่วันแรก",
      ".trust-strip div span": "เวอร์ชันร่างนี้ยังไม่เก็บข้อมูลบน server, ยังไม่ส่ง SMS จริง, และยังไม่ต่อระบบชำระเงินจริง",
      ".safe-pill": "Draft safe mode",
      "#evidence .section-head h2": "ข้อมูลที่ใช้วางตลาดให้ตรงเป้า",
      "#evidence .evidence-card:nth-child(1) h3": "สุขภาพ ยาต่อเนื่อง และนัดหมาย",
      "#evidence .evidence-card:nth-child(1) p": "WHO/CDC ชี้ว่าการใช้ยาตามแผนรักษายังเป็นปัญหาใหญ่ของโรคเรื้อรัง และงาน review พบว่าระบบ reminder ช่วยลดการไม่มาตามนัดได้",
      "#evidence .evidence-card:nth-child(1) a": "CDC / WHO signal",
      "#evidence .evidence-card:nth-child(2) h3": "รถ ยาง ของเหลว และแบตเตอรี่",
      "#evidence .evidence-card:nth-child(2) p": "NHTSA แนะนำตรวจยางรายเดือน และข้อมูล Car Care พบปัญหาซ้ำในน้ำมัน/ของเหลว ไส้กรอง สายพาน ท่อ และแบตเตอรี่",
      "#evidence .evidence-card:nth-child(2) a": "NHTSA / Car Care",
      "#evidence .evidence-card:nth-child(3) h3": "บิล ค่างวด และเอกสารหมดอายุ",
      "#evidence .evidence-card:nth-child(3) p": "กลุ่มนี้มีวันครบกำหนดชัดเจน เหมาะกับ reminder แบบเตือนล่วงหน้า เตือนซ้ำ และให้เลื่อนวันได้โดยไม่ต้องเก็บข้อมูลละเอียดเกินจำเป็น",
      "#evidence .evidence-card:nth-child(3) a": "Reminder design",
      "#evidence .evidence-card:nth-child(4) h3": "LINE-first สำหรับตลาดไทย",
      "#evidence .evidence-card:nth-child(4) p": "LY Corporation รายงานว่าไทยมีผู้ใช้ LINE 54 ล้านคนในปี 2024 จึงเหมาะกับ rich menu, LIFF และ AI ผู้เชี่ยวชาญสำหรับทดลองตลาด",
      "#evidence .evidence-card:nth-child(4) a": "LINE Thailand signal",
      ".profile-lead .eyebrow": "WHO WE CARE FOR",
      ".profile-lead p:last-child": "เราช่วยเปลี่ยนรายละเอียดเล็ก ๆ ในชีวิตประจำวันให้เป็นระบบดูแลที่ชัดเจน ตั้งแต่วันถ่ายน้ำมันเครื่อง วันนัดหมอ วันหมดอายุเอกสาร ไปจนถึงรอบดูแลบ้าน เพื่อให้ลูกค้ารู้สึกอุ่นใจว่ามีคนช่วยจำอย่างเป็นระบบ",
      ".profile-card.dark .eyebrow": "SERVICE PROMISE",
      ".profile-card.dark h3": "วางแผนแจ้งเตือนอย่างใส่ใจ",
      ".profile-card.dark p:last-child": "ลูกค้าเลือกเรื่องที่ต้องการดูแล กรอกเฉพาะข้อมูลที่จำเป็น แล้วระบบช่วยจัดรอบเตือนให้เข้าใจง่าย ไม่กดดัน และไม่รบกวนเกินจำเป็น",
      ".profile-card:nth-child(2) .eyebrow": "MEMBER CARE",
      ".profile-card:nth-child(2) h3": "บัญชีที่ออกแบบเพื่อความสบายใจ",
      ".profile-card:nth-child(2) p:last-child": "รองรับชื่อ เบอร์มือถือ LINE ID และช่องทางแจ้งเตือนที่ลูกค้าเลือก พร้อมหลักคิดเก็บข้อมูลเท่าที่จำเป็น",
      ".profile-card:nth-child(3) .eyebrow": "BUSINESS READY",
      ".profile-card:nth-child(3) h3": "ต่อยอดเป็นบริการรายเดือนได้",
      ".profile-card:nth-child(3) p:last-child": "เตรียมแนวทางชำระเงินและแดชบอร์ดผู้ดูแลไว้เป็นร่าง ก่อนต่อระบบบัตร ธนาคาร หรือแพลตฟอร์มจริงอย่างปลอดภัย",
      "#line-expert .section-head h2": "ทดลอง LINE เมนูการตลาด + AI ผู้เชี่ยวชาญดูแล",
      ".line-header strong": "จำให้ที",
      ".line-header span": "Official Account draft",
      ".expert-intro": "สวัสดีค่ะ เลือกเรื่องที่อยากให้ช่วยดูแล หรือถามผู้เชี่ยวชาญลินได้เลย",
      ".sample-user": "อยากตั้งเตือนต่อภาษีรถ",
      ".expert-answer": "ได้ค่ะ ขอรุ่นรถ วันหมดอายุ และช่องทางแจ้งเตือน ผู้เชี่ยวชาญจะช่วยจัดรอบเตือนให้",
      ".rich-menu-preview button:nth-child(1)": "ตั้งเตือน",
      ".rich-menu-preview button:nth-child(2)": "เช็กสถานะ",
      ".rich-menu-preview button:nth-child(3)": "ถามผู้เชี่ยวชาญ",
      ".rich-menu-preview button:nth-child(4)": "เลื่อนนัด",
      ".rich-menu-preview button:nth-child(5)": "แพ็กเกจ",
      ".rich-menu-preview button:nth-child(6)": "ติดต่อทีมงาน",
      ".line-panel:not(.line-phone) h3": "เริ่มจาก LINE OA ที่เป็นหน้าร้านก่อน แล้วค่อยต่อผู้เชี่ยวชาญ AI จริง",
      ".line-checklist li:nth-child(1)": "Rich menu: ปุ่มตั้งเตือน เช็กสถานะ ถามผู้เชี่ยวชาญ เลื่อนนัด แพ็กเกจ ติดต่อทีมงาน",
      ".line-checklist li:nth-child(2)": "LIFF: เปิดฟอร์มเว็บใน LINE โดยไม่ต้องออกจากแชท",
      ".line-checklist li:nth-child(3)": "ผู้เชี่ยวชาญ AI: ตอบคำถามทั่วไป ช่วยกรอกข้อมูล และส่งต่อคนจริงเมื่อเสี่ยงหรือซับซ้อน",
      ".line-checklist li:nth-child(4)": "Safety: ไม่ส่งข้อมูลสุขภาพ/เบอร์/LINE ID ไปหา AI จนกว่าจะมี consent และนโยบายข้อมูลจริง",
      "#pricing .section-head h2": "ทดลองก่อนจ่ายจริง แล้วค่อยเริ่มแพ็กเกจรายเดือน",
      ".pricing-intro": "บริการนี้วางให้มี 2 แกนหลัก: แจ้งเตือนเรื่องสำคัญ และบันทึกรายรับรายจ่ายพร้อมสรุปพฤติกรรมการใช้เงิน โดยเริ่มจาก LINE เป็นช่องทางหลัก และแยก SMS เป็นเครดิตเสริมเพื่อคุมต้นทุนให้ยุติธรรม",
      ".pricing-card:nth-child(1) .plan-tag": "ทดลองใช้ฟรี",
      ".pricing-card:nth-child(1) h3": "ทดลองใช้",
      ".pricing-card:nth-child(1) .price-line strong": "ฟรี 30 วัน",
      ".pricing-card:nth-child(1) .price-line span": "ไม่ต้องผูกบัตร",
      ".pricing-card:nth-child(1) li:nth-child(1)": "ตั้งเตือนเรื่องสำคัญแบบพื้นฐาน",
      ".pricing-card:nth-child(1) li:nth-child(2)": "บันทึกรายรับรายจ่ายแบบร่าง",
      ".pricing-card:nth-child(1) li:nth-child(3)": "ดูสรุปรายวันและรายเดือน",
      ".pricing-card:nth-child(1) .plan-button": "เริ่มทดลอง",
      ".pricing-card:nth-child(2) .plan-tag": "แนะนำเริ่มต้น",
      ".pricing-card:nth-child(2) h3": "เริ่มต้น",
      ".pricing-card:nth-child(2) .price-line strong": "49 บาท/เดือน",
      ".pricing-card:nth-child(2) .price-line span": "เดือนแรกหลังทดลอง 29 บาท",
      ".pricing-card:nth-child(2) li:nth-child(1)": "แจ้งเตือนผ่าน LINE ตามรอบเช้า กลางวัน เย็น",
      ".pricing-card:nth-child(2) li:nth-child(2)": "กดรับทราบแล้วหยุดเตือนซ้ำในวันนั้น",
      ".pricing-card:nth-child(2) li:nth-child(3)": "บันทึกรายรับรายจ่ายและดูกราฟเปรียบเทียบ",
      ".pricing-card:nth-child(2) .plan-button": "เลือกแพ็กนี้",
      ".pricing-card:nth-child(3) .plan-tag": "ดูแลครบ",
      ".pricing-card:nth-child(3) h3": "Care Plus",
      ".pricing-card:nth-child(3) .price-line strong": "99 บาท/เดือน",
      ".pricing-card:nth-child(3) .price-line span": "สำหรับคนที่อยากให้ช่วยดูละเอียดขึ้น",
      ".pricing-card:nth-child(3) li:nth-child(1)": "แนบบิลหรือรูปใบเสร็จเป็นหลักฐานในอนาคต",
      ".pricing-card:nth-child(3) li:nth-child(2)": "สรุปค่าใช้จ่ายรายวัน รายเดือน และหมวดที่ใช้เยอะ",
      ".pricing-card:nth-child(3) li:nth-child(3)": "คำแนะนำงบประมาณว่าไม่ควรใช้เกินเท่าไหร่",
      ".pricing-card:nth-child(3) .plan-button": "ดูระบบผู้เชี่ยวชาญ",
      ".pricing-card:nth-child(4) .plan-tag": "เครดิตเสริม",
      ".pricing-card:nth-child(4) h3": "SMS Add-on",
      ".pricing-card:nth-child(4) .price-line strong": "เติมเครดิต",
      ".pricing-card:nth-child(4) .price-line span": "คิดตามจำนวนข้อความจริง",
      ".pricing-card:nth-child(4) li:nth-child(1)": "เหมาะกับลูกค้าที่ไม่ได้ใช้ LINE",
      ".pricing-card:nth-child(4) li:nth-child(2)": "แนะนำเริ่มแบบเติมเครดิตก่อนเปิดแพ็ก SMS เหมา",
      ".pricing-card:nth-child(4) li:nth-child(3)": "ราคา SMS ต้องล็อกกับผู้ให้บริการก่อนเปิดขายจริง",
      ".pricing-card:nth-child(4) .plan-button": "ดูช่องทางจ่าย",
      ".pricing-note strong": "ข้อเสนอเปิดตัวที่ลินแนะนำ:",
      ".pricing-note span": "ทดลองใช้ฟรี 30 วัน จากนั้นเดือนแรก 29 บาท แล้วค่อยเป็น 49 บาท/เดือน หากลูกค้าต้องใช้ SMS ให้เติมเครดิตแยก เพื่อไม่ให้แพ็กหลักแพงเกินไป",
      "#membership .section-head h2": "สมัครสมาชิกและเลือกช่องทางแจ้งเตือน",
      "#registerForm h3": "สมัครสมาชิก",
      "#loginForm h3": "เข้าสู่ระบบ",
      "#registerForm button[type=\"submit\"]": "สร้างบัญชีร่าง",
      "#loginForm button[type=\"submit\"]": "เข้าสู่ระบบแบบร่าง",
      "#loginStatus": "ระบบจริงควรใช้ OTP/2FA และเข้ารหัสข้อมูล",
      "#owner .section-head h2": "มุมเจ้าของเว็บ",
      "#adminLoginForm h3": "ล็อกอินก่อนดูข้อมูลผู้ใช้บริการ",
      "#adminLoginForm .muted": "แดชบอร์ดนี้แสดงเฉพาะข้อมูลรวม ไม่แสดงเบอร์มือถือ LINE ID หรือข้อมูลส่วนตัวรายคนในเวอร์ชันร่าง",
      "#adminLoginForm button": "เข้าสู่แดชบอร์ด",
      ".owner-grid article:nth-of-type(1) .muted": "ผู้ใช้บริการทั้งหมด",
      ".owner-grid article:nth-of-type(1) span": "เห็นเฉพาะเจ้าของเว็บ",
      ".owner-grid article:nth-of-type(2) .muted": "ตัวเลขที่แสดงต่อสาธารณะ",
      ".owner-grid article:nth-of-type(2) span": "กติกา: แสดง 500+ เมื่อยอดถึง 500 ขึ้นไป",
      ".owner-grid article:nth-of-type(3) .muted": "สถานะระบบ",
      ".status-list li:nth-child(1)": "Admin: ต้องล็อกอินก่อนเห็นข้อมูลรวม",
      ".status-list li:nth-child(2)": "สมาชิก: mockup เท่านั้น",
      ".status-list li:nth-child(3)": "SMS/LINE: ยังไม่ส่งจริง",
      ".status-list li:nth-child(4)": "Payment: ยังไม่ตัดเงินจริง",
      ".status-list li:nth-child(5)": "ข้อมูลลูกค้า: แสดงเฉพาะภาพรวม ไม่โชว์ข้อมูลส่วนตัว",
      ".owner-grid article:nth-of-type(4) .muted": "สัญญาณตลาดจากแหล่งข้อมูล",
      ".owner-grid article:nth-of-type(4) h3": "หมวดที่ควรทดลองก่อน",
      ".owner-grid article:nth-of-type(5) .muted": "พฤติกรรมการแจ้งเตือน",
      ".owner-grid article:nth-of-type(5) h3": "ฟังก์ชันที่ช่วยให้ไม่พลาดซ้ำ",
      ".admin-note-card .muted": "มุมตัดสินใจของเจ้าของเว็บ",
      ".admin-note-card strong": "ดูภาพรวมก่อนเปิดข้อมูลจริง",
      ".admin-note-card span": "ระบบจริงควรใช้สิทธิ์ผู้ดูแล, 2FA, audit log, เข้ารหัสฐานข้อมูล และแยกข้อมูลส่วนตัวออกจากสถิติรวม",
      "#adminLogout": "ออกจากแดชบอร์ด",
      "#payment .section-head h2": "ช่องทางเก็บเงินที่เตรียมไว้เป็นร่าง",
      ".payment-card[data-payment=\"card\"] strong": "บัตรเครดิต/เดบิต",
      ".payment-card[data-payment=\"card\"] span": "ใช้ gateway ที่ไม่เก็บเลขบัตรไว้ในระบบเรา",
      ".payment-card[data-payment=\"bank\"] strong": "เติมเงินผ่านแอปธนาคาร",
      ".payment-card[data-payment=\"bank\"] span": "เหมาะกับ QR / PromptPay / โอนเข้าบัญชีธุรกิจ",
      ".payment-card[data-payment=\"wallet\"] strong": "แพลตฟอร์ม/วอลเล็ต",
      ".payment-card[data-payment=\"wallet\"] span": "ต่อยอดกับช่องทางที่ลูกค้าไทยคุ้นเคย",
      ".payment-card[data-payment=\"prepaid\"] strong": "ระบบเติมเครดิต",
      ".payment-card[data-payment=\"prepaid\"] span": "ลูกค้าเติมเงินไว้ แล้วหักตาม SMS หรือแพ็กเกจ",
      ".process-section .section-head h2": "ขั้นตอนใช้งาน",
      ".process-grid div:nth-child(1) span": "สมัครสมาชิกและเลือกช่องทางแจ้งเตือน",
      ".process-grid div:nth-child(2) span": "เลือกรายการที่ต้องการให้ช่วยจำ",
      ".process-grid div:nth-child(3) span": "กรอกหรือติ๊กเฉพาะข้อมูลที่เกี่ยวข้อง",
      ".process-grid div:nth-child(4) span": "ระบบสร้างแผนเตือน ก่อนต่อ SMS/LINE จริง",
      ".topics-section .section-head h2": "อยากให้ช่วยจำเรื่องไหน",
      "#reminderForm .panel-heading h2": "เลือกเรื่องที่ต้องการก่อน",
      "#reminderForm button[type=\"submit\"]": "สร้างแผนแจ้งเตือน",
      "#resultPanel .panel-heading h2": "แผนแจ้งเตือนร่าง",
      ".notification-card h3": "รอบแจ้งเตือนวันนี้",
      ".notification-card .muted": "ระบบจะเตือน 3 เวลา หากกดรับทราบแล้วจะไม่แจ้งเตือนซ้ำในวันนั้น",
      "#acknowledgeToday": "รับทราบแล้ว",
      "#resetAck": "ยกเลิกรับทราบ",
      "#rescheduleButton": "เลื่อนวัน/เวลาแจ้งเตือน",
      ".message-card .muted": "ข้อความตัวอย่าง",
      "#copyMessage": "คัดลอก",
      "#simulateSend": "บันทึกทดสอบ"
    },
    placeholders: {
      "#memberName": "ชื่อที่ต้องการให้ระบบเรียก",
      "#memberPhone": "ใช้รับ SMS หรือ OTP ในอนาคต",
      "#memberLine": "ใช้สำหรับผูก LINE แจ้งเตือน",
      "#memberPass": "mockup เท่านั้น ยังไม่บันทึกจริง",
      "#loginId": "ใช้สำหรับเข้าสู่ระบบ",
      "#loginPass": "mockup เท่านั้น",
      "#adminUser": "เช่น owner@jamhaitee",
      "#adminPass": "mockup เท่านั้น",
      "#customerName": "ชื่อที่ต้องการให้ระบบเรียก",
      "#phone": "ใช้รับ SMS ในอนาคต",
      "#vehicleModel": "เช่น Toyota Altis",
      "#vehicleYear": "เช่น 2020",
      "#mileage": "เช่น 85000",
      "#symptoms": "เล่าอาการ สิ่งที่กังวล หรือสิ่งที่อยากให้เตือน"
    },
    labels: {
      "#memberName": "ชื่อสมาชิก",
      "#memberPhone": "เบอร์มือถือ",
      "#memberLine": "LINE ID",
      "#memberChannel": "ช่องทางหลัก",
      "#memberPass": "รหัสผ่านหรือ OTP",
      "#loginId": "เบอร์มือถือหรือ LINE ID",
      "#loginPass": "รหัสผ่านหรือ OTP",
      "#adminUser": "บัญชีผู้ดูแล",
      "#adminPass": "รหัสผ่านหรือ OTP",
      "#customerName": "ชื่อผู้รับแจ้งเตือน",
      "#phone": "เบอร์โทร",
      "#channel": "ช่องทางแจ้งเตือน",
      "#notifyTime": "เวลาที่สะดวกรับเตือน",
      "#vehicleModel": "ยี่ห้อ/รุ่นรถ",
      "#vehicleYear": "ปีรถ",
      "#mileage": "เลขไมล์ปัจจุบัน",
      "#usageLevel": "ใช้งานรถ",
      "#lastService": "เช็กล่าสุด",
      "#lastOilChange": "ถ่ายน้ำมันเครื่องล่าสุด",
      "#symptoms": "รายละเอียดเพิ่มเติม",
      "#frequency": "ความถี่ของปัญหา",
      "#severity": "ระดับความสำคัญ",
      "#rescheduleDate": "เลื่อนเป็นวันที่",
      "#rescheduleTime": "เวลาใหม่",
      "#userCountInput": "ปรับยอดจำลอง"
    },
    smallAfter: {
      "#customerName": "ใช้สำหรับขึ้นต้นข้อความแจ้งเตือน",
      "#phone": "เวอร์ชันร่างยังไม่ส่ง SMS จริง",
      "#channel": "เลือกช่องทางหลักที่อยากให้ระบบเตือน",
      "#notifyTime": "แนะนำช่วงที่เห็นข้อความง่าย",
      "#vehicleModel": "ช่วยให้คำเตือนอ่านรู้เรื่องขึ้น",
      "#vehicleYear": "ใช้ประเมินอายุรถคร่าว ๆ",
      "#mileage": "ช่วยแนะนำรอบเปลี่ยนตามกิโล",
      "#usageLevel": "รถใช้งานหนักควรเตือนถี่ขึ้น",
      "#lastService": "ถ้าไม่แน่ใจเว้นไว้ได้",
      "#lastOilChange": "ใช้คำนวณรอบเตือนครั้งถัดไป",
      "#symptoms": "กรอกเท่าที่จำเป็น ไม่ต้องใส่ข้อมูลอ่อนไหวเกินจำเป็น",
      "#frequency": "ช่วยประเมินว่าควรเตือนเร็วแค่ไหน"
    },
    options: {
      "#usageLevel": ["ปกติ", "น้อย", "หนัก/ทุกวัน"],
      "#frequency": ["ครั้งเดียว", "บางครั้ง", "บ่อย", "ทุกครั้ง"]
    },
    checkbox: {
      "#memberConsent": "ยินยอมให้ใช้ข้อมูลนี้เพื่อสมัครสมาชิกและส่งแจ้งเตือนเท่านั้น",
      "#consent": "ยินยอมให้ใช้ข้อมูลนี้เพื่อสร้างรายการแจ้งเตือนเท่านั้น"
    },
    topics: {
      car: ["รถยนต์", "ยาง ของเหลว แบตเตอรี่ ภาษี ประกัน"],
      home: ["บ้าน/คอนโด", "ล้างแอร์ ไส้กรอง ค่าส่วนกลาง งานซ่อม"],
      health: ["สุขภาพ/ยา", "กินยา นัดหมอ ติดตามอาการ ตรวจสุขภาพ"],
      document: ["บิล/เอกสาร", "ค่างวด ประกัน บัตร ใบอนุญาต สัญญา วันหมดอายุ"],
      business: ["ธุรกิจ", "อุปกรณ์ รอบจ่ายเงิน ต่อสัญญา ติดตามลูกค้า"]
    },
    topicConfig: {
      car: { title: "แบบสอบถามรถยนต์", placeholder: "เช่น สตาร์ทยาก มีไฟเตือน หรืออยากตั้งรอบบำรุงรักษา", checks: ["น้ำมันเครื่อง", "แบตเตอรี่", "ยาง/ลมยาง", "เบรก", "แอร์", "ภาษี/พ.ร.บ./ประกัน"] },
      home: { title: "แบบสอบถามบ้าน/คอนโด", placeholder: "เช่น ล้างแอร์ เปลี่ยนไส้กรอง หรือจ่ายค่าส่วนกลาง", checks: ["ล้างแอร์", "ไส้กรองน้ำ", "ค่าส่วนกลาง", "ปลวก/แมลง", "ประกันบ้าน", "งานซ่อม"] },
      health: { title: "แบบสอบถามสุขภาพ/ยา", placeholder: "เช่น ต้องการเตือนกินยา นัดหมอ หรือติดตามอาการ", checks: ["กินยา", "นัดหมอ", "ตรวจสุขภาพ", "วัดความดัน", "ออกกำลังกาย", "รับยาเพิ่ม"] },
      document: { title: "แบบสอบถามบิล/เอกสาร", placeholder: "เช่น ค่างวด ประกัน ต่ออายุบัตร ใบอนุญาต สัญญา หรือโดเมน", checks: ["ค่างวด/บิล", "ประกัน", "บัตรประชาชน", "ใบขับขี่", "พาสปอร์ต", "สัญญา/โดเมน"] },
      business: { title: "แบบสอบถามธุรกิจ", placeholder: "เช่น บำรุงอุปกรณ์ ต่อสัญญา หรือรอบจ่ายเงิน", checks: ["อุปกรณ์", "รอบจ่ายเงิน", "ต่อสัญญา", "ภาษี", "ใบอนุญาต", "ติดตามลูกค้า"] }
    },
    stats: {
      service: [{ label: "สุขภาพ/ยา/นัดหมาย", value: 50 }, { label: "รถ/ยาง/ของเหลว", value: 42 }, { label: "บิล/ค่างวด/เอกสาร", value: 34 }, { label: "บ้าน/คอนโด", value: 26 }, { label: "ธุรกิจ/รอบจ่ายเงิน", value: 22 }],
      request: [{ label: "LINE rich menu", value: 54 }, { label: "AI ช่วยตอบคำถาม", value: 46 }, { label: "เตือนซ้ำจนรับทราบ", value: 40 }, { label: "เลื่อนวันแจ้งเตือนเอง", value: 33 }, { label: "แพ็กเกจเติมเครดิต", value: 24 }]
    },
    paymentNotes: {
      card: "บัตรควรผ่าน payment gateway เท่านั้น ระบบเราไม่ควรเก็บเลขบัตรเอง",
      bank: "เหมาะกับ QR / PromptPay / โอนผ่านแอปธนาคาร แล้วให้ระบบตรวจสถานะภายหลัง",
      wallet: "เหมาะกับลูกค้าที่คุ้นกับแพลตฟอร์มจ่ายเงิน แต่ต้องดูค่าธรรมเนียมและเงื่อนไข",
      prepaid: "เหมาะกับบริการ SMS เพราะลูกค้าเติมเครดิตไว้ แล้วหักตามการใช้งานหรือแพ็กเกจ"
    },
    runtime: {
      defaultName: "ลูกค้า",
      newMember: "สมาชิกใหม่",
      noDate: "ยังไม่ตั้งวัน",
      quickChecksTitle: "เลือกเฉพาะเรื่องที่ต้องการเตือน",
      slots: [{ label: "เช้า", time: "08:00" }, { label: "กลางวัน", time: "12:30" }, { label: "เย็น", time: "18:30" }],
      risk: {
        high: { label: "ควรรีบตรวจเช็ก", badge: "High" },
        medium: { label: "ควรเฝ้าระวัง", badge: "Watch" },
        low: { label: "รอบดูแลปกติ", badge: "Normal" }
      },
      dynamic: {
        car: {
          workDoneLabel: "ทำอะไรไปแล้วบ้าง",
          workDonePlaceholder: "เช่น เปลี่ยนแบตเตอรี่แล้ว / ยังไม่ได้ทำ",
          handledLabel: "จัดการแล้วหรือยัง",
          handledOptions: ["ยังไม่ได้จัดการ", "จัดการแล้ว", "นัดช่างแล้ว", "ไม่แน่ใจ"],
          warningLabel: "ไฟสัญญาณเตือนหน้าปัด",
          warningOptions: ["ไม่มี", "ไฟเครื่องยนต์", "ไฟแบตเตอรี่", "ไฟน้ำมันเครื่อง", "ไฟเบรก/ABS", "ไฟความร้อน", "อื่น ๆ / ไม่แน่ใจ"],
          guideTitle: "คำแนะนำรอบเปลี่ยนโดยประมาณ",
          guide: [
            { label: "น้ำมันเครื่อง", interval: "ทุก 5,000-10,000 กม. หรือ 6-12 เดือน" },
            { label: "ไส้กรองน้ำมันเครื่อง", interval: "เปลี่ยนพร้อมน้ำมันเครื่อง" },
            { label: "ไส้กรองอากาศ", interval: "ทุก 20,000 กม. หรือเมื่อสกปรก" },
            { label: "น้ำมันเบรก", interval: "ทุก 40,000 กม. หรือประมาณ 2 ปี" },
            { label: "น้ำหล่อเย็น", interval: "ทุก 40,000-80,000 กม. ตามคู่มือรถ" },
            { label: "แบตเตอรี่", interval: "ตรวจทุก 6 เดือน โดยทั่วไป 2-3 ปีควรเฝ้าระวัง" },
            { label: "ยาง", interval: "สลับยางทุก 10,000 กม. เปลี่ยนเมื่อดอกยางต่ำ/แตกลาย" }
          ]
        },
        health: {
          startYearLabel: "เริ่มเป็นปีไหน",
          startYearPlaceholder: "เช่น 2022",
          doctorVisitLabel: "พบแพทย์/นัดล่าสุด",
          currentMedicineLabel: "ยาหรือการดูแลที่ใช้อยู่",
          currentMedicinePlaceholder: "ชื่อยา เวลาใช้ หรือวิธีดูแล",
          medicineStatusLabel: "สถานะการใช้ยา",
          medicineStatusOptions: ["กิน/ใช้ตามปกติ", "ขาดยา/ลืมบ่อย", "รอพบแพทย์", "ไม่แน่ใจ"]
        },
        generic: {
          startLabel: "เริ่มดูแลเรื่องนี้ตั้งแต่",
          startPlaceholder: "เช่น เดือนนี้ / ปีที่แล้ว / ยังไม่เคย",
          handledLabel: "จัดการแล้วหรือยัง",
          handledOptions: ["ยังไม่ได้จัดการ", "จัดการแล้ว", "นัดหมายแล้ว", "ไม่แน่ใจ"]
        }
      },
      reminder: {
        checkedFallback: "รายการที่เลือก",
        car: {
          checkTitle: "ตรวจเช็กรถเบื้องต้น",
          guideTitle: "แนะนำรอบบำรุงรักษา",
          docsTitle: "เอกสารรถ",
          docsDetail: "พ.ร.บ. ประกัน ภาษี และเอกสารสำคัญ",
          symptomPrefix: "อาการ",
          focusPrefix: "โฟกัส",
          year: "ปีรถ",
          mileage: "เลขไมล์",
          mileageUnit: "กม.",
          lastOil: "ถ่ายน้ำมันเครื่องล่าสุด",
          warning: "ไฟเตือน",
          workDone: "ทำแล้ว",
          status: "สถานะ"
        },
        health: {
          trackTitle: "ติดตามอาการและยา",
          medicineTitle: "เตือนนัด/รับยา",
          symptomFallback: "ติดตามอาการตามที่ลูกค้าระบุ",
          medicineDetail: "ตรวจว่ายาพอถึงนัดครั้งถัดไป และบันทึกอาการเปลี่ยนแปลง",
          startYear: "เริ่มเป็นปี",
          currentMedicine: "ยา/การดูแล",
          doctorVisit: "นัด/พบแพทย์ล่าสุด",
          medicineStatus: "สถานะยา"
        },
        categories: {
          home: ["ดูแลบ้าน/คอนโด", "ล้างแอร์ ไส้กรอง ค่าส่วนกลาง และงานซ่อม"],
          document: ["เอกสารสำคัญ", "ต่ออายุบัตร ใบอนุญาต สัญญา หรือโดเมน"],
          business: ["ธุรกิจ/อุปกรณ์", "บำรุงอุปกรณ์ ต่อสัญญา รอบจ่ายเงิน และติดตามลูกค้า"],
          default: ["รายการแจ้งเตือน", "ตั้งรอบตามที่ลูกค้าต้องการ"]
        },
        followUpTitle: "ติดตามผลซ้ำ",
        followUpDetail: "ถามลูกค้าว่าดำเนินการแล้วหรือยัง",
        trackPrefix: "ติดตาม"
      },
      toast: {
        create: "เปิดหัวข้อแจ้งเตือนแล้ว เลือกเรื่องที่ต้องการได้เลย",
        status: "ไปที่มุมเจ้าของเว็บแล้ว ระบบจริงต้องล็อกอินก่อนดูสถานะ",
        expert: "เปิดพื้นที่ผู้เชี่ยวชาญแล้ว",
        reschedule: "เปิดส่วนเลื่อนนัดแล้ว หากยังไม่มีแผนให้เลือกหัวข้อก่อน",
        plans: "เปิดแพ็กเกจบริการแล้ว",
        support: "เปิดสมัครสมาชิก/ช่องทางติดต่อแล้ว",
        copiedFallback: "เลือกข้อความในกล่องเพื่อคัดลอกได้เลย"
      }
    },
    messages: {
      notPublic: "ยังไม่แสดง",
      adminOpen: "เข้าสู่แดชบอร์ดผู้ดูแลแบบร่างแล้ว แสดงเฉพาะข้อมูลรวม",
      adminClosed: "ออกจากแดชบอร์ดแล้ว ข้อมูลรวมถูกซ่อนไว้",
      adminMissing: "กรอกบัญชีผู้ดูแลและรหัสผ่าน/OTP ก่อนเปิดแดชบอร์ด",
      memberDefault: "ยังไม่มีข้อมูลสมาชิกถูกบันทึกจริง",
      memberOk: (name, channel) => `บัญชีร่างของ ${name} พร้อมช่องทาง ${channel} แล้ว แต่ยังไม่บันทึกลง server`,
      memberConsent: "ต้องขอความยินยอมก่อนสร้างบัญชีจริง",
      loginOk: "เข้าสู่ระบบแบบร่างสำเร็จ ในระบบจริงควรใช้ OTP/2FA",
      copy: "คัดลอก",
      copied: "คัดลอกแล้ว",
      phoneMissing: "ยังไม่ระบุเบอร์",
      sendTest: (time, channel, phone) => `${time} - ทดสอบส่ง ${channel} ไปที่ ${phone}`,
      ack: "รับทราบแล้ว วันนี้ระบบจะไม่แจ้งเตือนซ้ำ",
      rescheduleMissing: "กรุณาเลือกวันที่ใหม่ก่อนเลื่อนแจ้งเตือน",
      rescheduled: (date, time) => `เลื่อนแจ้งเตือนเป็น ${date} เวลา ${time}`,
      todayPolicy: "วันนี้จะเตือน 3 รอบ: เช้า กลางวัน เย็น จนกว่าจะกดรับทราบ"
    }
  },
  en: {
    htmlLang: "en",
    locale: "en-US",
    title: "Jam Hai Tee - Reminder Draft",
    html: {
      ".hero h1": "<span>Care-driven</span> <span>reminder service</span> <span>for important moments</span>",
      ".profile-lead h2": "<span>For people with</span><span>important things to care for</span><span>and no room to miss them</span>"
    },
    text: {
      ".top-actions a[href=\"#membership\"]": "Join",
      ".top-actions a[href=\"#owner\"]": "Owner",
      ".top-actions a[href=\"#line-expert\"]": "Expert",
      ".top-actions a[href=\"#pricing\"]": "Plans",
      ".top-actions a[href=\"#topics\"]": "Start",
      ".hero .eyebrow": "CARE REMINDER SERVICE",
      ".hero-copy": "We help organize the things customers should not forget, from vehicles and health to documents, home care, and business routines, with timely, polite reminders designed around data safety first.",
      ".hero-summary span:nth-child(1)": "Personal care",
      ".hero-summary span:nth-child(2)": "SMS / LINE ready",
      ".hero-summary span:nth-child(3)": "Owner overview",
      ".hero-summary span:nth-child(4)": "Data safety first",
      ".primary-link": "Explore service",
      ".mission-topline span": "SOURCE-BACKED MARKET RADAR",
      ".mission-topline strong": "VERIFIED SIGNALS",
      ".radial-meter strong": "50%",
      ".radial-meter span": "long-term medicine",
      ".kpi-one strong": "Primary signal",
      ".kpi-one span": "health / appointments",
      ".kpi-two strong": "LINE 54M",
      ".kpi-two span": "Thailand channel",
      ".mission-grid div:nth-child(1) span": "Evidence 1",
      ".mission-grid div:nth-child(1) strong": "medicine / appointments",
      ".mission-grid div:nth-child(2) span": "Evidence 2",
      ".mission-grid div:nth-child(2) strong": "car / tires / fluids",
      ".mission-grid div:nth-child(3) span": "Evidence 3",
      ".mission-grid div:nth-child(3) strong": "bills / renewals",
      ".trust-strip strong": "Designed to care for customers and protect data from day one",
      ".trust-strip div span": "This draft does not store server data, send real SMS, or connect real payments.",
      ".safe-pill": "Draft safe mode",
      "#evidence .section-head h2": "Market evidence for sharper targeting",
      "#evidence .evidence-card:nth-child(1) h3": "Health, long-term medicine, and appointments",
      "#evidence .evidence-card:nth-child(1) p": "WHO/CDC identify medication adherence as a major chronic-care issue, and reminder reviews show appointment reminders can reduce missed visits.",
      "#evidence .evidence-card:nth-child(1) a": "CDC / WHO signal",
      "#evidence .evidence-card:nth-child(2) h3": "Cars, tires, fluids, and batteries",
      "#evidence .evidence-card:nth-child(2) p": "NHTSA recommends monthly tire checks, and Car Care data repeatedly flags oils/fluids, filters, belts, hoses, and battery cables.",
      "#evidence .evidence-card:nth-child(2) a": "NHTSA / Car Care",
      "#evidence .evidence-card:nth-child(3) h3": "Bills, payments, and expiring documents",
      "#evidence .evidence-card:nth-child(3) p": "These have clear due dates, making them ideal for advance reminders, repeat nudges, and rescheduling without excessive personal data.",
      "#evidence .evidence-card:nth-child(3) a": "Reminder design",
      "#evidence .evidence-card:nth-child(4) h3": "LINE-first for Thailand",
      "#evidence .evidence-card:nth-child(4) p": "LY Corporation reported 54 million LINE users in Thailand in 2024, making rich menus, LIFF, and AI specialist pilots a practical launch path.",
      "#evidence .evidence-card:nth-child(4) a": "LINE Thailand signal",
      ".profile-lead .eyebrow": "WHO WE CARE FOR",
      ".profile-lead p:last-child": "We turn everyday details into a clear care system: oil-change dates, doctor appointments, document expiry, and home routines, so customers feel reassured that important timing is being watched.",
      ".profile-card.dark .eyebrow": "SERVICE PROMISE",
      ".profile-card.dark h3": "Thoughtful reminder planning",
      ".profile-card.dark p:last-child": "Customers choose what they need cared for, enter only necessary details, and receive a reminder plan that is clear, calm, and not unnecessarily intrusive.",
      ".profile-card:nth-child(2) .eyebrow": "MEMBER CARE",
      ".profile-card:nth-child(2) h3": "Accounts built for reassurance",
      ".profile-card:nth-child(2) p:last-child": "Supports name, mobile number, LINE ID, and the customer preferred notification channel, with minimum-data thinking.",
      ".profile-card:nth-child(3) .eyebrow": "BUSINESS READY",
      ".profile-card:nth-child(3) h3": "Ready for subscription service",
      ".profile-card:nth-child(3) p:last-child": "Payment flow and owner dashboards are drafted before any real card, bank, or platform integration is connected.",
      "#line-expert .section-head h2": "Pilot a LINE marketing menu + AI care specialist",
      ".line-header strong": "Jam Hai Tee",
      ".line-header span": "Official Account draft",
      ".expert-intro": "Hi, choose what you want cared for or ask Lin specialist a question.",
      ".sample-user": "I want a vehicle tax renewal reminder",
      ".expert-answer": "Sure. Please share the vehicle model, expiry date, and notification channel. The specialist will draft a reminder cycle.",
      ".rich-menu-preview button:nth-child(1)": "Create",
      ".rich-menu-preview button:nth-child(2)": "Status",
      ".rich-menu-preview button:nth-child(3)": "Ask expert",
      ".rich-menu-preview button:nth-child(4)": "Reschedule",
      ".rich-menu-preview button:nth-child(5)": "Plans",
      ".rich-menu-preview button:nth-child(6)": "Support",
      ".line-panel:not(.line-phone) h3": "Start with LINE OA as the storefront, then connect a real AI specialist safely",
      ".line-checklist li:nth-child(1)": "Rich menu: create reminder, check status, ask an expert, reschedule, packages, support.",
      ".line-checklist li:nth-child(2)": "LIFF: open the web form inside LINE without leaving the chat.",
      ".line-checklist li:nth-child(3)": "AI specialist: answer general questions, help collect fields, and hand off to a human for risky or complex cases.",
      ".line-checklist li:nth-child(4)": "Safety: do not send health data, phone numbers, or LINE IDs to AI until consent and data policies are ready.",
      "#pricing .section-head h2": "Try it first, then move into a monthly plan",
      ".pricing-intro": "The service is designed around two core modules: important-life reminders and income-expense tracking with spending summaries. LINE starts as the main channel, while SMS stays as a paid credit add-on to keep the base plan fair.",
      ".pricing-card:nth-child(1) .plan-tag": "Free trial",
      ".pricing-card:nth-child(1) h3": "Trial",
      ".pricing-card:nth-child(1) .price-line strong": "Free 30 days",
      ".pricing-card:nth-child(1) .price-line span": "No card required",
      ".pricing-card:nth-child(1) li:nth-child(1)": "Basic important-reminder planning",
      ".pricing-card:nth-child(1) li:nth-child(2)": "Draft income and expense log",
      ".pricing-card:nth-child(1) li:nth-child(3)": "Daily and monthly summary preview",
      ".pricing-card:nth-child(1) .plan-button": "Start trial",
      ".pricing-card:nth-child(2) .plan-tag": "Recommended",
      ".pricing-card:nth-child(2) h3": "Starter",
      ".pricing-card:nth-child(2) .price-line strong": "49 THB/month",
      ".pricing-card:nth-child(2) .price-line span": "29 THB for the first paid month",
      ".pricing-card:nth-child(2) li:nth-child(1)": "LINE reminders in morning, midday, and evening slots",
      ".pricing-card:nth-child(2) li:nth-child(2)": "Acknowledgement stops repeat alerts for that day",
      ".pricing-card:nth-child(2) li:nth-child(3)": "Income-expense log with comparison charts",
      ".pricing-card:nth-child(2) .plan-button": "Choose plan",
      ".pricing-card:nth-child(3) .plan-tag": "Full care",
      ".pricing-card:nth-child(3) h3": "Care Plus",
      ".pricing-card:nth-child(3) .price-line strong": "99 THB/month",
      ".pricing-card:nth-child(3) .price-line span": "For customers who want deeper care",
      ".pricing-card:nth-child(3) li:nth-child(1)": "Future receipt photo attachments as evidence",
      ".pricing-card:nth-child(3) li:nth-child(2)": "Daily, monthly, and high-spend category summaries",
      ".pricing-card:nth-child(3) li:nth-child(3)": "Budget guidance on safe monthly spending",
      ".pricing-card:nth-child(3) .plan-button": "View specialist flow",
      ".pricing-card:nth-child(4) .plan-tag": "Add-on credit",
      ".pricing-card:nth-child(4) h3": "SMS Add-on",
      ".pricing-card:nth-child(4) .price-line strong": "Top up credits",
      ".pricing-card:nth-child(4) .price-line span": "Charged by actual messages",
      ".pricing-card:nth-child(4) li:nth-child(1)": "For customers who do not use LINE",
      ".pricing-card:nth-child(4) li:nth-child(2)": "Start with credits before fixed SMS bundles",
      ".pricing-card:nth-child(4) li:nth-child(3)": "SMS prices must be locked with a provider before launch",
      ".pricing-card:nth-child(4) .plan-button": "View payment options",
      ".pricing-note strong": "Launch offer Lin recommends:",
      ".pricing-note span": "Free trial for 30 days, then 29 THB for the first paid month, then 49 THB/month. SMS should remain separate credit so the main plan stays affordable.",
      "#membership .section-head h2": "Member access and notification channel",
      "#registerForm h3": "Create member account",
      "#loginForm h3": "Member login",
      "#registerForm button[type=\"submit\"]": "Create draft account",
      "#loginForm button[type=\"submit\"]": "Draft login",
      "#loginStatus": "A real system should use OTP/2FA and encrypted data.",
      "#owner .section-head h2": "Owner dashboard",
      "#adminLoginForm h3": "Login before viewing service data",
      "#adminLoginForm .muted": "This dashboard shows aggregate data only. It does not reveal phone numbers, LINE IDs, or individual customer records in the draft.",
      "#adminLoginForm button": "Open dashboard",
      ".owner-grid article:nth-of-type(1) .muted": "Total service users",
      ".owner-grid article:nth-of-type(1) span": "Visible to the owner only",
      ".owner-grid article:nth-of-type(2) .muted": "Public-facing number",
      ".owner-grid article:nth-of-type(2) span": "Rule: show 500+ only after the count reaches 500.",
      ".owner-grid article:nth-of-type(3) .muted": "System status",
      ".status-list li:nth-child(1)": "Admin: login required before viewing aggregate data",
      ".status-list li:nth-child(2)": "Member access: mockup only",
      ".status-list li:nth-child(3)": "SMS/LINE: no real sending yet",
      ".status-list li:nth-child(4)": "Payment: no real charging yet",
      ".status-list li:nth-child(5)": "Customer data: aggregate view only, no personal records",
      ".owner-grid article:nth-of-type(4) .muted": "Source-backed market signals",
      ".owner-grid article:nth-of-type(4) h3": "Categories to pilot first",
      ".owner-grid article:nth-of-type(5) .muted": "Reminder behavior",
      ".owner-grid article:nth-of-type(5) h3": "Features that prevent repeated misses",
      ".admin-note-card .muted": "Owner decision room",
      ".admin-note-card strong": "Review the overview before opening real data",
      ".admin-note-card span": "A real system should use admin roles, 2FA, audit logs, database encryption, and separate personal data from aggregate statistics.",
      "#adminLogout": "Close dashboard",
      "#payment .section-head h2": "Draft payment channels",
      ".payment-card[data-payment=\"card\"] strong": "Credit / debit card",
      ".payment-card[data-payment=\"card\"] span": "Use a gateway that keeps card numbers outside our system.",
      ".payment-card[data-payment=\"bank\"] strong": "Bank app top-up",
      ".payment-card[data-payment=\"bank\"] span": "Suitable for QR, PromptPay, or transfer to a business account.",
      ".payment-card[data-payment=\"wallet\"] strong": "Platform / wallet",
      ".payment-card[data-payment=\"wallet\"] span": "Ready for payment channels Thai customers already know.",
      ".payment-card[data-payment=\"prepaid\"] strong": "Credit wallet",
      ".payment-card[data-payment=\"prepaid\"] span": "Customers top up first, then credits are used for SMS or packages.",
      ".process-section .section-head h2": "How it works",
      ".process-grid div:nth-child(1) span": "Create an account and choose a notification channel",
      ".process-grid div:nth-child(2) span": "Choose what the service should remember",
      ".process-grid div:nth-child(3) span": "Enter or tick only relevant information",
      ".process-grid div:nth-child(4) span": "Generate the reminder plan before real SMS/LINE integration",
      ".topics-section .section-head h2": "What should we help remember?",
      "#reminderForm .panel-heading h2": "Choose a topic first",
      "#reminderForm button[type=\"submit\"]": "Create reminder plan",
      "#resultPanel .panel-heading h2": "Draft reminder plan",
      ".notification-card h3": "Today reminder slots",
      ".notification-card .muted": "The system reminds 3 times. Once acknowledged, it will not repeat that day.",
      "#acknowledgeToday": "Acknowledge",
      "#resetAck": "Undo acknowledge",
      "#rescheduleButton": "Reschedule reminder",
      ".message-card .muted": "Sample message",
      "#copyMessage": "Copy",
      "#simulateSend": "Save test"
    },
    placeholders: {
      "#memberName": "Preferred display name",
      "#memberPhone": "For future SMS or OTP",
      "#memberLine": "For future LINE notifications",
      "#memberPass": "mockup only",
      "#loginId": "Phone number or LINE ID",
      "#loginPass": "mockup only",
      "#adminUser": "e.g. owner@jamhaitee",
      "#adminPass": "mockup only",
      "#customerName": "Name for reminders",
      "#phone": "Future SMS number",
      "#vehicleModel": "e.g. Toyota Altis",
      "#vehicleYear": "e.g. 2020",
      "#mileage": "e.g. 85000",
      "#symptoms": "Describe the concern or reminder need"
    },
    labels: {
      "#memberName": "Member name", "#memberPhone": "Mobile number", "#memberLine": "LINE ID", "#memberChannel": "Primary channel", "#memberPass": "Password or OTP", "#loginId": "Phone or LINE ID", "#loginPass": "Password or OTP", "#adminUser": "Admin account", "#adminPass": "Password or OTP", "#customerName": "Reminder recipient", "#phone": "Phone number", "#channel": "Notification channel", "#notifyTime": "Preferred time", "#vehicleModel": "Vehicle model", "#vehicleYear": "Vehicle year", "#mileage": "Current mileage", "#usageLevel": "Vehicle usage", "#lastService": "Latest service", "#lastOilChange": "Latest oil change", "#symptoms": "Additional details", "#frequency": "Issue frequency", "#severity": "Importance level", "#rescheduleDate": "New date", "#rescheduleTime": "New time", "#userCountInput": "Adjust mock count"
    },
    smallAfter: {
      "#customerName": "Used to personalize the reminder.", "#phone": "Draft version does not send real SMS.", "#channel": "Choose the main notification channel.", "#notifyTime": "Pick a time the message is easy to notice.", "#vehicleModel": "Makes the reminder easier to understand.", "#vehicleYear": "Helps estimate vehicle age.", "#mileage": "Helps estimate service intervals.", "#usageLevel": "Heavy usage may need earlier reminders.", "#lastService": "Leave blank if unsure.", "#lastOilChange": "Used to estimate the next oil-change reminder.", "#symptoms": "Enter only necessary details.", "#frequency": "Helps estimate urgency."
    },
    options: { "#usageLevel": ["Normal", "Light", "Heavy / daily"], "#frequency": ["Once", "Sometimes", "Often", "Always"] },
    checkbox: { "#memberConsent": "I consent to use this data only for membership and reminders.", "#consent": "I consent to use this data only to create reminder items." },
    topics: {
      car: ["Vehicle", "Tires, fluids, battery, tax, insurance"],
      home: ["Home / condo", "A/C cleaning, filters, fees, repairs"],
      health: ["Health / medicine", "Medicine, appointments, symptoms, checkups"],
      document: ["Bills / documents", "Payments, insurance, IDs, licenses, contracts, expiry dates"],
      business: ["Business", "Equipment, payments, contracts, customer follow-up"]
    },
    topicConfig: {
      car: { title: "Vehicle questionnaire", placeholder: "e.g. hard start, warning light, or maintenance schedule", checks: ["Engine oil", "Battery", "Tires / pressure", "Brakes", "A/C", "Tax / insurance"] },
      home: { title: "Home / condo questionnaire", placeholder: "e.g. A/C cleaning, filter replacement, or common fee", checks: ["A/C cleaning", "Water filter", "Common fee", "Pest control", "Home insurance", "Repair work"] },
      health: { title: "Health / medicine questionnaire", placeholder: "e.g. medicine reminder, doctor appointment, or symptom tracking", checks: ["Medicine", "Doctor appointment", "Health checkup", "Blood pressure", "Exercise", "Refill medicine"] },
      document: { title: "Bills / documents questionnaire", placeholder: "e.g. payment due date, insurance, ID renewal, license, contract, or domain", checks: ["Bills / payments", "Insurance", "ID card", "Driving license", "Passport", "Contract / domain"] },
      business: { title: "Business questionnaire", placeholder: "e.g. equipment maintenance, contract renewal, or payment cycle", checks: ["Equipment", "Payment cycle", "Contract renewal", "Tax", "Permit", "Customer follow-up"] }
    },
    stats: {
      service: [{ label: "Health / medicine / appointments", value: 50 }, { label: "Car / tires / fluids", value: 42 }, { label: "Bills / payments / documents", value: 34 }, { label: "Home / condo upkeep", value: 26 }, { label: "Business / payment cycles", value: 22 }],
      request: [{ label: "LINE rich menu", value: 54 }, { label: "AI question helper", value: 46 }, { label: "Repeat until acknowledged", value: 40 }, { label: "Self reschedule", value: 33 }, { label: "Prepaid credits", value: 24 }]
    },
    paymentNotes: {
      card: "Cards should go through a payment gateway. We should not store card numbers ourselves.",
      bank: "Good for QR / PromptPay / bank transfer, with status verification later.",
      wallet: "Good for familiar payment platforms, but fees and conditions must be reviewed.",
      prepaid: "Good for SMS because customers can top up credits and spend by usage or package."
    },
    runtime: {
      defaultName: "customer",
      newMember: "new member",
      noDate: "No date yet",
      quickChecksTitle: "Choose only what should be reminded",
      slots: [{ label: "Morning", time: "08:00" }, { label: "Noon", time: "12:30" }, { label: "Evening", time: "18:30" }],
      risk: {
        high: { label: "Needs prompt checking", badge: "High" },
        medium: { label: "Needs monitoring", badge: "Watch" },
        low: { label: "Normal care cycle", badge: "Normal" }
      },
      dynamic: {
        car: {
          workDoneLabel: "What has already been handled?",
          workDonePlaceholder: "e.g. battery replaced / not handled yet",
          handledLabel: "Current handling status",
          handledOptions: ["Not handled yet", "Handled", "Technician booked", "Not sure"],
          warningLabel: "Dashboard warning light",
          warningOptions: ["None", "Check engine", "Battery light", "Oil light", "Brake / ABS", "Temperature", "Other / not sure"],
          guideTitle: "Approximate service interval guide",
          guide: [
            { label: "Engine oil", interval: "Every 5,000-10,000 km or 6-12 months" },
            { label: "Oil filter", interval: "Replace with engine oil" },
            { label: "Air filter", interval: "Every 20,000 km or when dirty" },
            { label: "Brake fluid", interval: "Every 40,000 km or about 2 years" },
            { label: "Coolant", interval: "Every 40,000-80,000 km depending on manual" },
            { label: "Battery", interval: "Check every 6 months; monitor after 2-3 years" },
            { label: "Tires", interval: "Rotate every 10,000 km; replace when worn or cracked" }
          ]
        },
        health: {
          startYearLabel: "When did it start?",
          startYearPlaceholder: "e.g. 2022",
          doctorVisitLabel: "Latest doctor visit / appointment",
          currentMedicineLabel: "Current medicine or care routine",
          currentMedicinePlaceholder: "Medicine name, time, or care method",
          medicineStatusLabel: "Medicine status",
          medicineStatusOptions: ["Taking as usual", "Often missed / out of medicine", "Waiting for doctor", "Not sure"]
        },
        generic: {
          startLabel: "When did this care item start?",
          startPlaceholder: "e.g. this month / last year / never",
          handledLabel: "Current handling status",
          handledOptions: ["Not handled yet", "Handled", "Appointment booked", "Not sure"]
        }
      },
      reminder: {
        checkedFallback: "selected items",
        car: {
          checkTitle: "Initial vehicle check",
          guideTitle: "Recommended maintenance cycle",
          docsTitle: "Vehicle documents",
          docsDetail: "Tax, insurance, compulsory insurance, and key documents",
          symptomPrefix: "Concern",
          focusPrefix: "Focus",
          year: "vehicle year",
          mileage: "mileage",
          mileageUnit: "km",
          lastOil: "latest oil change",
          warning: "warning light",
          workDone: "handled",
          status: "status"
        },
        health: {
          trackTitle: "Symptom and medicine follow-up",
          medicineTitle: "Appointment / medicine reminder",
          symptomFallback: "Follow up on the customer notes",
          medicineDetail: "Check medicine supply before the next appointment and record any symptom changes",
          startYear: "started in",
          currentMedicine: "medicine / care",
          doctorVisit: "latest appointment / doctor visit",
          medicineStatus: "medicine status"
        },
        categories: {
          home: ["Home / condo care", "A/C cleaning, filters, common fees, and repairs"],
          document: ["Important documents", "ID, license, contract, domain, or renewal dates"],
          business: ["Business / equipment", "Equipment care, contract renewal, payment cycles, and customer follow-up"],
          default: ["Reminder item", "Set the cycle the customer needs"]
        },
        followUpTitle: "Follow-up check",
        followUpDetail: "Ask whether the customer has already handled it",
        trackPrefix: "Track"
      },
      toast: {
        create: "Reminder topics opened. Choose what you want to set up.",
        status: "Owner status area opened. A real system should require login.",
        expert: "Specialist area opened.",
        reschedule: "Reschedule area opened. Choose a topic first if no plan exists yet.",
        plans: "Service plans opened.",
        support: "Member/support area opened.",
        copiedFallback: "Select the message text manually if clipboard access is blocked."
      }
    },
    messages: {
      notPublic: "Hidden",
      adminOpen: "Draft owner dashboard opened. Aggregate data only.",
      adminClosed: "Dashboard closed. Aggregate data is hidden.",
      adminMissing: "Enter admin account and password/OTP before opening dashboard.",
      memberDefault: "No real member data is saved.",
      memberOk: (name, channel) => `Draft account for ${name} is ready via ${channel}, but not saved to a server.`,
      memberConsent: "Consent is required before creating a real account.",
      loginOk: "Draft login successful. A real system should use OTP/2FA.",
      copy: "Copy",
      copied: "Copied",
      phoneMissing: "no phone number",
      sendTest: (time, channel, phone) => `${time} - test ${channel} to ${phone}`,
      ack: "Acknowledged. No repeat reminder today.",
      rescheduleMissing: "Choose a new date before rescheduling.",
      rescheduled: (date, time) => `Rescheduled to ${date} at ${time}`,
      todayPolicy: "Today reminders: morning, noon, evening until acknowledged."
    }
  },
  zh: {
    htmlLang: "zh-Hans",
    locale: "zh-CN",
    title: "Jam Hai Tee - 提醒服务草案",
    html: {
      ".hero h1": "<span>贴心照护</span><span>重要事项提醒</span><span>安全优先</span>",
      ".profile-lead h2": "<span>为需要照顾</span><span>重要事项的人</span><span>减少遗忘风险</span>"
    },
    text: {
      ".top-actions a[href=\"#membership\"]": "会员",
      ".top-actions a[href=\"#owner\"]": "业主端",
      ".top-actions a[href=\"#line-expert\"]": "专家",
      ".top-actions a[href=\"#pricing\"]": "套餐",
      ".top-actions a[href=\"#topics\"]": "开始",
      ".hero .eyebrow": "CARE REMINDER SERVICE",
      ".hero-copy": "我们帮助客户管理不该被忘记的事项，从车辆、健康、文件、家庭到业务流程，以准时、礼貌且重视数据安全的方式提醒。",
      ".hero-summary span:nth-child(1)": "个人化照护",
      ".hero-summary span:nth-child(2)": "可扩展 SMS / LINE",
      ".hero-summary span:nth-child(3)": "业主总览",
      ".hero-summary span:nth-child(4)": "数据安全优先",
      ".primary-link": "查看服务",
      ".mission-topline span": "数据支持的市场雷达",
      ".mission-topline strong": "已验证信号",
      ".radial-meter strong": "50%",
      ".radial-meter span": "长期用药",
      ".kpi-one strong": "主要信号",
      ".kpi-one span": "健康 / 预约",
      ".kpi-two strong": "LINE 54M",
      ".kpi-two span": "泰国渠道",
      ".mission-grid div:nth-child(1) span": "证据 1",
      ".mission-grid div:nth-child(1) strong": "用药 / 预约",
      ".mission-grid div:nth-child(2) span": "证据 2",
      ".mission-grid div:nth-child(2) strong": "车辆 / 轮胎 / 油液",
      ".mission-grid div:nth-child(3) span": "证据 3",
      ".mission-grid div:nth-child(3) strong": "账单 / 到期续期",
      ".trust-strip strong": "从第一天开始，就以关怀客户和保护数据为原则",
      ".trust-strip div span": "此草案不会存储服务器数据、不会发送真实 SMS，也未连接真实支付。",
      ".safe-pill": "安全草案模式",
      "#evidence .section-head h2": "用于精准定位的市场证据",
      "#evidence .evidence-card:nth-child(1) h3": "健康、长期用药与预约",
      "#evidence .evidence-card:nth-child(1) p": "WHO/CDC 指出用药依从性仍是慢病照护的重要问题，提醒系统研究也显示预约提醒能减少未到诊。",
      "#evidence .evidence-card:nth-child(1) a": "CDC / WHO 信号",
      "#evidence .evidence-card:nth-child(2) h3": "车辆、轮胎、油液与电池",
      "#evidence .evidence-card:nth-child(2) p": "NHTSA 建议每月检查轮胎，Car Care 数据也反复显示油液、滤芯、皮带、管路与电池线等问题。",
      "#evidence .evidence-card:nth-child(2) a": "NHTSA / Car Care",
      "#evidence .evidence-card:nth-child(3) h3": "账单、付款与到期文件",
      "#evidence .evidence-card:nth-child(3) p": "这些事项有明确截止日期，适合提前提醒、重复提醒与改期，且不需要过度收集个人资料。",
      "#evidence .evidence-card:nth-child(3) a": "提醒设计",
      "#evidence .evidence-card:nth-child(4) h3": "泰国市场优先 LINE",
      "#evidence .evidence-card:nth-child(4) p": "LY Corporation 报告 2024 年泰国 LINE 用户达 5,400 万，适合用 rich menu、LIFF 与 AI 专家试市场。",
      "#evidence .evidence-card:nth-child(4) a": "LINE 泰国信号",
      ".profile-lead .eyebrow": "WHO WE CARE FOR",
      ".profile-lead p:last-child": "我们把日常小细节变成清晰的照护系统，例如换机油、看医生、文件到期、家庭维护，让客户安心知道重要时间有人帮忙记住。",
      ".profile-card.dark .eyebrow": "SERVICE PROMISE",
      ".profile-card.dark h3": "用心规划提醒",
      ".profile-card.dark p:last-child": "客户选择需要照护的事项，只填写必要资料，系统协助生成清楚、温和、不打扰的提醒计划。",
      ".profile-card:nth-child(2) .eyebrow": "MEMBER CARE",
      ".profile-card:nth-child(2) h3": "让客户安心的会员账户",
      ".profile-card:nth-child(2) p:last-child": "支持姓名、手机、LINE ID 和客户选择的通知渠道，并坚持最少必要数据原则。",
      ".profile-card:nth-child(3) .eyebrow": "BUSINESS READY",
      ".profile-card:nth-child(3) h3": "可扩展为订阅服务",
      ".profile-card:nth-child(3) p:last-child": "先规划支付流程和业主仪表板，再安全连接银行卡、银行或平台支付。",
      "#line-expert .section-head h2": "试用 LINE 营销菜单 + AI 专家服务",
      ".line-header strong": "Jam Hai Tee",
      ".line-header span": "Official Account 草案",
      ".expert-intro": "您好，请选择需要照护的事项，或直接咨询 Lin 专家。",
      ".sample-user": "我想设置车辆税费续期提醒",
      ".expert-answer": "可以。请提供车辆型号、到期日与通知渠道，专家会协助生成提醒周期。",
      ".rich-menu-preview button:nth-child(1)": "设置提醒",
      ".rich-menu-preview button:nth-child(2)": "查状态",
      ".rich-menu-preview button:nth-child(3)": "问专家",
      ".rich-menu-preview button:nth-child(4)": "改期",
      ".rich-menu-preview button:nth-child(5)": "套餐",
      ".rich-menu-preview button:nth-child(6)": "客服",
      ".line-panel:not(.line-phone) h3": "先用 LINE OA 做店面，再安全连接真正的 AI 专家",
      ".line-checklist li:nth-child(1)": "Rich menu：设置提醒、查状态、问专家、改期、套餐、客服。",
      ".line-checklist li:nth-child(2)": "LIFF：在 LINE 内打开网页表单，不需要离开聊天。",
      ".line-checklist li:nth-child(3)": "AI 专家：回答一般问题、协助填写资料，风险或复杂情况转给真人。",
      ".line-checklist li:nth-child(4)": "安全：未完成同意与数据政策前，不把健康资料、电话或 LINE ID 发给 AI。",
      "#pricing .section-head h2": "先免费试用，再进入月费套餐",
      ".pricing-intro": "服务设计为两个核心模块：重要事项提醒，以及收入支出记录与消费摘要。LINE 作为主要渠道，SMS 作为额外点数，以保持基础套餐价格合理。",
      ".pricing-card:nth-child(1) .plan-tag": "免费试用",
      ".pricing-card:nth-child(1) h3": "试用",
      ".pricing-card:nth-child(1) .price-line strong": "免费 30 天",
      ".pricing-card:nth-child(1) .price-line span": "无需绑定银行卡",
      ".pricing-card:nth-child(1) li:nth-child(1)": "基础重要事项提醒",
      ".pricing-card:nth-child(1) li:nth-child(2)": "收入支出记录草案",
      ".pricing-card:nth-child(1) li:nth-child(3)": "每日与每月摘要预览",
      ".pricing-card:nth-child(1) .plan-button": "开始试用",
      ".pricing-card:nth-child(2) .plan-tag": "推荐入门",
      ".pricing-card:nth-child(2) h3": "入门",
      ".pricing-card:nth-child(2) .price-line strong": "49 泰铢/月",
      ".pricing-card:nth-child(2) .price-line span": "试用后首月 29 泰铢",
      ".pricing-card:nth-child(2) li:nth-child(1)": "通过 LINE 在早、中、晚提醒",
      ".pricing-card:nth-child(2) li:nth-child(2)": "确认后当天不再重复提醒",
      ".pricing-card:nth-child(2) li:nth-child(3)": "收入支出记录与对比图表",
      ".pricing-card:nth-child(2) .plan-button": "选择套餐",
      ".pricing-card:nth-child(3) .plan-tag": "完整照护",
      ".pricing-card:nth-child(3) h3": "Care Plus",
      ".pricing-card:nth-child(3) .price-line strong": "99 泰铢/月",
      ".pricing-card:nth-child(3) .price-line span": "适合需要更细照护的客户",
      ".pricing-card:nth-child(3) li:nth-child(1)": "未来可附上收据照片作为凭证",
      ".pricing-card:nth-child(3) li:nth-child(2)": "每日、每月与高支出类别摘要",
      ".pricing-card:nth-child(3) li:nth-child(3)": "预算建议：本月不宜超过多少",
      ".pricing-card:nth-child(3) .plan-button": "查看专家流程",
      ".pricing-card:nth-child(4) .plan-tag": "额外点数",
      ".pricing-card:nth-child(4) h3": "SMS 加购",
      ".pricing-card:nth-child(4) .price-line strong": "充值点数",
      ".pricing-card:nth-child(4) .price-line span": "按真实消息数量计费",
      ".pricing-card:nth-child(4) li:nth-child(1)": "适合不使用 LINE 的客户",
      ".pricing-card:nth-child(4) li:nth-child(2)": "建议先用点数，再开放固定 SMS 套餐",
      ".pricing-card:nth-child(4) li:nth-child(3)": "上线前需与供应商确认 SMS 单价",
      ".pricing-card:nth-child(4) .plan-button": "查看支付方式",
      ".pricing-note strong": "Lin 建议的开业优惠：",
      ".pricing-note span": "免费试用 30 天，首个付费月 29 泰铢，之后 49 泰铢/月。SMS 应作为独立点数，避免基础套餐过贵。",
      "#membership .section-head h2": "会员注册与通知渠道",
      "#registerForm h3": "注册会员",
      "#loginForm h3": "会员登录",
      "#registerForm button[type=\"submit\"]": "创建草案账户",
      "#loginForm button[type=\"submit\"]": "草案登录",
      "#loginStatus": "真实系统应使用 OTP/2FA 并加密数据。",
      "#owner .section-head h2": "业主仪表板",
      "#adminLoginForm h3": "登录后查看服务数据",
      "#adminLoginForm .muted": "此仪表板仅显示汇总数据，不显示电话号码、LINE ID 或个人客户记录。",
      "#adminLoginForm button": "打开仪表板",
      ".owner-grid article:nth-of-type(1) .muted": "服务用户总数",
      ".owner-grid article:nth-of-type(1) span": "仅业主可见",
      ".owner-grid article:nth-of-type(2) .muted": "公开显示数字",
      ".owner-grid article:nth-of-type(2) span": "规则：达到 500 后才显示 500+。",
      ".owner-grid article:nth-of-type(3) .muted": "系统状态",
      ".status-list li:nth-child(1)": "Admin：查看汇总数据前需要登录",
      ".status-list li:nth-child(2)": "会员：仅为草案模拟",
      ".status-list li:nth-child(3)": "SMS/LINE：尚未真实发送",
      ".status-list li:nth-child(4)": "Payment：尚未真实扣款",
      ".status-list li:nth-child(5)": "客户数据：仅显示汇总，不显示个人记录",
      ".owner-grid article:nth-of-type(4) .muted": "有来源支持的市场信号",
      ".owner-grid article:nth-of-type(4) h3": "应优先试点的类别",
      ".owner-grid article:nth-of-type(5) .muted": "提醒行为",
      ".owner-grid article:nth-of-type(5) h3": "帮助避免再次错过的功能",
      ".admin-note-card .muted": "业主决策室",
      ".admin-note-card strong": "开放真实数据前先看总览",
      ".admin-note-card span": "真实系统应使用管理员权限、2FA、审计日志、数据库加密，并将个人数据与汇总统计分离。",
      "#adminLogout": "关闭仪表板",
      "#payment .section-head h2": "支付渠道草案",
      ".payment-card[data-payment=\"card\"] strong": "信用卡 / 借记卡",
      ".payment-card[data-payment=\"card\"] span": "通过支付网关处理，不在本系统保存卡号。",
      ".payment-card[data-payment=\"bank\"] strong": "银行 App 充值",
      ".payment-card[data-payment=\"bank\"] span": "适合 QR、PromptPay 或转入企业账户。",
      ".payment-card[data-payment=\"wallet\"] strong": "平台 / 钱包",
      ".payment-card[data-payment=\"wallet\"] span": "可扩展到泰国客户熟悉的支付渠道。",
      ".payment-card[data-payment=\"prepaid\"] strong": "预付点数",
      ".payment-card[data-payment=\"prepaid\"] span": "客户先充值，再按 SMS 或套餐扣点。",
      ".process-section .section-head h2": "使用流程",
      ".process-grid div:nth-child(1) span": "注册会员并选择通知渠道",
      ".process-grid div:nth-child(2) span": "选择需要服务帮忙记住的事项",
      ".process-grid div:nth-child(3) span": "只填写或勾选相关信息",
      ".process-grid div:nth-child(4) span": "先生成提醒计划，再连接真实 SMS/LINE",
      ".topics-section .section-head h2": "需要我们提醒什么？",
      "#reminderForm .panel-heading h2": "请先选择主题",
      "#reminderForm button[type=\"submit\"]": "生成提醒计划",
      "#resultPanel .panel-heading h2": "提醒计划草案",
      ".notification-card h3": "今日提醒时段",
      ".notification-card .muted": "系统每天提醒 3 次。确认后当天不再重复提醒。",
      "#acknowledgeToday": "已确认",
      "#resetAck": "取消确认",
      "#rescheduleButton": "重新安排提醒",
      ".message-card .muted": "示例消息",
      "#copyMessage": "复制",
      "#simulateSend": "保存测试"
    },
    placeholders: {
      "#memberName": "客户称呼",
      "#memberPhone": "未来用于 SMS 或 OTP",
      "#memberLine": "未来用于 LINE 提醒",
      "#memberPass": "仅草案",
      "#loginId": "手机或 LINE ID",
      "#loginPass": "仅草案",
      "#adminUser": "例如 owner@jamhaitee",
      "#adminPass": "仅草案",
      "#customerName": "提醒称呼",
      "#phone": "未来 SMS 电话",
      "#vehicleModel": "例如 Toyota Altis",
      "#vehicleYear": "例如 2020",
      "#mileage": "例如 85000",
      "#symptoms": "描述需要提醒或担心的事项"
    },
    labels: {
      "#memberName": "会员名称", "#memberPhone": "手机号码", "#memberLine": "LINE ID", "#memberChannel": "主要渠道", "#memberPass": "密码或 OTP", "#loginId": "手机或 LINE ID", "#loginPass": "密码或 OTP", "#adminUser": "管理员账号", "#adminPass": "密码或 OTP", "#customerName": "提醒对象", "#phone": "电话号码", "#channel": "通知渠道", "#notifyTime": "方便提醒时间", "#vehicleModel": "车辆型号", "#vehicleYear": "车辆年份", "#mileage": "当前里程", "#usageLevel": "车辆使用", "#lastService": "最近保养", "#lastOilChange": "最近换机油", "#symptoms": "补充说明", "#frequency": "发生频率", "#severity": "重要程度", "#rescheduleDate": "新日期", "#rescheduleTime": "新时间", "#userCountInput": "调整模拟数量"
    },
    smallAfter: {
      "#customerName": "用于个性化提醒。", "#phone": "草案版本不会发送真实 SMS。", "#channel": "选择主要通知渠道。", "#notifyTime": "选择容易看到消息的时间。", "#vehicleModel": "让提醒更容易理解。", "#vehicleYear": "用于估算车辆年限。", "#mileage": "用于估算保养周期。", "#usageLevel": "高频使用可更早提醒。", "#lastService": "不确定可留空。", "#lastOilChange": "用于估算下次换油提醒。", "#symptoms": "只填写必要内容。", "#frequency": "帮助估算紧急程度。"
    },
    options: { "#usageLevel": ["正常", "少量", "高频 / 每天"], "#frequency": ["一次", "有时", "经常", "每次"] },
    checkbox: { "#memberConsent": "同意仅为会员与提醒服务使用这些资料。", "#consent": "同意仅为生成提醒项目使用这些资料。" },
    topics: {
      car: ["车辆", "轮胎、油液、电池、税费、保险"],
      home: ["家庭 / 公寓", "空调清洁、滤芯、费用、维修"],
      health: ["健康 / 用药", "用药、预约、症状追踪、体检"],
      document: ["账单 / 文件", "付款、保险、证件、许可、合同、到期日"],
      business: ["业务", "设备、付款周期、合同、客户跟进"]
    },
    topicConfig: {
      car: { title: "车辆问卷", placeholder: "例如启动困难、警示灯、或保养周期", checks: ["机油", "电池", "轮胎 / 胎压", "刹车", "空调", "税费 / 保险"] },
      home: { title: "家庭 / 公寓问卷", placeholder: "例如空调清洗、滤芯更换、或公共费用", checks: ["空调清洁", "净水滤芯", "公共费用", "虫害防治", "房屋保险", "维修"] },
      health: { title: "健康 / 用药问卷", placeholder: "例如用药提醒、医生预约、或症状追踪", checks: ["用药", "医生预约", "体检", "血压", "运动", "补药"] },
      document: { title: "账单 / 文件问卷", placeholder: "例如付款日、保险、证件续期、许可、合同、或域名", checks: ["账单 / 付款", "保险", "身份证", "驾驶证", "护照", "合同 / 域名"] },
      business: { title: "业务问卷", placeholder: "例如设备维护、合同续期、或付款周期", checks: ["设备", "付款周期", "合同续期", "税务", "许可证", "客户跟进"] }
    },
    stats: {
      service: [{ label: "健康 / 用药 / 预约", value: 50 }, { label: "车辆 / 轮胎 / 油液", value: 42 }, { label: "账单 / 付款 / 文件", value: 34 }, { label: "家庭 / 公寓维护", value: 26 }, { label: "业务 / 付款周期", value: 22 }],
      request: [{ label: "LINE rich menu", value: 54 }, { label: "AI 问答助手", value: 46 }, { label: "确认前重复提醒", value: 40 }, { label: "自行改期", value: 33 }, { label: "预付点数", value: 24 }]
    },
    paymentNotes: {
      card: "银行卡应通过支付网关处理，系统不应自行保存卡号。",
      bank: "适合 QR / PromptPay / 银行转账，并在之后验证状态。",
      wallet: "适合客户熟悉的平台，但需评估手续费和条件。",
      prepaid: "适合 SMS 服务，客户可预充值并按使用量或套餐扣费。"
    },
    runtime: {
      defaultName: "客户",
      newMember: "新会员",
      noDate: "尚未设定日期",
      quickChecksTitle: "只选择需要提醒的事项",
      slots: [{ label: "早上", time: "08:00" }, { label: "中午", time: "12:30" }, { label: "晚上", time: "18:30" }],
      risk: {
        high: { label: "建议尽快检查", badge: "High" },
        medium: { label: "建议持续关注", badge: "Watch" },
        low: { label: "正常照护周期", badge: "Normal" }
      },
      dynamic: {
        car: {
          workDoneLabel: "已经处理了什么？",
          workDonePlaceholder: "例如已更换电池 / 尚未处理",
          handledLabel: "当前处理状态",
          handledOptions: ["尚未处理", "已处理", "已预约技师", "不确定"],
          warningLabel: "仪表盘警示灯",
          warningOptions: ["没有", "发动机灯", "电池灯", "机油灯", "刹车 / ABS", "水温", "其他 / 不确定"],
          guideTitle: "大致保养周期建议",
          guide: [
            { label: "机油", interval: "每 5,000-10,000 公里或 6-12 个月" },
            { label: "机油滤芯", interval: "随机油一起更换" },
            { label: "空气滤芯", interval: "每 20,000 公里或变脏时" },
            { label: "刹车油", interval: "每 40,000 公里或约 2 年" },
            { label: "冷却液", interval: "每 40,000-80,000 公里，依车辆手册" },
            { label: "电池", interval: "每 6 个月检查；2-3 年后重点关注" },
            { label: "轮胎", interval: "每 10,000 公里换位；磨损或龟裂时更换" }
          ]
        },
        health: {
          startYearLabel: "从哪一年开始？",
          startYearPlaceholder: "例如 2022",
          doctorVisitLabel: "最近看诊 / 预约",
          currentMedicineLabel: "目前用药或照护方式",
          currentMedicinePlaceholder: "药名、用药时间或照护方法",
          medicineStatusLabel: "用药状态",
          medicineStatusOptions: ["正常使用", "经常忘记 / 药量不足", "等待看医生", "不确定"]
        },
        generic: {
          startLabel: "这个事项从什么时候开始照护？",
          startPlaceholder: "例如本月 / 去年 / 从未",
          handledLabel: "当前处理状态",
          handledOptions: ["尚未处理", "已处理", "已预约", "不确定"]
        }
      },
      reminder: {
        checkedFallback: "所选项目",
        car: {
          checkTitle: "车辆初步检查",
          guideTitle: "建议保养周期",
          docsTitle: "车辆文件",
          docsDetail: "税费、保险、强制险与重要文件",
          symptomPrefix: "状况",
          focusPrefix: "重点",
          year: "车辆年份",
          mileage: "里程",
          mileageUnit: "公里",
          lastOil: "最近换机油",
          warning: "警示灯",
          workDone: "已处理",
          status: "状态"
        },
        health: {
          trackTitle: "症状与用药跟进",
          medicineTitle: "预约 / 用药提醒",
          symptomFallback: "跟进客户填写的状况",
          medicineDetail: "确认下次预约前药量是否足够，并记录症状变化",
          startYear: "开始年份",
          currentMedicine: "用药 / 照护",
          doctorVisit: "最近预约 / 看诊",
          medicineStatus: "用药状态"
        },
        categories: {
          home: ["家庭 / 公寓照护", "空调清洁、滤芯、公共费用与维修"],
          document: ["重要文件", "证件、许可、合同、域名或续期日期"],
          business: ["业务 / 设备", "设备维护、合同续期、付款周期与客户跟进"],
          default: ["提醒事项", "按客户需要设定周期"]
        },
        followUpTitle: "再次跟进",
        followUpDetail: "询问客户是否已经处理",
        trackPrefix: "跟进"
      },
      toast: {
        create: "已打开提醒主题，请选择需要设置的事项。",
        status: "已打开业主状态区。真实系统应先登录。",
        expert: "已打开专家服务区。",
        reschedule: "已打开改期区域。如果还没有计划，请先选择主题。",
        plans: "已打开服务套餐。",
        support: "已打开会员 / 支持区域。",
        copiedFallback: "如果剪贴板被阻止，请手动选择消息文本复制。"
      }
    },
    messages: {
      notPublic: "未公开",
      adminOpen: "草案业主仪表板已打开，仅显示汇总数据。",
      adminClosed: "仪表板已关闭，汇总数据已隐藏。",
      adminMissing: "请先输入管理员账号和密码/OTP。",
      memberDefault: "没有保存真实会员数据。",
      memberOk: (name, channel) => `${name} 的草案账户已准备好，渠道：${channel}，但尚未保存到服务器。`,
      memberConsent: "创建真实账户前需要客户同意。",
      loginOk: "草案登录成功。真实系统应使用 OTP/2FA。",
      copy: "复制",
      copied: "已复制",
      phoneMissing: "未填写电话",
      sendTest: (time, channel, phone) => `${time} - 测试通过 ${channel} 发送至 ${phone}`,
      ack: "已确认，今天不会重复提醒。",
      rescheduleMissing: "请先选择新的日期。",
      rescheduled: (date, time) => `已改期至 ${date} ${time}`,
      todayPolicy: "今日提醒：早、中、晚，直到确认。"
    }
  }
};

const languagePolish = {
  th: {
    ".brand-name": "จำให้ที",
    ".brand-kicker": "ผู้ช่วยแจ้งเตือน",
    ".hero .eyebrow": "บริการดูแลแจ้งเตือน",
    "#evidence .eyebrow": "หลักฐานตลาด",
    ".profile-lead .eyebrow": "เราดูแลใคร",
    ".profile-card.dark .eyebrow": "คำมั่นบริการ",
    ".profile-card:nth-child(2) .eyebrow": "บัญชีสมาชิก",
    ".profile-card:nth-child(3) .eyebrow": "พร้อมต่อยอดธุรกิจ",
    "#line-expert .eyebrow": "ทดลอง LINE OA",
    ".line-panel:not(.line-phone) .eyebrow": "สถาปัตยกรรมนำร่องปลอดภัย",
    ".line-header span": "บัญชีทางการฉบับร่าง",
    "#pricing .eyebrow": "แพ็กเกจร่าง",
    "#membership .eyebrow": "บัญชีสมาชิก",
    "#registerForm .eyebrow": "สมัคร",
    "#loginForm .eyebrow": "เข้าสู่ระบบ",
    "#owner .eyebrow": "แดชบอร์ดเจ้าของเว็บ",
    "#adminLoginForm .eyebrow": "สิทธิ์ผู้ดูแล",
    "#payment .eyebrow": "ช่องทางชำระเงิน",
    ".process-section .eyebrow": "วิธีทำงาน",
    ".topics-section .eyebrow": "เลือกเรื่องแจ้งเตือน",
    "#reminderForm .eyebrow": "แบบสอบถาม",
    "#resultPanel .eyebrow": "แผนแจ้งเตือน",
    ".notification-card .eyebrow": "รอบแจ้งเตือนรายวัน",
    ".safe-pill": "โหมดร่างปลอดภัย"
  },
  en: {
    ".brand-name": "Jam Hai Tee",
    ".brand-kicker": "Private Reminder",
    ".hero .eyebrow": "CARE REMINDER SERVICE",
    "#evidence .eyebrow": "MARKET EVIDENCE",
    ".profile-lead .eyebrow": "WHO WE CARE FOR",
    ".profile-card.dark .eyebrow": "SERVICE PROMISE",
    ".profile-card:nth-child(2) .eyebrow": "MEMBER CARE",
    ".profile-card:nth-child(3) .eyebrow": "BUSINESS READY",
    "#line-expert .eyebrow": "LINE OA PILOT",
    ".line-panel:not(.line-phone) .eyebrow": "SAFE PILOT ARCHITECTURE",
    ".line-header span": "Official Account draft",
    "#pricing .eyebrow": "PRICING DRAFT",
    "#membership .eyebrow": "MEMBER ACCESS",
    "#registerForm .eyebrow": "REGISTER",
    "#loginForm .eyebrow": "LOGIN",
    "#owner .eyebrow": "OWNER DASHBOARD",
    "#adminLoginForm .eyebrow": "ADMIN ACCESS",
    "#payment .eyebrow": "PAYMENT OPTIONS",
    ".process-section .eyebrow": "HOW IT WORKS",
    ".topics-section .eyebrow": "CHOOSE A REMINDER",
    "#reminderForm .eyebrow": "QUESTIONNAIRE",
    "#resultPanel .eyebrow": "REMINDER PLAN",
    ".notification-card .eyebrow": "DAILY REMINDER",
    ".safe-pill": "Safe draft mode"
  },
  zh: {
    ".brand-name": "安心提醒",
    ".brand-kicker": "私人提醒",
    ".hero .eyebrow": "贴心提醒服务",
    "#evidence .eyebrow": "市场证据",
    ".profile-lead .eyebrow": "服务对象",
    ".profile-card.dark .eyebrow": "服务承诺",
    ".profile-card:nth-child(2) .eyebrow": "会员照护",
    ".profile-card:nth-child(3) .eyebrow": "商业准备",
    "#line-expert .eyebrow": "LINE OA 试点",
    ".line-panel:not(.line-phone) .eyebrow": "安全试点架构",
    ".line-header span": "官方账号草案",
    "#pricing .eyebrow": "价格草案",
    "#membership .eyebrow": "会员入口",
    "#registerForm .eyebrow": "注册",
    "#loginForm .eyebrow": "登录",
    "#owner .eyebrow": "业主仪表板",
    "#adminLoginForm .eyebrow": "管理员权限",
    "#payment .eyebrow": "支付渠道",
    ".process-section .eyebrow": "使用流程",
    ".topics-section .eyebrow": "选择提醒事项",
    "#reminderForm .eyebrow": "问卷",
    "#resultPanel .eyebrow": "提醒计划",
    ".notification-card .eyebrow": "每日提醒",
    ".safe-pill": "安全草案模式"
  }
};

const dateInputSelectors = ["#lastService", "#lastOilChange", "#notifyDate", "#rescheduleDate", "#doctorVisit"];

const translatedAttributes = {
  th: [
    [".brand", "aria-label", "จำให้ที"],
    [".brand img", "alt", "จำให้ที"],
    [".top-actions", "aria-label", "เมนูหลัก"],
    [".hero-visual", "aria-label", "เรดาร์ตลาดจากแหล่งข้อมูลสำหรับสิ่งที่คนอยากให้ช่วยจำ"]
  ],
  en: [
    [".brand", "aria-label", "Jam Hai Tee"],
    [".brand img", "alt", "Jam Hai Tee"],
    [".top-actions", "aria-label", "Main navigation"],
    [".hero-visual", "aria-label", "Source-backed market radar for commonly forgotten reminders"]
  ],
  zh: [
    [".brand", "aria-label", "Jam Hai Tee"],
    [".brand img", "alt", "Jam Hai Tee"],
    [".top-actions", "aria-label", "主导航"],
    [".hero-visual", "aria-label", "基于资料的提醒市场雷达"]
  ]
};

function applyTranslatedAttributes() {
  (translatedAttributes[currentLang] || translatedAttributes.th).forEach(([selector, attr, value]) => {
    document.querySelectorAll(selector).forEach((element) => element.setAttribute(attr, value));
  });
}

function applyDatePlaceholders() {
  dateInputSelectors.forEach((selector) => {
    const input = document.querySelector(selector);
    if (!input) return;
    input.setAttribute("placeholder", "YYYY-MM-DD");
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-label", `${input.closest("label")?.textContent.trim().split("\n")[0] || "Date"} YYYY-MM-DD`);
  });
}

function getStoredLanguage() {
  try {
    return localStorage.getItem("jamhaitee-language") || "th";
  } catch {
    return "th";
  }
}

let currentLang = i18n[getStoredLanguage()] ? getStoredLanguage() : "th";

let reminders = [];
let notificationState = {
  acknowledgedToday: false,
  rescheduledDate: "",
  rescheduledTime: ""
};

const dailySlots = [
  { label: "เช้า", time: "08:00" },
  { label: "กลางวัน", time: "12:30" },
  { label: "เย็น", time: "18:30" }
];

const topicConfig = {
  car: {
    title: "แบบสอบถามรถยนต์",
    placeholder: "เช่น สตาร์ทยาก มีไฟเตือน หรืออยากตั้งรอบบำรุงรักษา",
    checks: ["น้ำมันเครื่อง", "แบตเตอรี่", "ยาง/ลมยาง", "เบรก", "แอร์", "ภาษี/พ.ร.บ./ประกัน"]
  },
  home: {
    title: "แบบสอบถามบ้าน/คอนโด",
    placeholder: "เช่น ล้างแอร์ เปลี่ยนไส้กรอง หรือจ่ายค่าส่วนกลาง",
    checks: ["ล้างแอร์", "ไส้กรองน้ำ", "ค่าส่วนกลาง", "ปลวก/แมลง", "ประกันบ้าน", "งานซ่อม"]
  },
  health: {
    title: "แบบสอบถามสุขภาพ/ยา",
    placeholder: "เช่น ต้องการเตือนกินยา นัดหมอ หรือติดตามอาการ",
    checks: ["กินยา", "นัดหมอ", "ตรวจสุขภาพ", "วัดความดัน", "ออกกำลังกาย", "รับยาเพิ่ม"]
  },
  document: {
    title: "แบบสอบถามเอกสาร",
    placeholder: "เช่น ต่ออายุบัตร ใบอนุญาต สัญญา หรือโดเมน",
    checks: ["บัตรประชาชน", "ใบขับขี่", "พาสปอร์ต", "สัญญา", "โดเมน", "ใบอนุญาต"]
  },
  business: {
    title: "แบบสอบถามธุรกิจ",
    placeholder: "เช่น บำรุงอุปกรณ์ ต่อสัญญา หรือรอบจ่ายเงิน",
    checks: ["อุปกรณ์", "รอบจ่ายเงิน", "ต่อสัญญา", "ภาษี", "ใบอนุญาต", "ติดตามลูกค้า"]
  }
};

const maintenanceGuide = [
  { label: "น้ำมันเครื่อง", interval: "ทุก 5,000-10,000 กม. หรือ 6-12 เดือน" },
  { label: "ไส้กรองน้ำมันเครื่อง", interval: "เปลี่ยนพร้อมน้ำมันเครื่อง" },
  { label: "ไส้กรองอากาศ", interval: "ทุก 20,000 กม. หรือเมื่อสกปรก" },
  { label: "น้ำมันเบรก", interval: "ทุก 40,000 กม. หรือประมาณ 2 ปี" },
  { label: "น้ำหล่อเย็น", interval: "ทุก 40,000-80,000 กม. ตามคู่มือรถ" },
  { label: "แบตเตอรี่", interval: "ตรวจทุก 6 เดือน โดยทั่วไป 2-3 ปีควรเฝ้าระวัง" },
  { label: "ยาง", interval: "สลับยางทุก 10,000 กม. เปลี่ยนเมื่อดอกยางต่ำ/แตกลาย" }
];

const paymentNotes = {
  card: "บัตรควรผ่าน payment gateway เท่านั้น ระบบเราไม่ควรเก็บเลขบัตรเอง",
  bank: "เหมาะกับ QR / PromptPay / โอนผ่านแอปธนาคาร แล้วให้ระบบตรวจสถานะภายหลัง",
  wallet: "เหมาะกับลูกค้าที่คุ้นกับแพลตฟอร์มจ่ายเงิน แต่ต้องดูค่าธรรมเนียมและเงื่อนไข",
  prepaid: "เหมาะกับบริการ SMS เพราะลูกค้าเติมเครดิตไว้ แล้วหักตามการใช้งานหรือแพ็กเกจ"
};

const serviceStats = [
  { label: "สุขภาพ/ยา/นัดหมาย", value: 50 },
  { label: "รถ/ยาง/ของเหลว", value: 42 },
  { label: "บิล/ค่างวด/เอกสาร", value: 34 },
  { label: "บ้าน/คอนโด", value: 26 },
  { label: "ธุรกิจ/รอบจ่ายเงิน", value: 22 }
];

const requestStats = [
  { label: "LINE rich menu", value: 54 },
  { label: "AI ช่วยตอบคำถาม", value: 46 },
  { label: "เตือนซ้ำจนรับทราบ", value: 40 },
  { label: "เลื่อนวันแจ้งเตือนเอง", value: 33 },
  { label: "แพ็กเกจเติมเครดิต", value: 24 }
];

const thaiDate = new Intl.DateTimeFormat("th-TH", {
  year: "numeric",
  month: "short",
  day: "numeric"
});

function langPack() {
  return i18n[currentLang] || i18n.th;
}

function runtimePack() {
  return langPack().runtime || i18n.th.runtime;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setSafeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Browser storage can be unavailable in strict privacy modes.
  }
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function setHtml(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.innerHTML = value;
  });
}

function setPlaceholder(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.placeholder = value;
}

function setFieldLabel(inputSelector, value) {
  const input = document.querySelector(inputSelector);
  const label = input?.closest("label");
  if (!label) return;
  const textNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) textNode.textContent = `\n            ${value}\n            `;
}

function setSmallAfter(inputSelector, value) {
  const input = document.querySelector(inputSelector);
  const small = input?.nextElementSibling?.tagName === "SMALL" ? input.nextElementSibling : null;
  if (small) small.textContent = value;
}

function setCheckboxText(inputSelector, value) {
  const input = document.querySelector(inputSelector);
  const span = input?.closest("label")?.querySelector("span");
  if (span) span.textContent = value;
}

function setSelectOptions(selector, labels) {
  const select = document.querySelector(selector);
  if (!select) return;
  Array.from(select.options).forEach((option, index) => {
    if (labels[index]) option.textContent = labels[index];
  });
}

function showToast(message) {
  actionToast.textContent = message;
  actionToast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => actionToast.classList.remove("is-visible"), 2600);
}

function pulseTarget(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.classList.remove("focus-pulse");
  void target.offsetWidth;
  target.classList.add("focus-pulse");
}

function goToSection(selector, toastKey) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", selector);
  pulseTarget(selector);
  const message = runtimePack().toast[toastKey];
  if (message) showToast(message);
}

function getTopicConfig(nextCategory) {
  return langPack().topicConfig?.[nextCategory] || topicConfig[nextCategory];
}

function formatDate(date) {
  return new Intl.DateTimeFormat(langPack().locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function toDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDate(dateValue) {
  return new Date(`${dateValue || toDateInputValue()}T00:00:00`);
}

function formatReminderDateTime(dateValue, timeValue) {
  const dateText = formatDate(parseLocalDate(dateValue));
  return `${dateText} · ${timeValue || "09:00"}`;
}

function formatNumber(value) {
  return value.toLocaleString(langPack().locale);
}

function updateTopicCards() {
  const topics = langPack().topics || i18n.th.topics;
  topicCards.forEach((card) => {
    const [title, desc] = topics[card.dataset.category] || [];
    if (title) card.querySelector("span").textContent = title;
    if (desc) card.querySelector("small").textContent = desc;
  });
}

function updateActivePaymentNote() {
  const active = document.querySelector(".payment-card.is-active");
  if (!active) return;
  paymentNote.textContent = langPack().paymentNotes[active.dataset.payment];
}

function applyLanguage(nextLang) {
  currentLang = i18n[nextLang] ? nextLang : "th";
  const pack = langPack();
  document.documentElement.lang = pack.htmlLang;
  document.title = pack.title;
  setSafeStorage("jamhaitee-language", currentLang);

  Object.entries(pack.html).forEach(([selector, value]) => setHtml(selector, value));
  Object.entries(pack.text).forEach(([selector, value]) => setText(selector, value));
  Object.entries(languagePolish[currentLang]).forEach(([selector, value]) => setText(selector, value));
  applyTranslatedAttributes();
  Object.entries(pack.placeholders).forEach(([selector, value]) => setPlaceholder(selector, value));
  applyDatePlaceholders();
  Object.entries(pack.labels).forEach(([selector, value]) => setFieldLabel(selector, value));
  applyDatePlaceholders();
  Object.entries(pack.smallAfter).forEach(([selector, value]) => setSmallAfter(selector, value));
  Object.entries(pack.checkbox).forEach(([selector, value]) => setCheckboxText(selector, value));
  Object.entries(pack.options).forEach(([selector, labels]) => setSelectOptions(selector, labels));

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLang);
    button.setAttribute("aria-pressed", button.dataset.lang === currentLang ? "true" : "false");
  });

  updateTopicCards();
  renderChart(serviceChart, pack.stats.service);
  renderChart(requestChart, pack.stats.request);
  updateUserCount();
  updateActivePaymentNote();
  document.querySelector("#memberStatus").textContent = pack.messages.memberDefault;
  if (adminDashboard.classList.contains("is-hidden")) {
    adminGateStatus.textContent = currentLang === "th" ? "ยังไม่เข้าสู่ระบบผู้ดูแล" : currentLang === "en" ? "Admin is not logged in" : "管理员尚未登录";
  } else {
    adminGateStatus.textContent = pack.messages.adminOpen;
  }

  if (category.value) {
    const config = getTopicConfig(category.value);
    questionnaireTitle.textContent = config.title;
    document.querySelector("#symptoms").placeholder = config.placeholder;
    renderDynamicFields(category.value);
    applyDatePlaceholders();
    renderChecks(category.value);
  }

  renderNotificationPolicy();
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function selectedChecks() {
  return Array.from(document.querySelectorAll(".quick-check:checked")).map((input) => input.value);
}

function readForm() {
  return {
    name: document.querySelector("#customerName").value.trim() || runtimePack().defaultName,
    phone: document.querySelector("#phone").value.trim(),
    lineId: document.querySelector("#lineId")?.value.trim() || "",
    channel: document.querySelector("#channel").value,
    notifyDate: document.querySelector("#notifyDate")?.value || toDateInputValue(),
    notifyTime: document.querySelector("#notifyTime").value,
    reminderTitle: document.querySelector("#reminderTitle")?.value.trim() || "",
    category: category.value,
    vehicleModel: document.querySelector("#vehicleModel").value.trim(),
    vehicleYear: document.querySelector("#vehicleYear").value,
    mileage: Number(document.querySelector("#mileage").value || 0),
    usageLevel: document.querySelector("#usageLevel").value,
    lastService: document.querySelector("#lastService").value,
    lastOilChange: document.querySelector("#lastOilChange").value,
    dashboardWarning: document.querySelector("#dashboardWarning")?.value || "",
    workDone: document.querySelector("#workDone")?.value.trim() || "",
    handledStatus: document.querySelector("#handledStatus")?.value || "",
    illnessStartYear: document.querySelector("#illnessStartYear")?.value || "",
    currentMedicine: document.querySelector("#currentMedicine")?.value.trim() || "",
    doctorVisit: document.querySelector("#doctorVisit")?.value || "",
    medicineStatus: document.querySelector("#medicineStatus")?.value || "",
    symptoms: document.querySelector("#symptoms").value.trim(),
    checks: selectedChecks(),
    frequency: document.querySelector("#frequency").value,
    severity: Number(severity.value),
    consent: document.querySelector("#consent").checked
  };
}

function getRisk(data) {
  let score = data.severity;
  const runtime = runtimePack();
  const warningNone = runtime.dynamic.car.warningOptions[0];
  const unhandled = runtime.dynamic.car.handledOptions[0];
  const missedMedicine = runtime.dynamic.health.medicineStatusOptions[1];
  if (data.frequency === "often") score += 1;
  if (data.frequency === "always") score += 2;
  if (/ไฟเตือน|เบรก|ควัน|ไหม้|ร้อน|ดับ|สตาร์ทยาก|เจ็บ|ปวด|หมดอายุ|เสีย|warning|brake|smoke|burn|hot|stall|pain|expired|broken|警示|刹车|冒烟|发热|熄火|疼|过期|损坏/.test(data.symptoms)) score += 1;
  if (data.dashboardWarning && data.dashboardWarning !== warningNone) score += 1;
  if (data.handledStatus === unhandled) score += 1;
  if (data.medicineStatus === missedMedicine) score += 1;
  if (data.checks.length >= 4) score += 1;
  if (!data.consent) score += 2;

  if (score >= 6) return { ...runtime.risk.high, tone: "high" };
  if (score >= 4) return { ...runtime.risk.medium, tone: "medium" };
  return { ...runtime.risk.low, tone: "low" };
}

function buildDefaultReminders(data, risk) {
  const runtime = runtimePack();
  const reminder = runtime.reminder;
  const urgentDays = risk.tone === "high" ? 1 : risk.tone === "medium" ? 7 : 30;
  const primaryDue = data.notifyDate || addDays(urgentDays);
  const checked = data.checks.length ? data.checks.join(", ") : reminder.checkedFallback;

  if (data.category === "car") {
    const car = reminder.car;
    const carContext = [
      data.vehicleYear ? `${car.year} ${data.vehicleYear}` : "",
      data.mileage ? `${car.mileage} ${formatNumber(data.mileage)} ${car.mileageUnit}` : "",
      data.lastOilChange ? `${car.lastOil} ${formatDate(new Date(data.lastOilChange))}` : "",
      data.dashboardWarning ? `${car.warning}: ${data.dashboardWarning}` : "",
      data.workDone ? `${car.workDone}: ${data.workDone}` : "",
      data.handledStatus ? `${car.status}: ${data.handledStatus}` : ""
    ].filter(Boolean).join(" · ");
    return [
      {
        title: data.reminderTitle || car.checkTitle,
        due: primaryDue,
        time: data.notifyTime,
        detail: data.symptoms ? `${car.symptomPrefix}: ${data.symptoms}${carContext ? " · " + carContext : ""}` : `${car.focusPrefix}: ${checked}${carContext ? " · " + carContext : ""}`
      },
      {
        title: car.guideTitle,
        due: addDays(data.usageLevel === "heavy" ? 60 : 90),
        detail: runtime.dynamic.car.guide.map((item) => `${item.label}: ${item.interval}`).slice(0, 4).join(" | ")
      },
      {
        title: car.docsTitle,
        due: addDays(180),
        detail: car.docsDetail
      }
    ];
  }

  if (data.category === "health") {
    const health = reminder.health;
    const healthContext = [
      data.illnessStartYear ? `${health.startYear} ${data.illnessStartYear}` : "",
      data.currentMedicine ? `${health.currentMedicine}: ${data.currentMedicine}` : "",
      data.doctorVisit ? `${health.doctorVisit}: ${data.doctorVisit}` : "",
      data.medicineStatus ? `${health.medicineStatus}: ${data.medicineStatus}` : ""
    ].filter(Boolean).join(" · ");
    return [
      {
        title: data.reminderTitle || health.trackTitle,
        due: primaryDue,
        time: data.notifyTime,
        detail: `${data.symptoms || health.symptomFallback}${healthContext ? " · " + healthContext : ""}`
      },
      {
        title: health.medicineTitle,
        due: addDays(30),
        detail: health.medicineDetail
      }
    ];
  }

  const [title, fallback] = reminder.categories[data.category] || reminder.categories.default;
  return [
    { title: data.reminderTitle || title, due: primaryDue, time: data.notifyTime, detail: data.checks.length ? `${reminder.trackPrefix}: ${checked}` : fallback },
    { title: reminder.followUpTitle, due: addDays(30), detail: reminder.followUpDetail }
  ];
}

function renderRisk(risk) {
  riskLevel.textContent = risk.label;
  riskBadge.textContent = risk.badge;
  riskBadge.className = `badge ${risk.tone}`;
}

function renderTimeline() {
  timeline.innerHTML = reminders.map((item) => {
    const due = item.due ? formatReminderDateTime(item.due, item.time) : runtimePack().noDate;
    return `
      <article class="task-card">
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.detail)}</p>
        </div>
        <span class="due-chip">${escapeHtml(due)}</span>
      </article>
    `;
  }).join("");
}

function renderAlertSummary(data, risk) {
  const first = reminders[0];
  if (!alertSummary || !first) return;

  const activeDate = notificationState.rescheduledDate || first.due || data.notifyDate || toDateInputValue();
  const activeTime = notificationState.rescheduledTime || first.time || data.notifyTime || "09:00";
  const status = notificationState.acknowledgedToday
    ? "รับทราบแล้ว"
    : notificationState.rescheduledDate
      ? "เลื่อนเวลาแล้ว"
      : "รอรับทราบ";
  const destination = [
    data.lineId ? `LINE ID: ${data.lineId}` : "",
    data.phone ? `โทร: ${data.phone}` : "",
    data.channel ? `ช่องทาง: ${data.channel}` : ""
  ].filter(Boolean).join(" · ") || "ยังไม่ระบุปลายทาง";

  alertSummary.innerHTML = `
    <div class="alert-summary-head">
      <div>
        <p class="eyebrow small">NOTIFICATION PREVIEW</p>
        <h3>${escapeHtml(first.title)}</h3>
      </div>
      <span class="status-pill">${escapeHtml(status)}</span>
    </div>
    <div class="alert-summary-grid">
      <div><span>ผู้รับ</span><strong>${escapeHtml(data.name)}</strong></div>
      <div><span>วันเวลา</span><strong>${escapeHtml(formatReminderDateTime(activeDate, activeTime))}</strong></div>
      <div><span>ปลายทาง</span><strong>${escapeHtml(destination)}</strong></div>
      <div><span>ระดับ</span><strong>${escapeHtml(risk.label)}</strong></div>
    </div>
    <div class="alert-summary-detail">
      <span>รายละเอียด</span>
      <p>${escapeHtml(first.detail)}</p>
    </div>
  `;
}

function renderMessage(data, risk) {
  const first = reminders[0];
  if (!first) {
    messagePreview.value = currentLang === "th"
      ? "เลือกเรื่องและกดสร้างแผนเพื่อดูข้อความ"
      : currentLang === "en"
        ? "Choose a topic and create a plan to preview the message"
        : "请选择主题并生成计划以预览消息";
    return;
  }
  const activeDate = notificationState.rescheduledDate || first.due || data.notifyDate || toDateInputValue();
  const activeTime = notificationState.rescheduledTime || first.time || data.notifyTime || "09:00";
  const due = formatReminderDateTime(activeDate, activeTime);
  const asset = data.category === "car" && data.vehicleModel ? ` (${data.vehicleModel})` : "";
  const contact = [
    data.channel ? `Channel: ${data.channel}` : "",
    data.lineId ? `LINE ID: ${data.lineId}` : "",
    data.phone ? `Phone: ${data.phone}` : ""
  ].filter(Boolean).join(" | ");
  if (currentLang === "en") {
    messagePreview.value =
`Jam Hai Tee

To ${data.name}${asset}
${first.title}
${due}
${contact}

${risk.label}
${first.detail}

Note: This is a reminder message, not a diagnosis.`;
    return;
  }

  if (currentLang === "zh") {
    messagePreview.value =
`Jam Hai Tee

致 ${data.name}${asset}
${first.title}
${due}
${contact}

${risk.label}
${first.detail}

备注：这是提醒消息，不是诊断。`;
    return;
  }

  messagePreview.value =
`จำให้ที

ถึง ${data.name}${asset}
${first.title}
${due}
${contact}

${risk.label}
${first.detail}

หมายเหตุ: เป็นข้อความช่วยเตือน ไม่ใช่การวินิจฉัย`;
}

function renderNotificationPolicy() {
  const first = reminders[0];
  const activeDate = notificationState.rescheduledDate || first?.due || toDateInputValue();
  const activeTime = notificationState.rescheduledTime || first?.time || document.querySelector("#notifyTime")?.value || "09:00";
  const localizedSlots = first ? [
    { label: "เวลาที่ตั้ง", time: activeTime },
    { label: "รับทราบ", time: "หยุดเตือนซ้ำ" },
    { label: "เลื่อนเวลา", time: "เลือกวัน/เวลาใหม่" }
  ] : runtimePack().slots;

  notificationSlots.innerHTML = localizedSlots.map((slot) => `
    <div class="notify-slot ${notificationState.acknowledgedToday ? "is-muted" : ""}">
      <strong>${slot.label}</strong>
      <span>${slot.time}</span>
    </div>
  `).join("");

  if (notificationState.acknowledgedToday) {
    notificationStatus.textContent = langPack().messages.ack;
    return;
  }

  if (notificationState.rescheduledDate) {
    const date = formatDate(new Date(notificationState.rescheduledDate));
    notificationStatus.textContent = langPack().messages.rescheduled(date, notificationState.rescheduledTime || "09:00");
    return;
  }

  notificationStatus.textContent = `พร้อมแจ้งเตือน: ${formatReminderDateTime(activeDate, activeTime)} · กดรับทราบเพื่อหยุดเตือน หรือเลื่อนถ้าไม่สะดวก`;
}

function evaluate() {
  const data = readForm();
  const risk = getRisk(data);
  reminders = buildDefaultReminders(data, risk);
  renderRisk(risk);
  renderTimeline();
  renderAlertSummary(data, risk);
  renderNotificationPolicy();
  renderMessage(data, risk);
  resultPanel.classList.remove("is-hidden");
}

function renderChecks(nextCategory) {
  const config = getTopicConfig(nextCategory);
  quickChecks.innerHTML = `
    <p class="quick-checks-title">${escapeHtml(runtimePack().quickChecksTitle)}</p>
    <div class="check-grid">
      ${config.checks.map((label) => `
        <label class="check-pill">
          <input class="quick-check" type="checkbox" value="${escapeHtml(label)}">
          <span>${escapeHtml(label)}</span>
        </label>
      `).join("")}
    </div>
  `;
}

function renderDynamicFields(nextCategory) {
  const runtime = runtimePack();
  if (nextCategory === "car") {
    const car = runtime.dynamic.car;
    dynamicFields.innerHTML = `
      <div class="field-grid">
        <label>
          ${escapeHtml(car.workDoneLabel)}
          <input id="workDone" type="text" placeholder="${escapeHtml(car.workDonePlaceholder)}">
        </label>
        <label>
          ${escapeHtml(car.handledLabel)}
          <select id="handledStatus">
            ${car.handledOptions.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}
          </select>
        </label>
      </div>
      <label>
        ${escapeHtml(car.warningLabel)}
        <select id="dashboardWarning">
          ${car.warningOptions.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}
        </select>
      </label>
      <div class="guide-card">
        <p class="quick-checks-title">${escapeHtml(car.guideTitle)}</p>
        ${car.guide.map((item) => `<div><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.interval)}</span></div>`).join("")}
      </div>
    `;
    return;
  }

  if (nextCategory === "health") {
    const health = runtime.dynamic.health;
    dynamicFields.innerHTML = `
      <div class="field-grid">
        <label>
          ${escapeHtml(health.startYearLabel)}
          <input id="illnessStartYear" type="number" min="1950" max="2035" placeholder="${escapeHtml(health.startYearPlaceholder)}">
        </label>
        <label>
          ${escapeHtml(health.doctorVisitLabel)}
          <input id="doctorVisit" type="text" inputmode="numeric" autocomplete="off" placeholder="YYYY-MM-DD">
        </label>
      </div>
      <label>
        ${escapeHtml(health.currentMedicineLabel)}
        <input id="currentMedicine" type="text" placeholder="${escapeHtml(health.currentMedicinePlaceholder)}">
      </label>
      <label>
        ${escapeHtml(health.medicineStatusLabel)}
        <select id="medicineStatus">
          ${health.medicineStatusOptions.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}
        </select>
      </label>
    `;
    return;
  }

  const generic = runtime.dynamic.generic;
  dynamicFields.innerHTML = `
    <div class="field-grid">
      <label>
        ${escapeHtml(generic.startLabel)}
        <input id="workDone" type="text" placeholder="${escapeHtml(generic.startPlaceholder)}">
      </label>
      <label>
        ${escapeHtml(generic.handledLabel)}
        <select id="handledStatus">
          ${generic.handledOptions.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}
        </select>
      </label>
    </div>
  `;
}

function setCategory(nextCategory) {
  const config = getTopicConfig(nextCategory);
  category.value = nextCategory;
  questionnaireTitle.textContent = config.title;
  document.querySelector("#symptoms").value = "";
  document.querySelector("#symptoms").placeholder = config.placeholder;
  vehicleFields.style.display = nextCategory === "car" ? "grid" : "none";
  topicCards.forEach((card) => card.classList.toggle("is-active", card.dataset.category === nextCategory));
  renderDynamicFields(nextCategory);
  renderChecks(nextCategory);
  notificationState = { acknowledgedToday: false, rescheduledDate: "", rescheduledTime: "" };
  rescheduleDate.value = "";
  rescheduleTime.value = "09:00";
  resultPanel.classList.add("is-hidden");
  formShell.classList.remove("is-hidden");
  formShell.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateUserCount() {
  const count = Number(userCountInput.value);
  exactUserCount.textContent = formatNumber(count);
  publicUserCount.textContent = count >= 500 ? "500+" : langPack().messages.notPublic;
}

function renderChart(target, rows) {
  const max = Math.max(...rows.map((row) => row.value));
  target.innerHTML = rows.map((row) => {
    const width = Math.max(8, Math.round((row.value / max) * 100));
    return `
      <div class="chart-row">
        <header>
          <span>${row.label}</span>
          <span>${formatNumber(row.value)}</span>
        </header>
        <div class="bar-track" aria-hidden="true">
          <span class="bar-fill" style="width: ${width}%"></span>
        </div>
      </div>
    `;
  }).join("");
}

function setAdminAccess(isOpen) {
  adminDashboard.classList.toggle("is-hidden", !isOpen);
  adminGateStatus.textContent = isOpen
    ? langPack().messages.adminOpen
    : langPack().messages.adminClosed;
}

severity.addEventListener("input", () => {
  severityValue.textContent = severity.value;
});

topicCards.forEach((card) => {
  card.addEventListener("click", () => setCategory(card.dataset.category));
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const richMenuActions = ["create", "status", "expert", "reschedule", "plans", "support"];
richMenuButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const action = richMenuActions[index];
    button.classList.remove("is-activated");
    void button.offsetWidth;
    button.classList.add("is-activated");
    if (action === "create") goToSection("#topics", "create");
    if (action === "status") goToSection("#owner", "status");
    if (action === "expert") goToSection("#line-expert", "expert");
    if (action === "reschedule") goToSection(resultPanel.classList.contains("is-hidden") ? "#topics" : "#resultPanel", "reschedule");
    if (action === "plans") goToSection("#pricing", "plans");
    if (action === "support") goToSection("#membership", "support");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("href");
    setTimeout(() => pulseTarget(target), 360);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  evaluate();
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#memberName").value.trim() || runtimePack().newMember;
  const channel = document.querySelector("#memberChannel").value;
  const consent = document.querySelector("#memberConsent").checked;
  document.querySelector("#memberStatus").textContent = consent
    ? langPack().messages.memberOk(name, channel)
    : langPack().messages.memberConsent;
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#loginStatus").textContent = langPack().messages.loginOk;
});

adminLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const adminUser = document.querySelector("#adminUser").value.trim();
  const adminPass = document.querySelector("#adminPass").value.trim();
  if (!adminUser || !adminPass) {
    adminGateStatus.textContent = langPack().messages.adminMissing;
    return;
  }
  setAdminAccess(true);
});

adminLogout.addEventListener("click", () => {
  setAdminAccess(false);
});

paymentCards.forEach((card) => {
  card.addEventListener("click", () => {
    paymentCards.forEach((item) => item.classList.toggle("is-active", item === card));
    paymentNote.textContent = langPack().paymentNotes[card.dataset.payment];
  });
});

copyMessage.addEventListener("click", async () => {
  if (!messagePreview.value) return;
  try {
    await navigator.clipboard.writeText(messagePreview.value);
    copyMessage.textContent = langPack().messages.copied;
    setTimeout(() => copyMessage.textContent = langPack().messages.copy, 1200);
  } catch {
    messagePreview.focus();
    messagePreview.select();
    showToast(runtimePack().toast.copiedFallback);
  }
});

simulateSend.addEventListener("click", () => {
  const data = readForm();
  const li = document.createElement("li");
  const now = new Intl.DateTimeFormat(langPack().locale, { dateStyle: "short", timeStyle: "short" }).format(new Date());
  const target = [data.lineId ? `LINE ID ${data.lineId}` : "", data.phone || ""].filter(Boolean).join(" / ") || langPack().messages.phoneMissing;
  li.textContent = langPack().messages.sendTest(now, data.channel, target);
  sendLog.prepend(li);
});

acknowledgeToday.addEventListener("click", () => {
  notificationState.acknowledgedToday = true;
  renderAlertSummary(readForm(), getRisk(readForm()));
  renderNotificationPolicy();
  renderMessage(readForm(), getRisk(readForm()));
});

resetAck.addEventListener("click", () => {
  notificationState.acknowledgedToday = false;
  renderAlertSummary(readForm(), getRisk(readForm()));
  renderNotificationPolicy();
  renderMessage(readForm(), getRisk(readForm()));
});

rescheduleButton.addEventListener("click", () => {
  if (!rescheduleDate.value) {
    notificationStatus.textContent = langPack().messages.rescheduleMissing;
    return;
  }
  notificationState.acknowledgedToday = false;
  notificationState.rescheduledDate = rescheduleDate.value;
  notificationState.rescheduledTime = rescheduleTime.value || "09:00";
  renderAlertSummary(readForm(), getRisk(readForm()));
  renderNotificationPolicy();
  renderMessage(readForm(), getRisk(readForm()));
});

userCountInput.addEventListener("input", updateUserCount);
vehicleFields.style.display = "none";
messagePreview.value = "";
const notifyDateInput = document.querySelector("#notifyDate");
if (notifyDateInput && !notifyDateInput.value) notifyDateInput.value = toDateInputValue();
const channelInput = document.querySelector("#channel");
if (channelInput) channelInput.selectedIndex = 1;
applyLanguage(currentLang);
