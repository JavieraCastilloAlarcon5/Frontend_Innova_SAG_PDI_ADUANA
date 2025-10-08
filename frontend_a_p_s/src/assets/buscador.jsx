import React from 'react';
import './filtro.css'


function SearchAndFilter({ setSearchTerm, setStartDate, setEndDate, setTravelTypeFilter }) {
  return (
    <div className="search-filter-container">
      <input 
        type="text" 
        placeholder="Buscar por nombre o email..." 
        onChange={e => setSearchTerm(e.target.value)} 
        className="search-input"
      />
      <select onChange={e => setTravelTypeFilter(e.target.value)} className="filter-select">
        <option value="">Todos los Tipos de Viaje</option>
        <option value="Vehículo Particular">Vehículo Particular</option>
        <option value="Camión de Carga">Camión de Carga</option>
      </select>
      <input 
        type="date" 
        onChange={e => setStartDate(e.target.value)} 
        className="date-input"
        title="Fecha de Inicio"
      />
      <input 
        type="date" 
        onChange={e => setEndDate(e.target.value)} 
        className="date-input"
        title="Fecha de Fin"
      />
    </div>
  );
}

export default SearchAndFilter;