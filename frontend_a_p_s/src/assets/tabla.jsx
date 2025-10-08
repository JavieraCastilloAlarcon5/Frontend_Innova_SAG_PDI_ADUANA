import React from 'react';
import './filtro.css'

function SubmissionTable({ submissions, onSelectSubmission }) {
  return (
    <div className="table-container">
      <h2>Envíos de Documentación</h2>
      <table className="submission-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Tipo de Viaje</th>
            <th>Fecha de Envío</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length > 0 ? (
            submissions.map(submission => (
              <tr key={submission.id} onClick={() => onSelectSubmission(submission)}>
                <td>{submission.id}</td>
                <td>{submission.nombreCompleto}</td>
                <td>{submission.email}</td>
                <td>{submission.tipoDeViaje}</td>
                <td>{new Date(submission.fechaDeEnvio).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No se encontraron resultados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionTable;