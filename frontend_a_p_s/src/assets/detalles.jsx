import React from 'react';
import './detalles.css'

const SubmissionDetails = ({ submission }) => {
    if (!submission) return null;

    const travelTypeDisplay = submission.tipoDeViaje === 'vehículo particular'
        ? 'Vehículo Particular'
        : submission.tipoDeViaje === 'camión de carga'
        ? 'Camión de Carga'
        : submission.tipoDeViaje;

    return (
        <div className="details-card"> 
            <h2>Detalles del Envío #{submission.id}</h2>
            
            <p><strong>Nombre:</strong> {submission.nombreCompleto}</p>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Tipo de Viaje:</strong> {travelTypeDisplay}</p>
            <p><strong>Fecha de Envío:</strong> 
                {submission.fechaDeEnvio 
                    ? new Date(submission.fechaDeEnvio).toLocaleDateString('es-ES')
                    : 'No disponible'}
            </p>

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
