import jsPDF from "jspdf";
import formatMoney from "./moneyFormat";
import cleanUnicode from "./cleanUnicode";
const doc = new jsPDF();

const pdf = (data) => {
  const { customer, products, total } = data;
  let height = 105;
  const marginLeft = 10;
  doc.setFontSize(25);
  doc.text(marginLeft, 30, "THOI TRANG MYMY");
  doc.setLineWidth(0.5);
  doc.line(marginLeft, 34, 150, 34);
  doc.setFontSize(16);
  doc.text(marginLeft, 45, "THONG TIN KHACH HANG");
  doc.setFontSize(14);
  doc.text(marginLeft, 55, `HO VA TEN: ${cleanUnicode(customer.fullname)}`);
  doc.text(marginLeft, 65, `SDT: ${cleanUnicode(customer.phonenumber)}`);
  doc.text(marginLeft, 75, `DIA CHI: ${cleanUnicode(customer.address)}`);
  doc.setFontSize(16);
  doc.text(marginLeft, 90, "SAN PHAM");
  doc.setLineWidth(0.5);
  doc.setFontSize(14);
  doc.line(marginLeft, 95, 150, 95);
  for (const data of products) {
    doc.text(marginLeft, height, cleanUnicode(data.product.name));
    height += 10;
    doc.text(
      marginLeft,
      height,
      cleanUnicode(formatMoney(data.product.price) + " x SL: " + data.quantity)
    );
    height += 10;
  }
  height -= 5;
  doc.setLineWidth(0.5);
  doc.line(marginLeft, height, 150, height);
  height += 10;
  doc.text(
    marginLeft,
    height,
    `THANH TIEN : ${cleanUnicode(formatMoney(total))}`
  );
  doc.setFontSize(13);
  height += 30;
  doc.text(marginLeft, height, "ZALO : 0945906633");
  height += 10;
  doc.text(marginLeft, height, "FACEBOOK: #mymysaigon");
  height += 10;
  doc.text(marginLeft, height, "SDT: " + "0945906633");
  height += 10;
  doc.text(marginLeft, height, "DIA CHI: " + "C36, DINH DUC THIEN");
  height += 10;
  doc.text(marginLeft, height, "X. BINH CHANH, H. BINH CHANH, HCM");
  return doc;
};

export default pdf;
