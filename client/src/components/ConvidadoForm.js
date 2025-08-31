import React, { useState, useEffect } from 'react';
import { X, User, Heart } from 'lucide-react';

const ConvidadoForm = ({ onSubmit, onClose, mode = 'add', convidado = null }) => {
  const [formData, setFormData] = useState({
    nome: '',
    parceiro: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (convidado && mode === 'edit') {
      setFormData({
        nome: convidado.nome || '',
        parceiro: convidado.parceiro || ''
      });
    }
  }, [convidado, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome.trim()) {
      setMessage({ type: 'error', text: 'Nome é obrigatório' });
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      let result;
      if (mode === 'edit') {
        result = await onSubmit(convidado.id, formData);
      } else {
        result = await onSubmit(formData);
      }

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro inesperado' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === 'edit' ? 'Editar Convidado' : 'Adicionar Convidado'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <User size={16} style={{ marginRight: '8px' }} />
              Nome do Convidado *
            </label>
            <input
              type="text"
              name="nome"
              className="form-input"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite o nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Heart size={16} style={{ marginRight: '8px' }} />
              Parceiro (Opcional)
            </label>
            <input
              type="text"
              name="parceiro"
              className="form-input"
              value={formData.parceiro}
              onChange={handleChange}
              placeholder="Nome do parceiro (casal)"
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : (mode === 'edit' ? 'Atualizar' : 'Adicionar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConvidadoForm;
