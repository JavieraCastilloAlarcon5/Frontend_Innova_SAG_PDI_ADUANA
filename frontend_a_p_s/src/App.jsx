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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 25;

  useEffect(() => {
    if (!isLoggedIn) return;

    fetch(`http://localhost:3001/persons?page=${page}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        if (data.length < limit) setHasMore(false);
        else setHasMore(true);

        const formattedData = data.map(person => ({
          id: person.id,
          nombreCompleto: person.name,
          rut: person.rut,
          email: person.email,
          tipoDeViaje: person.travel_type,
          fecha: person.travel_date,
        }));

        setSubmissions(formattedData);
      })
      .catch(error => console.error('Error al obtener datos del backend:', error));
  }, [isLoggedIn, page]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch =
      submission.nombreCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const submissionDate = new Date(submission.fecha);
    const matchesDate =
      (!startDate || submissionDate >= new Date(startDate)) &&
      (!endDate || submissionDate <= new Date(endDate));

    const matchesTravelType =
      !travelTypeFilter || submission.tipoDeViaje === travelTypeFilter;

    return matchesSearch && matchesDate && matchesTravelType;
  });

  const handleNextPage = () => {
    if (hasMore) setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleAuthSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setSubmissions([]);
    setSelectedSubmission(null);
    setPage(1);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <>
          <h1 className="main-title">Panel de Documentación</h1>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>

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

              <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={page === 1}>
                  ← Anterior
                </button>
                <span>Página {page}</span>
                <button onClick={handleNextPage} disabled={!hasMore}>
                  Siguiente →
                </button>
              </div>
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
