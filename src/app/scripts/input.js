document.getElementById('dataInputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        reportNo: document.getElementById('reportNo').value,
        companyWell: document.getElementById('companyWell').value,
        // date: document.getElementById('date').value,
        // wellType: document.getElementById('wellType').value,
        // depthMD: document.getElementById('depthMD').value,
        // depthTVD: document.getElementById('depthTVD').value,
        // coMan: document.getElementById('coMan').value,
        // engineer: document.getElementById('engineer').value
    };

    localStorage.setItem('reportData', JSON.stringify(formData));
    window.location.href = 'index.html';
});