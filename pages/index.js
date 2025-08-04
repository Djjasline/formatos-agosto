import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  // Estados y referencias del formulario completo
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

  const generarPDF = async () => {
    const input = formRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor('#666666');
      pdf.text(`Página ${i} de ${pageCount}`, pdfWidth - 80, pdf.internal.pageSize.getHeight() - 20);
      pdf.setFontSize(12);
      pdf.setTextColor('#003366');
      pdf.text("ASTAP - Informe de Servicio", 40, 30);
    }
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    setPdfURL(url);
    const nombreArchivo = `informe_${Date.now()}.pdf`;
    const nuevo = { nombre: nombreArchivo, url };
    const actualizados = [...pdfList, nuevo];
    setPdfList(actualizados);
    localStorage.setItem("informesPDF", JSON.stringify(actualizados));
    pdf.save(nombreArchivo);
  };

  const limpiarHistorial = () => {
    localStorage.removeItem("informesPDF");
    setPdfList([]);
  };

  const pdfFiltrados = pdfList.filter(pdf => pdf.nombre.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Aquí se coloca TODO el contenido del formulario completo */}
    </div>
  );
}
