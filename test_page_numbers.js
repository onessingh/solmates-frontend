const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'tools', 'pdf-tools')));

const server = app.listen(3000, async () => {
    console.log('Server running on http://localhost:3000');
    
    // Create a dummy PDF
    const dummyPdfPath = path.join(__dirname, 'dummy.pdf');
    if (!fs.existsSync(dummyPdfPath)) {
        fs.writeFileSync(dummyPdfPath, '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000219 00000 n \n0000000307 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n402\n%%EOF');
    }

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.goto('http://localhost:3000/page-numbers.html', { waitUntil: 'networkidle2' });
    
    console.log('Page loaded. Uploading file...');
    const fileInput = await page.$('#fileInput');
    await fileInput.uploadFile(dummyPdfPath);
    
    await new Promise(r => setTimeout(r, 2000));
    console.log("File uploaded. Quitting...");
    
    await browser.close();
    server.close();
    process.exit(0);
});
