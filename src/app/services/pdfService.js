import PDFDocument from 'pdfkit';

const generatePDF = (tickets) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(18).text('Passenger Manifest', { align: 'center' });
    doc.moveDown();

    tickets.forEach((ticket, index) => {
      doc.fontSize(12).text(`${index + 1}. ${ticket.userId.username} - Seat ${ticket.seatNumber} - ${ticket.status}`);
    });

    doc.end();
  });
};

export { generatePDF };