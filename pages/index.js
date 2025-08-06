import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Home() {
  const [responsableTecnico, setResponsableTecnico] = useState({ nombre: "", cargo: "", telefono: "" });
  const [responsableCliente, setResponsableCliente] = useState({ nombre: "", cargo: "", telefono: "" });
  const firmaAstapRef = useRef();
  const firmaClienteRef = useRef();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-[#003366] mb-6">ASTAP - Informe de Servicio</h1>
      {/* Secciones: descripción, responsables, firmas... */}
      {/* Esta parte se llenará por completo como discutido */}
    </div>
  );
}
