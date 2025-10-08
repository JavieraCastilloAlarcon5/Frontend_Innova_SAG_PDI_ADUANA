import React, { useState, useEffect } from 'react';
import SearchAndFilter from './assets/buscador';
import SubmissionTable from './assets/tabla';
import SubmissionDetails from './assets/detalles';
import './App.css';

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [travelTypeFilter, setTravelTypeFilter] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Simulación de una llamada a la API
  useEffect(() => {
    // Aquí harías la llamada real a tu API.
    // fetch('URL_DE_TU_API/submissions')
    //   .then(response => response.json())
    //   .then(data => setSubmissions(data))
    //   .catch(error => console.error("Error fetching data:", error));

    // Datos de ejemplo para que el código funcione sin API
    const dummyData = [
      { id: 1, nombreCompleto: 'Juan Pérez', email: 'juan.perez@example.com', tipoDeViaje: 'Camión de Carga', fechaDeEnvio: '2025-10-01T10:00:00Z', informacionAdicional: { tipoDeCargaEspecial: 'Animales Vivos' } },
      { id: 2, nombreCompleto: 'María García', email: 'maria.garcia@example.com', tipoDeViaje: 'Vehículo Particular', fechaDeEnvio: '2025-10-03T14:30:00Z', informacionAdicional: { viajanMenoresDeEdad: true, cantidadDeMenores: 2 } },
      { id: 3, nombreCompleto: 'Carlos López', email: 'carlos.lopez@example.com', tipoDeViaje: 'Camión de Carga', fechaDeEnvio: '2025-10-05T08:15:00Z', informacionAdicional: { tipoDeCargaEspecial: 'Sin aplicación' } },
      { id: 4, nombreCompleto: 'Ana Martínez', email: 'ana.martinez@example.com', tipoDeViaje: 'Vehículo Particular', fechaDeEnvio: '2025-10-07T11:00:00Z', informacionAdicional: { viajanMenoresDeEdad: false } }
    ];
    setSubmissions(dummyData);
  }, []);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          submission.email.toLowerCase().includes(searchTerm.toLowerCase());

    const submissionDate = new Date(submission.fechaDeEnvio);
    const matchesDate = (!startDate || submissionDate >= new Date(startDate)) && (!endDate || submissionDate <= new Date(endDate));

    const matchesTravelType = !travelTypeFilter || submission.tipoDeViaje === travelTypeFilter;

    return matchesSearch && matchesDate && matchesTravelType;
  });

  return (
    <div className="app-container">
      <h1 className="main-title">Panel de Documentación</h1>
      
      <div className="content-wrapper">
        <div className="filters-and-table">
          <SearchAndFilter
            setSearchTerm={setSearchTerm}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setTravelTypeFilter={setTravelTypeFilter}
          />
          <SubmissionTable 
            submissions={filteredSubmissions} 
            onSelectSubmission={setSelectedSubmission} 
          />
        </div>
        <div className="details-panel">
          {selectedSubmission ? (
            <SubmissionDetails submission={selectedSubmission} />
          ) : (
            <p>Selecciona un envío de la tabla para ver los detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;