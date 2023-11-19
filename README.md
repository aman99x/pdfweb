# PDF Extraction Tool

This web application allows users to extract specific pages from a PDF file and generate a new PDF containing only the selected pages.

## Features

## Upload PDF: 
   Drag and drop a PDF file into the designated area to load the document.
## Page Selection: 
   View the uploaded PDF's pages and select the ones you want to extract.
## Generate New PDF: 
   Create a new PDF file containing the selected pages.
## Download: 
   Download the newly generated PDF file.

### How to Use

## Upload PDF

Drag and drop a PDF file into the specified area, or click to select a file.
Supported file format: PDF.

### Select Pages

Once the PDF is uploaded, checkboxes representing each page will appear.
Check the pages you want to extract from the uploaded PDF.

### Generate New PDF

Click the "Generate New PDF" button to create a new PDF containing the selected pages.
The new PDF will be generated based on your selected pages.

### Download

Once the new PDF is generated, a "Download New PDF" link will appear.
Click the link to download the extracted pages as a new PDF file.

### Technologies Used

React: JavaScript library for building user interfaces.
react-dropzone: Library for enabling file uploads via drag and drop.
pdf-lib: Library for working with PDF files in JavaScript.

### Setup

Clone this repository.
Install dependencies using npm install.
Start the development server with npm start

### Important Notes

Ensure the uploaded file is in PDF format for proper functionality.
The extracted pages will be saved as a new PDF file for download.

### Credits
This project utilizes the pdf-lib library for PDF manipulation.

