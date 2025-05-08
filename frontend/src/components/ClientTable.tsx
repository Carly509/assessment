'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import "./ClientTable.css";

interface Client {
  id:  number;
  name: string;
  birthday: string;
  type: string;
  account: string;
  balance: number;
}

interface ClientTableProps {
  clients: Client[];
  onDelete: (id: number) => void;
}

interface ModalState {
  open: boolean;
  type: string;
  client: Client | null;
}

export default function ClientTable({ clients, onDelete }: ClientTableProps) {
  const [modal, setModal] = useState<ModalState>({ open: false, type: "", client: null });
  const [page, setPage] = useState(1);
  const perPage = 13;
  const pageCount = Math.ceil(clients.length / perPage);

  const paginated = clients.slice((page - 1) * perPage, page * perPage);

  // Modal content based on type selected
  const renderModal = () => {
    if (!modal.client) return null;

    if (modal.type === "details") {
      const { name, birthday, type, account, balance } = modal.client;
      return (
        <motion.div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="modal-header">
    <h3>Client Details</h3>
    <button
      className="close-button"
      onClick={() => setModal({ open: false, type: "", client: null })}
    >
      <IoClose />
    </button>
      </div>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Birthday:</strong> {birthday}</p>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Account:</strong> {account}</p>
      <p><strong>Balance:</strong> ${balance.toLocaleString('en-US')}</p>
    </motion.div>
      );
    }

    if (modal.type === "close") {
      return (
        <motion.div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3>Are you sure?</h3>
          <p>This account will be closed.</p>
          <div className="modal-actions">
            <button
              className="modal-btn modal-btn-danger"
              onClick={() => {
                // Add null check to ensure client is not null
                if (modal.client) {
                  onDelete(modal.client.id);
                }
                setModal({ open: false, type: "", client: null });
              }}
            >
              Yes
            </button>
            <button
              className="modal-btn modal-btn-cancel"
              onClick={() => setModal({ open: false, type: "", client: null })}
            >
              No
            </button>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <div className="table-card">
      <table className="client-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthday</th>
            <th>Type</th>
            <th>Account</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((client: Client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.birthday}</td>
              <td>{client.type}</td>
              <td>{client.account}</td>
              <td className="balance">${client.balance.toLocaleString('en-US')}</td>
              <td>
                <span
                  className="action-link"
                  onClick={() => setModal({ open: true, type: "details", client })}
                >
                  Details
                </span>
                {" | "}
                <span className="action-link">Transfer</span>
                {" | "}
                <span
                  className="action-link"
                  onClick={() => setModal({ open: true, type: "close", client })}
                >
                  Close Account
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {pageCount}</span>
        <button disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</button>
      </div>
      {/* Modal */}
      <AnimatePresence>
        {modal.open && (
          <motion.div
            className="modal-backdrop"
            onClick={() => setModal({ open: false, type: "", client: null })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            {renderModal()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
