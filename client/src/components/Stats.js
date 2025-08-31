import React from 'react';

const Stats = ({ stats }) => {
  const { total = 0, confirmados = 0, nao_confirmados = 0, casais = 0 } = stats;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number">{total}</div>
        <div className="stat-label">Total de Convidados</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number">{confirmados}</div>
        <div className="stat-label">Confirmados</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number">{nao_confirmados}</div>
        <div className="stat-label">Não Confirmados</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number">{casais}</div>
        <div className="stat-label">Casais</div>
      </div>
    </div>
  );
};

export default Stats;
