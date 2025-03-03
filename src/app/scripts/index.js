document.addEventListener('DOMContentLoaded', function() {
    const reportData = JSON.parse(localStorage.getItem('reportData'));

    if (reportData) {
        document.getElementById('bitNo').textContent = reportData.bitNo;
        document.getElementById('bitTc').textContent = reportData.bitTc;
        document.getElementById('sleeveStab').textContent = reportData.sleeveStab;
        document.getElementById('typeBit').textContent = reportData.typeBit;
        document.getElementById('floatSub').textContent = reportData.floatSub;
        document.getElementById('snBit').textContent = reportData.snBit;
        document.getElementById('stringStabilizer').textContent = reportData.stringStabilizer;
        document.getElementById('iadc').textContent = reportData.iadc;
        document.getElementById('nmdc').textContent = reportData.nmdc;
        document.getElementById('bit17hrs').textContent = reportData.bit17hrs;
    }
});

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    var element = document.getElementById("main-container");

    $("#generate-pdf").attr("hidden", true);

    html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        var imgData = canvas.toDataURL("image/png");

        var pdfWidth = 600; 
        var imgWidth = pdfWidth;
        var imgHeight = (canvas.height * pdfWidth) / canvas.width;

        var pdf = new jsPDF("p", "pt", [pdfWidth, imgHeight], true);

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("report.pdf");   

        $("#generate-pdf").removeAttr("hidden");
    }).catch(error => {
        console.error("PDF generation failed:", error);
        $("#generate-pdf").removeAttr("hidden");
    });
}