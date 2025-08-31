import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Stats from './components/Stats';
import ConvidadoForm from './components/ConvidadoForm';
import ConvidadoList from './components/ConvidadoList';
import './styles/index.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [convidados, setConvidados] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Carregar convidados
  const fetchConvidados = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/convidados`);
      setConvidados(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar convidados');
      console.error('Erro ao carregar convidados:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar estatísticas
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
    }
  };

  // Adicionar convidado
  const addConvidado = async (convidadoData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/convidados`, convidadoData);
      await fetchConvidados();
      await fetchStats();
      setShowForm(false);
      return { success: true, message: response.data.message };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Erro ao adicionar convidado';
      return { success: false, message: errorMessage };
    }
  };

  // Atualizar status de confirmação
  const toggleConfirmacao = async (id, confirmado) => {
    try {
      await axios.put(`${API_BASE_URL}/convidados/${id}/confirmar`, { confirmado });
      await fetchConvidados();
      await fetchStats();
    } catch (err) {
      setError('Erro ao atualizar confirmação');
      console.error('Erro ao atualizar confirmação:', err);
    }
  };

  // Editar convidado
  const editConvidado = async (id, convidadoData) => {
    try {
      await axios.put(`${API_BASE_URL}/convidados/${id}`, convidadoData);
      await fetchConvidados();
      await fetchStats();
      return { success: true, message: 'Convidado atualizado com sucesso!' };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Erro ao atualizar convidado';
      return { success: false, message: errorMessage };
    }
  };

  // Deletar convidado
  const deleteConvidado = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/convidados/${id}`);
      await fetchConvidados();
      await fetchStats();
    } catch (err) {
      setError('Erro ao deletar convidado');
      console.error('Erro ao deletar convidado:', err);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    fetchConvidados();
    fetchStats();
  }, []);

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <Stats stats={stats} />

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Lista de Convidados</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              + Adicionar Convidado
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Carregando convidados...</p>
            </div>
          ) : (
            <ConvidadoList
              convidados={convidados}
              onToggleConfirmacao={toggleConfirmacao}
              onEdit={editConvidado}
              onDelete={deleteConvidado}
            />
          )}
        </div>

        {showForm && (
          <ConvidadoForm
            onSubmit={addConvidado}
            onClose={() => setShowForm(false)}
            mode="add"
          />
        )}
      </div>
    </div>
  );
}

export default App;
