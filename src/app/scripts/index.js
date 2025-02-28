document.addEventListener('DOMContentLoaded', function() {
    const reportData = JSON.parse(localStorage.getItem('reportData'));

    if (reportData) {
        document.getElementById('reportNo').textContent = reportData.reportNo;
        document.getElementById('companyWell').textContent = reportData.companyWell;
        document.getElementById('date').textContent = reportData.date;
        document.getElementById('wellType').textContent = reportData.wellType;
        document.getElementById('depthMD').textContent = reportData.depthMD;
        document.getElementById('depthTVD').textContent = reportData.depthTVD;
        document.getElementById('coMan').textContent = reportData.coMan;
        document.getElementById('engineer').textContent = reportData.engineer;
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