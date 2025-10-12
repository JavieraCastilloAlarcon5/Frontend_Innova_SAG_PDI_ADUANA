import React from 'react';
import './filtro.css'


function SearchAndFilter({ setSearchTerm, setStartDate, setTravelTypeFilter }) {
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
        <option value="vehículo particular">Vehículo Particular</option>
        <option value="camión de carga">Camión de Carga</option>
      </select>
      <input 
        type="date" 
        onChange={e => setStartDate(e.target.value)} 
        className="date-input"
        title="Fecha de Inicio"
      />
    </div>
  );
}

export default SearchAndFilter;