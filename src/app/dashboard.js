"use client";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Dashboard = () => {
  const [reportData, setReportData] = useState({
    reportNo: "9",
    date: "5-Jun-12",
    well: "PB-18",
    spudDate: "June 09, 2012",
    depth: "4483.00 FT MD",
    prevDepth: "4314.00 FT MD",
    company: "TEXCAL MAHA TD Ltd",
    wellType: "DEVIATED WELL",
    engineer: "AGUNG NURWANA / RONALD P.",
    progress24Hrs: "383.00 FT MD",
    midnightDepth: "3110.00 FT MD",
    casing: "12110 FT TVD",
  });

  const [pdfUrl, setPdfUrl] = useState(null);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk membuat PDF dengan tabel
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Judul laporan
    doc.setFontSize(16);
    doc.text("AFTERNOON REPORT", 105, 20, null, null, "center");

    // Konversi data ke array untuk tabel
    const tableData = Object.entries(reportData).map(([key, value]) => [
      key.toUpperCase(),
      value,
    ]);

    // Tambahkan tabel ke PDF
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }, // Warna biru
    });

    // Tambahkan tabel tambahan (misalnya, BHA No.)
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10, // Tambahkan tabel di bawahnya
      head: [["BHA No.", "Size", "Weight", "Length"]],
      body: [
        ["#3", "5x5", "0.860", "0.83"],
        ["#2", "5.5x5", "M123", "HRS"],
        ["#1", "5.5x5", "M123", "HRS"],
      ],
      theme: "grid",
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Konversi PDF ke Blob URL
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard - Afternoon Report</h1>

      {/* Form untuk input data */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.keys(reportData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium">{key.toUpperCase()}</label>
            <input
              type="text"
              name={key}
              value={reportData[key]}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        ))}
      </div>

      {/* Tombol Generate PDF */}
      <button
        onClick={generatePDF}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
      >
        Generate PDF
      </button>

      {/* Tombol Download PDF */}
      {pdfUrl && (
        <>
          <a
            href={pdfUrl}
            download="Afternoon_Report.pdf"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download PDF
          </a>

          {/* PDF Viewer */}
          <div className="mt-4 border border-gray-300">
            <iframe src={pdfUrl} width="100%" height="600px" />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;