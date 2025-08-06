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

      {/* Descripción del Equipo */}
      <section>
        <h3 className="text-xl font-bold text-[#003366] border-b pb-1 mb-2">Descripción del Equipo o Elemento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <input className="border p-2 rounded w-full" placeholder="Tipo de Equipo" />
            <input className="border p-2 rounded w-full" placeholder="Marca" />
            <input className="border p-2 rounded w-full" placeholder="Modelo" />
            <input className="border p-2 rounded w-full" placeholder="N° Serie" />
            <input className="border p-2 rounded w-full" placeholder="Año / Modelo" />
            <input className="border p-2 rounded w-full" placeholder="VIN / Chasis" />
            <input className="border p-2 rounded w-full" placeholder="Placa N°" />
            <input className="border p-2 rounded w-full" placeholder="Horas de Trabajo" />
            <input className="border p-2 rounded w-full" placeholder="Recorrido" />
          </div>
          <div className="flex items-center justify-center border bg-white rounded min-h-[200px]">
            <span className="text-gray-500">Imagen panorámica del equipo</span>
          </div>
        </div>
      </section>

      {/* Responsables */}
      <section>
        <h3 className="text-xl font-bold text-[#003366] border-b pb-1 mb-2">Responsables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-1">
            <p className="font-semibold">Nombre:</p>
            <input value={responsableTecnico.nombre} onChange={(e) => setResponsableTecnico({ ...responsableTecnico, nombre: e.target.value })} className="border p-2 rounded w-full" placeholder="Nombre del técnico ASTAP" />
            <p className="font-semibold">Cargo:</p>
            <input value={responsableTecnico.cargo} onChange={(e) => setResponsableTecnico({ ...responsableTecnico, cargo: e.target.value })} className="border p-2 rounded w-full" placeholder="Cargo" />
            <p className="font-semibold">Teléfono:</p>
            <input value={responsableTecnico.telefono} onChange={(e) => setResponsableTecnico({ ...responsableTecnico, telefono: e.target.value })} className="border p-2 rounded w-full" placeholder="Teléfono" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Nombre:</p>
            <input value={responsableCliente.nombre} onChange={(e) => setResponsableCliente({ ...responsableCliente, nombre: e.target.value })} className="border p-2 rounded w-full" placeholder="Nombre del cliente" />
            <p className="font-semibold">Cargo:</p>
            <input value={responsableCliente.cargo} onChange={(e) => setResponsableCliente({ ...responsableCliente, cargo: e.target.value })} className="border p-2 rounded w-full" placeholder="Cargo" />
            <p className="font-semibold">Teléfono:</p>
            <input value={responsableCliente.telefono} onChange={(e) => setResponsableCliente({ ...responsableCliente, telefono: e.target.value })} className="border p-2 rounded w-full" placeholder="Teléfono" />
          </div>
        </div>
      </section>

      {/* Firmas */}
      <section>
        <h3 className="text-xl font-bold text-[#003366] border-b pb-1 mb-2">Firmas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold">Elaborado por ASTAP</p>
            <SignatureCanvas ref={firmaAstapRef} penColor="black" canvasProps={{ className: "border w-full h-24 bg-white rounded" }} />
          </div>
          <div>
            <p className="font-semibold">Aprobado por Cliente</p>
            <SignatureCanvas ref={firmaClienteRef} penColor="black" canvasProps={{ className: "border w-full h-24 bg-white rounded" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
