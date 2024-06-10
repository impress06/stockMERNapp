const PDFDocument = require('pdfkit');
const path = require('path');

const invoices = (req, res) => {
  try {
    const invoice = req.body;
    console.log(invoice);

    const doc = new PDFDocument({ margin: 50 });

    let chunks = [];
    let result;

    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      result = Buffer.concat(chunks);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
        'Content-Length': result.length,
      });
      res.end(result);
    });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.end();
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).send('An error occurred while creating the invoice.');
  }
};

function generateHeader(doc) {
  doc
    .image(path.join(__dirname, '../../assets/logo.png'), 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('Company Name', 110, 57)
    .fontSize(10)
    .text('Company Name', 200, 50, { align: 'right' })
    .text('Cumhuriyet mahallesi Mithat pasa caddesi 30/21 6. kat ', 200, 65, { align: 'right' })
    .text('Ankara, Çankaya,Tel:+90 551 181 56 05', 200, 80, { align: 'right' })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('Invoice', 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text('Invoice Number:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(invoice.invoice_nr || 'N/A', 150, customerInformationTop)
    .font('Helvetica')
    .text('Invoice Date:', 50, customerInformationTop + 15)
    .text(invoice.date || 'N/A', 150, customerInformationTop + 15)
    .text('Balance Due:', 50, customerInformationTop + 30)
    .text(invoice.price * invoice.quantity || 'N/A', 150, customerInformationTop + 30)
    .font('Helvetica-Bold')
    .text(invoice.username, 300, customerInformationTop)
    .font('Helvetica')
    .text('Address not provided', 300, customerInformationTop + 15)
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  const invoiceTableTop = 300;
  const rowHeight = 60;

  doc.font('Helvetica-Bold');
  generateTableRow(doc, invoiceTableTop, 'Item', 'Description', 'Unit Cost', 'Quantity', 'Line Total');
  generateHr(doc, invoiceTableTop + rowHeight);

  doc.font('Helvetica');
  const position = invoiceTableTop + rowHeight;
  generateTableRow(doc, position, invoice.productName, 'Product description not provided', invoice.price, invoice.quantity, invoice.price * invoice.quantity);
  generateHr(doc, position + rowHeight);

  const subtotalPosition = position + rowHeight;
  generateTableRow(doc, subtotalPosition, '', '', 'Subtotal', '', invoice.price * invoice.quantity);

  const paidToDatePosition = subtotalPosition + rowHeight;
  generateTableRow(doc, paidToDatePosition, '', '', 'Paid To Date', '', 0);

  const duePosition = paidToDatePosition + rowHeight;
  doc.font('Helvetica-Bold');
  generateTableRow(doc, duePosition, '', '', 'Balance Due', '', invoice.price * invoice.quantity);
  doc.font('Helvetica');
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      'Payment is due within 15 days. Thank you for your business.',
      50,
      500,
      { align: 'center', width: 500 }
    );
}

function generateTableRow(doc, y, item, description, unitCost, quantity, lineTotal) {
  const itemWidth = 80;
  const descriptionWidth = 150;
  const unitCostWidth = 90;
  const quantityWidth = 90;
  const lineTotalWidth = 90;

  doc
    .fontSize(10)
    .text(item, 50, y, { width: itemWidth, height: 50, ellipsis: false })
    .text(description, 150, y, { width: descriptionWidth, height: 50, ellipsis: true })
    .text(unitCost, 320, y, { width: unitCostWidth, align: 'right' })
    .text(quantity, 410, y, { width: quantityWidth, align: 'right' })
    .text(lineTotal, 500, y, { width: lineTotalWidth, align: 'right' });
}

function generateHr(doc, y) {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(55, y)
    .lineTo(550, y)
    .stroke();
}

module.exports = invoices;
