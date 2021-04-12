import jsPDF from "jspdf";
import formatMoney from "./moneyFormat";
const doc = new jsPDF();
const pdf = (data) => {
  const { customer, products, total } = data;
  doc.setFont("courier");
  let height = 105;
  doc.setFontSize(25);
  doc.text(20, 30, "CUA HANG THOI TRANG MYMY");
  doc.setLineWidth(0.5);
  doc.line(20, 34, 150, 34);
  doc.setFontSize(16);
  doc.text(20, 45, "THONG TIN KHACH HANG");
  doc.text(20, 55, `HO VA TEN: ${customer.fullname}`);
  doc.text(20, 65, `SDT: ${customer.phonenumber}`);
  doc.text(20, 75, `DIA CHI: ${customer.address}`);
  doc.text(20, 90, "SAN PHAM");
  doc.setLineWidth(0.5);
  doc.line(20, 95, 150, 95);
  for (const product of products) {
    doc.text(20, height, product.name);
    height += 10;
    doc.text(20, height, formatMoney(product.price));
    height += 10;
  }
  doc.setLineWidth(0.5);
  doc.line(20, height, 150, 180);
  height += 10;
  doc.text(20, height, formatMoney(total));
  doc.setFontSize(13);
  height += 10;
  doc.text(20, height, "ZALO : 0945906633");
  height += 10;
  doc.text(20, height, "FACEBOOK: #mymysaigon");
  height += 10;
  doc.text(20, height, "SDT: " + "0945906633");
  height += 10;
  doc.text(20, height, "DIA CHI: " + "C36, DINH DUC THIEN");
  height += 10;
  doc.text(20, height, "X. BINH CHANH, H. BINH CHANH, HCM");
  return doc;
};

export default pdf;
