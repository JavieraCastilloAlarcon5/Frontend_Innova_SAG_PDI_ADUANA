import React, { useEffect, useState, useContext } from 'react';
import './detalles.css';
import { AuthContext } from '../auth/AuthContext';

const ShowRecords = ({ records }) => {
  const { data } = useContext(AuthContext) || {};
  if (!records || records.length === 0) return null;

  if (data?.role === 'PDI') {
    return (
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <strong>Crimen:</strong>{' '}
            {record.Crime ? record.Crime.name : 'Desconocido'} <br />
            <strong>Fecha:</strong>{' '}
            {record.date ? new Date(record.date).toLocaleDateString('es-ES') : 'Sin fecha'}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul>
      {records.map((record, index) => (
        <li key={index}>
          {record.Crime ? record.Crime.warning : 'Desconocido'} <br />
        </li>
      ))}
    </ul>
  );
};

const SubmissionDetails = ({ submission }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data } = useContext(AuthContext) || {};

  useEffect(() => {
    if (!submission) return;

    const fetchRecords = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("🟣 Usuario actual:", data);
            const response = await fetch(`http://localhost:3000/persons/record/${submission.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Role': data.role === 'Aduana' ? 'Aduanas' : data.role  
                }
            });

            const json = await response.json();
            console.log("📦 JSON recibido:", json);

            if (!response.ok) {
                setError(json.error || 'No se pudieron obtener los antecedentes');
                setRecords([]);
            } else {
                // Caso PDI: recibe Records completos
                if (json.Records) {
                    setRecords(json.Records);
                } else if (json.responseType === 'alerts') {
                    // Caso Aduana o SAG: solo warnings
                    const warningRecords = json.warnings.map(warning => ({ Crime: { warning } }));
                    setRecords(warningRecords);
                } else {
                    setRecords([]);
                }
            }
        } catch (err) {
            console.error(err);
            setError('Error de conexión con el servidor');
        }
        setLoading(false);
    };

    fetchRecords();
  }, [submission, data]);

  if (!submission) return null;

  return (
    <div className="details-card">
      <h2>Detalles del vehículo #{submission.id}</h2>

      <p><strong>Nombre:</strong> {submission.nombreCompleto}</p>
      <p><strong>Email:</strong> {submission.email}</p>
      <p><strong>Tipo de Viaje:</strong> {submission.tipoDeViaje}</p>
      <p>
        <strong>Fecha:</strong>{' '}
        {submission.fecha
          ? new Date(submission.fecha).toLocaleDateString('es-ES')
          : 'No disponible'}
      </p>

      <div className="details-section">
        <h3>Antecedentes Penales</h3>
        {loading ? (
          <p>Cargando antecedentes...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : records.length > 0 ? (
          <ShowRecords records={records} />
        ) : (
          <p>Sin antecedentes registrados.</p>
        )}
      </div>
            {submission.tipoDeViaje === 'vehículo particular' && (
        <div className="details-section">
          <h3>Documentación para Vehículos Particulares</h3>
          <p><strong>¿Viajan menores de edad?:</strong> Sí</p>
          <p><strong>Cantidad de menores:</strong> 2</p>
        </div>
      )}

      {submission.tipoDeViaje === 'camión de carga' && (
        <div className="details-section">
          <h3>Documentación para Camiones de Carga</h3>
          <p><strong>Tipo de Carga Especial:</strong> Animales Vivos</p>
        </div>
      )}
    </div>
  );
};

export default SubmissionDetails;