import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './context/theme-context';
import Header from './components/layout/Header';
import PdfInterface from './components/pdfTool/PdfInterface';
import PdfSplit from './components/pdfTool/pdfSplit/PdfSplit';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeContextProvider>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.default', color: 'text.primary' }}>
          <Header />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/pdf-tool" element={<PdfInterface />} />
            <Route path="/pdf-tool/split" element={<PdfSplit />} />
          </Routes>
        </Box>
      </ThemeContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
