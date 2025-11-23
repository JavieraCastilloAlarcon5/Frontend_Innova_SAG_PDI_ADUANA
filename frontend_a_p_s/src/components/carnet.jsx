import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './carnet.css'; 

const CarnetDetalle = () => {
  const { type, id } = useParams(); 
  const navigate = useNavigate();
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {

    const datosDePrueba = {
      rut: "12.749.625-K",
      fecha_nacimiento: "21-02-1982",
      fecha_emision: "01-09-2013",
      fecha_vencimiento: "10-08-2023",
      nacionalidad: "CHILENA",
      nombre: "MARCELA CAROLINA FREDEZ VIDAL"
    };

    setDocumentData(datosDePrueba);
  }, [id]);

  if (!documentData) return <div>Cargando documento...</div>;

  return (
    <div className="doc-container">
      <button className="btn-volver" onClick={() => navigate(-1)}>
        ← Volver atrás
      </button>

      <div className="carnet-card">
        <h2 className="carnet-title">
            {type === 'carnet' ? 'Cédula de Identidad' : 'Documento'}
        </h2>
        
        <div className="carnet-grid">
          <div className="dato-grupo full-width">
            <label>Nombre Completo</label>
            <span>{documentData.nombre}</span>
          </div>

          <div className="dato-grupo">
            <label>RUT</label>
            <span className="dato-destacado">{documentData.rut}</span>
          </div>

          <div className="dato-grupo">
            <label>Nacionalidad</label>
            <span>{documentData.nacionalidad}</span>
          </div>

          <div className="dato-grupo">
            <label>Fecha Nacimiento</label>
            <span>{documentData.fecha_nacimiento}</span>
          </div>

          <div className="dato-grupo">
            <label>Fecha Emisión</label>
            <span>{documentData.fecha_emision}</span>
          </div>

          <div className="dato-grupo">
            <label>Fecha Vencimiento</label>
            <span className="dato-alerta">{documentData.fecha_vencimiento}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarnetDetalle;