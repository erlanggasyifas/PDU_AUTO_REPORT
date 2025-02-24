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
    var pdf = new jsPDF('p', 'pt', 'a4'); // Portrait, points, A4 size
    var element = document.getElementById("main-container");

    $("#generate-pdf").attr("hidden", true); // Hide button during processing

    html2canvas(element, {
        scale: 1.2, // Improves resolution
        useCORS: true,
        backgroundColor: "#ffffff" // Avoids transparent background
    }).then(canvas => {
        var imgData = canvas.toDataURL("image/png", 0.2);

        var imgWidth = 595.28; // A4 width in points
        var pageHeight = 841.89; // A4 height in points
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        var y = 0;

        pdf.addImage(imgData, "jpeg", 0, y, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        y = -pageHeight;

        // Loop to add pages if content overflows
        while (heightLeft > 0) {
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            y -= pageHeight;
        }

        pdf.save("report.pdf");
        $("#generate-pdf").removeAttr("hidden"); // Show button again
    }).catch(error => {
        console.error("PDF generation failed:", error);
        $("#generate-pdf").removeAttr("hidden");
    });
}

