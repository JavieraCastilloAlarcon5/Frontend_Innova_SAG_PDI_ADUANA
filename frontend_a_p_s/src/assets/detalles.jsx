import React from 'react';
import './detalles.css'

const SubmissionDetails = ({ submission }) => {
    if (!submission) return null;

    const travelTypeDisplay = submission.travel_type === 'vehículo particular' ? 'Vehículo Particular' : 
                              submission.travel_type === 'camión de carga' ? 'Camión de Carga' : 
                              submission.travel_type;

    return (
        <div className="details-card"> 
            <h2>Detalles del Envío #{submission.id}</h2>
            
            <p><strong>Nombre:</strong> {submission.name}</p>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Tipo de Viaje:</strong> {travelTypeDisplay}</p>
            <p><strong>Fecha de Envío:</strong> {new Date(submission.travel_date).toLocaleString()}</p>
            

            {submission.travel_type === 'vehículo particular' && (
                <div className="details-section"> 
                    <h3>Documentación para Vehículos Particulares</h3>
                    <p>
                        <strong>¿Viajan menores de edad?:</strong> 
                        <span> Sí</span> 
                    </p>
                    <p><strong>Cantidad de menores:</strong> 2</p>

                </div>
            )}


            {submission.travel_type === 'camión de carga' && (
                <div className="details-section"> 
                    <h3>Documentación para Camiones de Carga</h3>
                    <p><strong>Tipo de Carga Especial:</strong> Animales Vivos</p>
                </div>
            )}
             {!submission.informacionAdicional && (
                 <p className="text-sm text-gray-500 mt-4">Nota: Los detalles específicos del formulario (menores, carga) no están disponibles en los datos del `seeder` actual.</p>
             )}
        </div>
    );
}

export default SubmissionDetails;