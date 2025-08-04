import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  return (
    <div className=\"min-h-screen bg-gray-100\">
      <h1 className=\"text-center text-3xl font-bold text-[#003366] py-10\">Formulario ASTAP</h1>
      {/* Aquí va el formulario completo con todas las secciones */}
    </div>
  );
}
