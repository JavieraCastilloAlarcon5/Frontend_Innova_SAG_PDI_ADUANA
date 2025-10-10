import React, { useState, useEffect } from 'react';
import SearchAndFilter from './assets/buscador';
import SubmissionTable from './assets/tabla';
import SubmissionDetails from './assets/detalles';
import Auth from './assets/auth'; 
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [travelTypeFilter, setTravelTypeFilter] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);


  useEffect(() => {

    if (!isLoggedIn) return;


    fetch('http://localhost:3001/api/persons')
    .then(response => response.json())
    .then(data => {
      const formattedData = data.map(person => ({
        id: person.id,
        nombreCompleto: person.name,
        email: person.email,
        tipoDeViaje: person.travel_type,
        fechaDeEnvio: person.travel_date,
      }));
      setSubmissions(formattedData);
    })
    .catch(error => console.error('Error al obtener datos del backend:', error));
}, [isLoggedIn]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          submission.email.toLowerCase().includes(searchTerm.toLowerCase());
    const submissionDate = new Date(submission.fechaDeEnvio);
    const matchesDate = (!startDate || submissionDate >= new Date(startDate)) && (!endDate || submissionDate <= new Date(endDate));
    const matchesTravelType = !travelTypeFilter || submission.tipoDeViaje === travelTypeFilter;
    return matchesSearch && matchesDate && matchesTravelType;
  });

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSubmissions([]);
    setSelectedSubmission(null);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (

        <>
          <h1 className="main-title">Panel de Documentación</h1>
          <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
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
        </>
      ) : (
        <Auth onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;