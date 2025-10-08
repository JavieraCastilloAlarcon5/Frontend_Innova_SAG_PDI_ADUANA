import React from 'react';
import './detalles.css'

function SubmissionDetails({ submission }) {
  if (!submission) {
    return null; 
  }

  return (
    <div className="details-card">
      <h2>Detalles del Envío #{submission.id}</h2>
      <p><strong>Nombre:</strong> {submission.nombreCompleto}</p>
      <p><strong>Email:</strong> {submission.email}</p>
      <p><strong>Tipo de Viaje:</strong> {submission.tipoDeViaje}</p>
      <p><strong>Fecha de Envío:</strong> {new Date(submission.fechaDeEnvio).toLocaleString()}</p>
      

      {submission.tipoDeViaje === 'Vehículo Particular' && (
        <div className="details-section">
          <h3>Documentación para Vehículos Particulares</h3>
          <p><strong>¿Viajan menores de edad?:</strong> {submission.informacionAdicional.viajanMenoresDeEdad ? 'Sí' : 'No'}</p>
          {submission.informacionAdicional.viajanMenoresDeEdad && (
            <p><strong>Cantidad de menores:</strong> {submission.informacionAdicional.cantidadDeMenores}</p>
          )}

        </div>
      )}


      {submission.tipoDeViaje === 'Camión de Carga' && (
        <div className="details-section">
          <h3>Documentación para Camiones de Carga</h3>
          <p><strong>Tipo de Carga Especial:</strong> {submission.informacionAdicional.tipoDeCargaEspecial}</p>
        </div>
      )}
    </div>
  );
}

export default SubmissionDetails;