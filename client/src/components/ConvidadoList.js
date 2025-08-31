import React, { useState } from 'react';
import { Edit, Trash2, Check, X, User, Heart } from 'lucide-react';
import ConvidadoForm from './ConvidadoForm';

const ConvidadoList = ({ convidados, onToggleConfirmacao, onEdit, onDelete }) => {
  const [editingConvidado, setEditingConvidado] = useState(null);

  const handleEdit = (convidado) => {
    setEditingConvidado(convidado);
  };

  const handleEditSubmit = async (id, data) => {
    const result = await onEdit(id, data);
    if (result.success) {
      setEditingConvidado(null);
    }
    return result;
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja remover este convidado?')) {
      onDelete(id);
    }
  };

  if (convidados.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nenhum convidado ainda</h3>
        <p>Adicione seu primeiro convidado para começar!</p>
      </div>
    );
  }

  return (
    <div>
      {convidados.map((convidado) => (
        <div key={convidado.id} className="convidado-item">
          <div className="convidado-info">
            <div className="convidado-nome">
              <User size={16} style={{ marginRight: '8px', opacity: 0.7 }} />
              {convidado.nome}
            </div>
            {convidado.parceiro && (
              <div className="convidado-parceiro">
                <Heart size={14} style={{ marginRight: '6px', opacity: 0.6 }} />
                + {convidado.parceiro}
              </div>
            )}
          </div>

          <div className="convidado-acoes">
            <span className={`status-badge ${convidado.confirmado ? 'status-confirmado' : 'status-nao-confirmado'}`}>
              {convidado.confirmado ? 'Confirmado' : 'Não Confirmado'}
            </span>

            <button
              className={`btn btn-sm ${convidado.confirmado ? 'btn-secondary' : 'btn-success'}`}
              onClick={() => onToggleConfirmacao(convidado.id, !convidado.confirmado)}
              title={convidado.confirmado ? 'Marcar como não confirmado' : 'Confirmar presença'}
            >
              {convidado.confirmado ? <X size={14} /> : <Check size={14} />}
            </button>

            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleEdit(convidado)}
              title="Editar convidado"
            >
              <Edit size={14} />
            </button>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(convidado.id)}
              title="Remover convidado"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      {editingConvidado && (
        <ConvidadoForm
          onSubmit={handleEditSubmit}
          onClose={() => setEditingConvidado(null)}
          mode="edit"
          convidado={editingConvidado}
        />
      )}
    </div>
  );
};

export default ConvidadoList;
