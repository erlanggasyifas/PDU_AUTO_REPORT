document.getElementById('dataInputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        bitNo: document.getElementById('bitNoForm').value,
        bitTc: document.getElementById('bitTcForm').value,
        sleeveStab: document.getElementById('sleeveStabForm').value,
        typeBit: document.getElementById('typeBitForm').value,
        floatSub: document.getElementById('floatSubForm').value,
        snBit: document.getElementById('snBitForm').value,
        stringStabilizer: document.getElementById('stringStabilizerForm').value,
        iadc: document.getElementById('iadcForm').value,
        nmdc: document.getElementById('nmdcForm').value,
        bit17hrs: document.getElementById('bit17hrsForm').value,
    };

    localStorage.setItem('reportData', JSON.stringify(formData));
    window.location.href = 'index.html';
});