import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const [listaMateriales, setListaMateriales] = useState([{ cantidad: '', material: '', codigo: '' }]);
  const [responsableTecnico, setResponsableTecnico] = useState({ nombre: '', cargo: '', telefono: '' });
  const [responsableCliente, setResponsableCliente] = useState({ nombre: '', cargo: '', telefono: '' });
  const [cliente, setCliente] = useState("");
  const [codigoInterno, setCodigoInterno] = useState("");
  const [fechaServicio, setFechaServicio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");
  const [personalTecnico, setPersonalTecnico] = useState("");
  const [tecnicoApoyo, setTecnicoApoyo] = useState("");
  const firmaAstapRef = useRef(null);
  const firmaClienteRef = useRef(null);
  const formRef = useRef(null);

  const [pruebasAntes, setPruebasAntes] = useState(5);
  const [pruebasDespues, setPruebasDespues] = useState(5);
  const [actividades, setActividades] = useState([{ descripcion: '', evidencia: '' }]);
  const [pdfURL, setPdfURL] = useState(null);
  const [pdfList, setPdfList] = useState([]);
  const [search, setSearch] = useState("");
  const [correoSupervisor, setCorreoSupervisor] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("informesPDF") || "[]");
    setPdfList(stored);
  }, []);

  const renderRows = (count) => Array.from({ length: count }, (_, i) => (
    <tr key={i}>
      <td className="border border-gray-300 p-2 text-center bg-white text-sm">{i + 1}</td>
      <td className="border border-gray-300 p-2"><input className="w-full p-1 text-sm border rounded" /></td>
      <td className="border border-gray-300 p-2 text-center"><input type="checkbox" /></td>
      <td className="border border-gray-300 p-2 text-center"><input type="checkbox" /></td>
      <td className="border border-gray-300 p-2"><input className="w-full p-1 text-sm border rounded" /></td>
    </tr>
  ));

  const renderMateriales = () => listaMateriales.map((item, i) => (
    <tr key={i}>
      <td className="border border-gray-300 p-2 text-center bg-white text-sm">{i + 1}</td>
      <td className="border border-gray-300 p-2"><input className="w-full p-1 text-sm border rounded" value={item.cantidad} onChange={(e) => { const copy = [...listaMateriales]; copy[i].cantidad = e.target.value; setListaMateriales(copy); }} /></td>
      <td className="border border-gray-300 p-2"><input className="w-full p-1 text-sm border rounded" value={item.material} onChange={(e) => { const copy = [...listaMateriales]; copy[i].material = e.target.value; setListaMateriales(copy); }} /></td>
      <td className="border border-gray-300 p-2"><input className="w-full p-1 text-sm border rounded" value={item.codigo} onChange={(e) => { const copy = [...listaMateriales]; copy[i].codigo = e.target.value; setListaMateriales(copy); }} /></td>
    </tr>
  ));

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-[#003366] text-white shadow fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">ASTAP - Informes de Servicio</h1>
        <div className="flex flex-wrap gap-2">
          <button className="bg-[#003366] hover:bg-[#002855] text-white px-3 py-1 rounded shadow">Generar PDF</button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow">Limpiar</button>
        </div>
        <input type="email" placeholder="Correo del supervisor (opcional)" className="text-black px-3 py-1 rounded shadow border" value={correoSupervisor} onChange={(e) => setCorreoSupervisor(e.target.value)} />
      </header>

      <main className="pt-28 px-6 max-w-6xl mx-auto space-y-6">
        <div ref={formRef} className="space-y-6 bg-white p-6 rounded shadow">
          <h2 className="text-3xl font-bold text-center text-[#003366]">INFORME DE TRABAJO Ó SERVICIO</h2>

          {/* Datos Generales */}
          <section>
            <h3 className="text-xl font-bold text-[#003366] border-b pb-1 mb-2">Datos Generales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input value={cliente} onChange={(e) => setCliente(e.target.value)} className="border p-2 rounded" placeholder="Cliente" />
              <input value={codigoInterno} onChange={(e) => setCodigoInterno(e.target.value)} className="border p-2 rounded" placeholder="Código Interno" />
              <input value={fechaServicio} onChange={(e) => setFechaServicio(e.target.value)} type="date" className="border p-2 rounded" />
              <input value={direccion} onChange={(e) => setDireccion(e.target.value)} className="border p-2 rounded" placeholder="Dirección" />
              <input value={referencia} onChange={(e) => setReferencia(e.target.value)} className="border p-2 rounded" placeholder="Referencia" />
              <input value={personalTecnico} onChange={(e) => setPersonalTecnico(e.target.value)} className="border p-2 rounded" placeholder="Personal Técnico" />
              <input value={tecnicoApoyo} onChange={(e) => setTecnicoApoyo(e.target.value)} className="border p-2 rounded" placeholder="Técnico de Apoyo" />
            </div>
          </section>

          {/* Pruebas Antes */}
          <section>
            <h3 className="text-xl font-bold text-[#003366] border-b pb-1 mb-2">Pruebas Antes del Servicio</h3>
            <table className="w-full text-sm border mt-2">
              <thead className="bg-gray-200">
                <tr><th>Ítem</th><th>Detalle</th><th>Sí</th><th>No</th><th>Observación</th></tr>
              </thead>
              <tbody>{renderRows(pruebasAntes)}</tbody>
            </table>
          </section>

          {/* Actividades */}
          <section>
            <h3 className="text-xl font-bold text-[#003366] border-b pb-1 mb-2">Actividades / Novedades</h3>
            {actividades.map((item, i) => (
              <div key={i} className="border p-3 rounded mb-3">
                <input value={item.descripcion} onChange={(e) => { const copy = [...actividades]; copy[i].descripcion = e.target.value; setActividades(copy); }} className="w-full border p-2 mt-1 mb-2 rounded" placeholder="Descripción" />
                <input value={item.evidencia} onChange={(e) => { const copy = [...actividades]; copy[i].evidencia = e.target.value; setActividades(copy); }} className="w-full border p-2 rounded" placeholder="Imagen o evidencia (URL o archivo)" />
              </div>
            ))}
          </section>

          {/* Pruebas Después */}
          <section>
            <h3 className="text-xl font-bold text-[#003366] border-b pb-1 mb-2">Pruebas Después del Servicio</h3>
            <table className="w-full text-sm border mt-2">
              <thead className="bg-gray-200">
                <tr><th>Ítem</th><th>Detalle</th><th>Sí</th><th>No</th><th>Observación</th></tr>
              </thead>
              <tbody>{renderRows(pruebasDespues)}</tbody>
            </table>
          </section>

          {/* Materiales */}
          <section>
            <h3 className="text-xl font-bold text-[#003366] border-b pb-1 mb-2">Materiales Utilizados</h3>
            <table className="w-full text-sm border mt-2">
              <thead className="bg-gray-200">
                <tr><th>Ítem</th><th>Cantidad</th><th>Material</th><th>Código</th></tr>
              </thead>
              <tbody>{renderMateriales()}</tbody>
            </table>
          </section>

          {/* Responsables */}
          <section>
            <h3 className="text-xl font-bold text-[#003366] border-b pb-1 mb-2">Responsables</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input value={responsableTecnico.nombre} onChange={(e) => setResponsableTecnico({ ...responsableTecnico, nombre: e.target.value })} className="border p-2 rounded w-full" placeholder="Nombre del técnico ASTAP" />
                <input value={responsableTecnico.cargo} onChange={(e) => setResponsableTecnico({ ...responsableTecnico, cargo: e.target.value })} className="border p-2 rounded w-full" placeholder="Cargo" />
                <input value={responsableTecnico.telefono} onChange={(e) => setResponsableTecnico({ ...responsableTecnico, telefono: e.target.value })} className="border p-2 rounded w-full" placeholder="Teléfono" />
              </div>
              <div>
                <input value={responsableCliente.nombre} onChange={(e) => setResponsableCliente({ ...responsableCliente, nombre: e.target.value })} className="border p-2 rounded w-full" placeholder="Nombre del cliente" />
                <input value={responsableCliente.cargo} onChange={(e) => setResponsableCliente({ ...responsableCliente, cargo: e.target.value })} className="border p-2 rounded w-full" placeholder="Cargo" />
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
      </main>
    </div>
  );
}
