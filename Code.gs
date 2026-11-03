/**
 * GOOGLE APPS SCRIPT - ĐỒNG BỘ ĐĂNG KÝ VOS ROCKY 2026 VÀO GOOGLE SHEETS
 * Google Sheet: https://docs.google.com/spreadsheets/d/1kbLysT60InOhoTPOYlwQVuwi11IUbrYh3vPaZXoHGQM/edit?gid=2037923750#gid=2037923750
 * Spreadsheet ID: 1kbLysT60InOhoTPOYlwQVuwi11IUbrYh3vPaZXoHGQM
 * Sheet GID mục tiêu: 2037923750
 */

const TARGET_SPREADSHEET_ID = '1kbLysT60InOhoTPOYlwQVuwi11IUbrYh3vPaZXoHGQM';
const TARGET_SHEET_GID = 2037923750;

// Danh sách tiêu đề cột tự động tạo nếu sheet đang trống
const HEADERS = [
  'Thời gian đăng ký',
  'Tên đơn vị / Phòng khám / Cửa hàng',
  'Loại hình đơn vị',
  'Tỉnh / Thành phố',
  'Địa chỉ chi tiết',
  'Họ và tên người liên hệ',
  'Số điện thoại / Zalo',
  'Email',
  'Sản phẩm quan tâm',
  'Ghi chú tròng khác',
  'Nhân viên Rocky hỗ trợ',
  'Tên nhân viên khác',
  'Ghi chú & Yêu cầu thêm',
  'Đồng ý điều khoản'
];

/**
 * Lấy đúng sheet mục tiêu theo ID hoặc GID 2037923750
 */
function getTargetSheet() {
  let ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {}
  
  if (!ss) {
    ss = SpreadsheetApp.openById(TARGET_SPREADSHEET_ID);
  }

  // Tìm sheet khớp với gid=2037923750
  const sheets = ss.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === TARGET_SHEET_GID) {
      return sheets[i];
    }
  }

  // Nếu không thấy đúng GID, trả về sheet đầu tiên
  return ss.getSheets()[0];
}

/**
 * Khởi tạo hàng tiêu đề nếu sheet còn trống
 */
function initSheetHeadersIfNeeded(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#117e91');
    headerRange.setFontColor('#ffffff');
    headerRange.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    
    // Đặt độ rộng các cột cơ bản
    sheet.setColumnWidth(1, 160); // Thời gian
    sheet.setColumnWidth(2, 240); // Tên đơn vị
    sheet.setColumnWidth(3, 180); // Loại hình
    sheet.setColumnWidth(4, 140); // Tỉnh/TP
    sheet.setColumnWidth(5, 220); // Địa chỉ
    sheet.setColumnWidth(6, 180); // Họ tên
    sheet.setColumnWidth(7, 140); // SĐT
    sheet.setColumnWidth(8, 180); // Email
    sheet.setColumnWidth(9, 220); // Sản phẩm
    sheet.setColumnWidth(13, 260); // Ghi chú
  }
}

/**
 * Xử lý ghi nhận thông tin đăng ký vào Google Sheet
 */
function processRegistration(data) {
  // Lọc bot/spam qua trường ẩn honeypot
  if (data.website && data.website.toString().trim() !== '') {
    return { ok: true, message: 'Bot submission ignored' };
  }

  const sheet = getTargetSheet();
  initSheetHeadersIfNeeded(sheet);

  const timestamp = Utilities.formatDate(new Date(), 'GMT+7', 'dd/MM/yyyy HH:mm:ss');
  const products = Array.isArray(data.products) ? data.products.join(', ') : (data.products || '');
  
  // Dùng dấu ' ở đầu SĐT để Google Sheets không làm mất số 0 đầu
  const phoneFormatted = data.phone ? "'" + data.phone.toString().trim() : '';

  const row = [
    timestamp,
    data.unitName || '',
    data.businessModel || '',
    data.province || '',
    data.storeAddress || '',
    data.fullName || '',
    phoneFormatted,
    data.email || '',
    products,
    data.otherProductNote || '',
    data.salesStaff || '',
    data.otherSales || '',
    data.notes || '',
    data.consent ? 'Đồng ý' : ''
  ];

  sheet.appendRow(row);
  return { ok: true, message: 'Đăng ký thành công', timestamp: timestamp };
}

/**
 * Tiếp nhận POST request từ Fetch API (GitHub Pages / Website tĩnh)
 */
function doPost(e) {
  try {
    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    const result = processRegistration(data);
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Hỗ trợ chạy trực tiếp trong Google Apps Script HtmlService
 */
function submitRegistration(data) {
  return processRegistration(data);
}

/**
 * Kiểm tra Web App bằng cách mở link trên trình duyệt
 */
function doGet(e) {
  return ContentService.createTextOutput('Webhook VOS Rocky 2026 đang hoạt động tốt!')
    .setMimeType(ContentService.MimeType.TEXT);
}
