import React, { useEffect, useState } from 'react';
import './detalles.css';

const SubmissionDetails = ({ submission }) => {
    const [records, setRecords] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!submission) return;

        const fetchRecords = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3001/persons/record/${submission.id}`);
                const data = await response.json();
                if (response.ok) {
                    setRecords(data.Record || data.Records || []);
                } else {
                    setError(data.error || 'No se pudieron obtener los antecedentes');
                }
            } catch (err) {
                setError('Error de conexión con el servidor');
            }
            setLoading(false);
        };

        fetchRecords();
    }, [submission]);

    if (!submission) return null;

    const travelTypeDisplay =
        submission.tipoDeViaje === 'vehículo particular'
            ? 'Vehículo Particular'
            : submission.tipoDeViaje === 'camión de carga'
            ? 'Camión de Carga'
            : submission.tipoDeViaje;

    return (
        <div className="details-card">
            <h2>Detalles del vehículo #{submission.id}</h2>

            <p><strong>Nombre:</strong> {submission.nombreCompleto}</p>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Tipo de Viaje:</strong> {travelTypeDisplay}</p>
            <p>
                <strong>Fecha:</strong>{' '}
                {submission.fechaDeEnvio
                    ? new Date(submission.fechaDeEnvio).toLocaleDateString('es-ES')
                    : 'No disponible'}
            </p>

            <div className="details-section">
                <h3>Antecedentes Penales</h3>
                {loading ? (
                    <p>Cargando antecedentes...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : records.length > 0 ? (
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

            {!submission.informacionAdicional && (
                <p className="text-sm text-gray-500 mt-4">
                    Nota: Los detalles específicos del formulario (menores, carga) no están disponibles en los datos del `seeder` actual.
                </p>
            )}
        </div>
    );
};

export default SubmissionDetails;
