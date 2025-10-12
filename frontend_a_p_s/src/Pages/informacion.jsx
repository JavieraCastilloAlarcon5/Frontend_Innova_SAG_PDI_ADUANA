import React, { useState, useEffect, useContext } from 'react'; 
import '../App.css';
import SearchAndFilter from '../components/buscador';
import SubmissionTable from '../components/tabla';
import SubmissionDetails from '../components/detalles';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Informacion() {
  const { data, logged, logout } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [travelTypeFilter, setTravelTypeFilter] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 25;
  const navigate = useNavigate();

  // 🟢 Debug: Ver si el contexto se carga correctamente
  useEffect(() => {
    console.log("🔐 AuthContext data en Informacion:", data);
    console.log("🔐 Usuario logueado:", logged);
  }, [data, logged]);

  useEffect(() => {
    console.log("📡 Fetching data from backend...");
    fetch(`http://localhost:3000/persons?page=${page}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        console.log("✅ Datos recibidos del backend:", data);
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
      .catch(error => console.error('❌ Error al obtener datos del backend:', error));
  }, [logged, page]);

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

  const handleLogout = () => {
    console.log("🚪 Cerrando sesión...");
    logout();
    navigate('/');
  };

  // 🟣 Debug: función para detectar si se selecciona correctamente una fila
  const handleSelectSubmission = (submission) => {
    console.log("🟢 Submission seleccionado:", submission);
    setSelectedSubmission(submission);
  };

  // 🟣 Debug: verificar cambios de selección
  useEffect(() => {
    console.log("📄 selectedSubmission actualizado:", selectedSubmission);
  }, [selectedSubmission]);

  return (
    <div className="app-container">
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
            onSelectSubmission={handleSelectSubmission}
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
            // 🔑 Forzar remount en cada selección para refrescar el useEffect de SubmissionDetails
            <SubmissionDetails
              key={selectedSubmission.id}
              submission={selectedSubmission}
            />
          ) : (
            <p>Selecciona un envío de la tabla para ver los detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Informacion;