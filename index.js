const { PDFDocument, rgb, degrees } = PDFLib;
const generatePDF = async (name) => {
  const exBytes = await fetch("./cert1.pdf").then((res) => {
    return res.arrayBuffer();
  });
  const exFont = await fetch("./Poppins-Black.ttf").then((res) => {
    return res.arrayBuffer();
  });

  const pdfDoc = await PDFDocument.load(exBytes);
  pdfDoc.registerFontkit(fontkit);
  const myFont = await pdfDoc.embedFont(exFont);

  const pages = pdfDoc.getPages();
  const firstPg = pages[0];
  firstPg.drawText(name, {
    x: 323,
    y: 370,
    size: 25,
    font: myFont,
    color: rgb(0.2, 0.84, 0.67),
  });

  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");
  //   const uri = await pdfDoc.saveAsBase64({ dataUri: true });
  //   saveAs(uri, "cert.pdf", { autoBom: true });
  var file = new File([pdfBytes], "Mathematics Participation certificate.pdf", {
    type: "application/pdf;charset=utf-8",
  });
  saveAs(file);
  //   window.open(uri);
  //   document.querySelector("#mypdf").src = uri;
};
const submitBtn = document.getElementById("submit");
const inputVal = document.querySelector("#name");

submitBtn.addEventListener("click", () => {
  const val = inputVal.value;
  generatePDF(val);
});
