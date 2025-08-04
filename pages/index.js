import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const [cliente, setCliente] = useState("");
  const [codigoInterno, setCodigoInterno] = useState("");
  const [fechaServicio, setFechaServicio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");
  const [personalTecnico, setPersonalTecnico] = useState("");
  const [tecnicoApoyo, setTecnicoApoyo] = useState("");
  const [listaMateriales, setListaMateriales] = useState([{ cantidad: '', material: '', codigo: '' }]);
  const [pruebasAntes, setPruebasAntes] = useState(5);
  const [pruebasDespues, setPruebasDespues] = useState(5);
  const [actividades, setActividades] = useState([{ descripcion: '', evidencia: '' }]);
  const [responsableTecnico, setResponsableTecnico] = useState({ nombre: '', cargo: '', telefono: '' });
  const [responsableCliente, setResponsableCliente] = useState({ nombre: '', cargo: '', telefono: '' });
  const firmaAstapRef = useRef(null);
  const firmaClienteRef = useRef(null);
  const formRef = useRef(null);

  const renderRows = (count) => Array.from({ length: count }, (_, i) => (
    <tr key={i}>
      <td className="border p-2 text-center">{i + 1}</td>
      <td className="border p-2"><input className="w-full border rounded p-1" /></td>
      <td className="border p-2 text-center"><input type="checkbox" /></td>
      <td className="border p-2 text-center"><input type="checkbox" /></td>
      <td className="border p-2"><input className="w-full border rounded p-1" /></td>
    </tr>
  ));

  const renderMateriales = () => listaMateriales.map((item, i) => (
    <tr key={i}>
      <td className="border p-2 text-center">{i + 1}</td>
      <td className="border p-2"><input value={item.cantidad} onChange={(e) => { const copy = [...listaMateriales]; copy[i].cantidad = e.target.value; setListaMateriales(copy); }} className="w-full border rounded p-1" /></td>
      <td className="border p-2"><input value={item.material} onChange={(e) => { const copy = [...listaMateriales]; copy[i].material = e.target.value; setListaMateriales(copy); }} className="w-full border rounded p-1" /></td>
      <td className="border p-2"><input value={item.codigo} onChange={(e) => { const copy = [...listaMateriales]; copy[i].codigo = e.target.value; setListaMateriales(copy); }} className="w-full border rounded p-1" /></td>
    </tr>
  ));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl text-center font-bold text-[#003366] py-6">Formulario ASTAP - Informe de Servicio</h1>
      <div ref={formRef} className="bg-white shadow rounded p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold">Datos Generales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input value={cliente} onChange={(e) => setCliente(e.target.value)} className="border p-2 rounded" placeholder="Cliente" />
            <input value={codigoInterno} onChange={(e) => setCodigoInterno(e.target.value)} className="border p-2 rounded" placeholder="Código Interno" />
            <input type="date" value={fechaServicio} onChange={(e) => setFechaServicio(e.target.value)} className="border p-2 rounded" />
            <input value={direccion} onChange={(e) => setDireccion(e.target.value)} className="border p-2 rounded" placeholder="Dirección" />
            <input value={referencia} onChange={(e) => setReferencia(e.target.value)} className="border p-2 rounded" placeholder="Referencia" />
            <input value={personalTecnico} onChange={(e) => setPersonalTecnico(e.target.value)} className="border p-2 rounded" placeholder="Personal Técnico" />
            <input value={tecnicoApoyo} onChange={(e) => setTecnicoApoyo(e.target.value)} className="border p-2 rounded" placeholder="Técnico de Apoyo" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Pruebas Antes del Servicio</h2>
          <table className="w-full text-sm border"><thead className="bg-gray-200"><tr><th>Ítem</th><th>Detalle</th><th>Sí</th><th>No</th><th>Observación</th></tr></thead><tbody>{renderRows(pruebasAntes)}</tbody></table>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Actividades / Novedades</h2>
          {actividades.map((item, i) => (
            <div key={i} className="border p-3 rounded mb-3">
              <input value={item.descripcion} onChange={(e) => { const copy = [...actividades]; copy[i].descripcion = e.target.value; setActividades(copy); }} className="w-full border p-2 rounded mb-2" placeholder="Descripción" />
              <input value={item.evidencia} onChange={(e) => { const copy = [...actividades]; copy[i].evidencia = e.target.value; setActividades(copy); }} className="w-full border p-2 rounded" placeholder="Evidencia" />
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold">Pruebas Después del Servicio</h2>
          <table className="w-full text-sm border"><thead className="bg-gray-200"><tr><th>Ítem</th><th>Detalle</th><th>Sí</th><th>No</th><th>Observación</th></tr></thead><tbody>{renderRows(pruebasDespues)}</tbody></table>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Materiales Utilizados</h2>
          <table className="w-full text-sm border"><thead className="bg-gray-200"><tr><th>Ítem</th><th>Cantidad</th><th>Material</th><th>Código</th></tr></thead><tbody>{renderMateriales()}</tbody></table>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Responsables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input value={responsableTecnico.nombre} onChange={(e) => setResponsableTecnico({ ...responsableTecnico, nombre: e.target.value })} className="border p-2 rounded w-full" placeholder="Nombre Técnico" />
              <input value={responsableTecnico.cargo} onChange={(e) => setResponsableTecnico({ ...responsableTecnico, cargo: e.target.value })} className="border p-2 rounded w-full" placeholder="Cargo" />
              <input value={responsableTecnico.telefono} onChange={(e) => setResponsableTecnico({ ...responsableTecnico, telefono: e.target.value })} className="border p-2 rounded w-full" placeholder="Teléfono" />
            </div>
            <div>
              <input value={responsableCliente.nombre} onChange={(e) => setResponsableCliente({ ...responsableCliente, nombre: e.target.value })} className="border p-2 rounded w-full" placeholder="Nombre Cliente" />
              <input value={responsableCliente.cargo} onChange={(e) => setResponsableCliente({ ...responsableCliente, cargo: e.target.value })} className="border p-2 rounded w-full" placeholder="Cargo" />
              <input value={responsableCliente.telefono} onChange={(e) => setResponsableCliente({ ...responsableCliente, telefono: e.target.value })} className="border p-2 rounded w-full" placeholder="Teléfono" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Firmas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p>Elaborado por ASTAP</p>
              <SignatureCanvas ref={firmaAstapRef} penColor="black" canvasProps={{ className: "border w-full h-24 bg-white rounded" }} />
            </div>
            <div>
              <p>Aprobado por Cliente</p>
              <SignatureCanvas ref={firmaClienteRef} penColor="black" canvasProps={{ className: "border w-full h-24 bg-white rounded" }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
