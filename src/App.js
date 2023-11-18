import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';

const App = () => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [newPdf, setNewPdf] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);

  const handlePDFUpload = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'application/pdf') {
        try {
          const loadedPdfData = await file.arrayBuffer();
          const loadedPdfDoc = await PDFDocument.load(loadedPdfData);
          setPdfDoc(loadedPdfDoc);
          setViewPdf(URL.createObjectURL(new Blob([loadedPdfData], { type: 'application/pdf' }))); // Set the uploaded PDF for viewing
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      } else {
        alert('Please upload a valid PDF file.');
      }
    }
  };
  

  const handlePageSelection = (pageNumber) => {
    const updatedSelectedPages = selectedPages.includes(pageNumber)
      ? selectedPages.filter((page) => page !== pageNumber)
      : [...selectedPages, pageNumber];
    setSelectedPages(updatedSelectedPages);
  };

  const handleGenerateNewPDF = async () => {
    if (pdfDoc && selectedPages.length > 0) {
      const newPdfDoc = await PDFDocument.create();
      for (const pageNumber of selectedPages) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
        newPdfDoc.addPage(copiedPage);
      }

      const newPdfData = await newPdfDoc.save();
      setNewPdf(newPdfData);
    }
  };

  useEffect(() => {
    setNewPdf(null); // Reset newPdf state when a new PDF is uploaded
  }, [pdfDoc]);

  return (
    <div className="App">
      <h1>PDF Extraction Tool</h1>
      <Dropzone onDrop={handlePDFUpload}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop a PDF file here</p>
          </div>
        )}
      </Dropzone>
      {viewPdf && (
        <div className="pdf-viewer">
          <embed src={viewPdf} type="application/pdf" width="100%" height="600px" />
        </div>
      )}

      {pdfDoc && (
        <div className="pdf-pages">
          {Array.from(Array(pdfDoc.getPageCount()).keys()).map((pageIndex) => (
            <div key={pageIndex}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPages.includes(pageIndex + 1)}
                  onChange={() => handlePageSelection(pageIndex + 1)}
                />
                Page {pageIndex + 1}
              </label>
            </div>
          ))}
        </div>
      )}

      <button onClick={handleGenerateNewPDF} disabled={!pdfDoc || selectedPages.length === 0}>
        Generate New PDF
      </button>

      {newPdf && (
         <a
         href={URL.createObjectURL(new Blob([newPdf], { type: 'application/pdf' }))}
         download="extracted-pages.pdf">
          Download New PDF
        </a>
      )}
    </div>
  );
};

export default App;

