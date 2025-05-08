import React, { useState } from "react";
import "./ClientTable.css";

export default function ClientTable({ clients, onDelete }) {
  const [modal, setModal] = useState({ open: false, type: "", client: null });
  const [page, setPage] = useState(1);
  const perPage = 13;
  const pageCount = Math.ceil(clients.length / perPage);

  const paginated = clients.slice((page - 1) * perPage, page * perPage);

  // Modal content based on type
  const renderModal = () => {
    if (!modal.client) return null;

    if (modal.type === "details") {
      const { name, birthday, type, account, balance } = modal.client;
      return (
        <div className="modal" onClick={e => e.stopPropagation()}>
          <h3>Client Details</h3>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Birthday:</strong> {birthday}</p>
          <p><strong>Type:</strong> {type}</p>
          <p><strong>Account:</strong> {account}</p>
          <p><strong>Balance:</strong> ${balance.toLocaleString()}</p>
          <button onClick={() => setModal({ open: false, type: "", client: null })}>Close</button>
        </div>
      );
    }

    if (modal.type === "close") {
      return (
        <div className="modal" onClick={e => e.stopPropagation()}>
          <h3>Are you sure?</h3>
          <p>This account will be closed.</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              style={{ background: "#650000", color: "#fff" }}
              onClick={() => {
                onDelete(modal.client.account);
                setModal({ open: false, type: "", client: null });
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setModal({ open: false, type: "", client: null })}
            >
              No
            </button>
          </div>
        </div>
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
          {paginated.map((client, idx) => (
            <tr key={client.account}>
              <td>{client.name}</td>
              <td>{client.birthday}</td>
              <td>{client.type}</td>
              <td>{client.account}</td>
              <td className="balance">${client.balance.toLocaleString()}</td>
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
      {modal.open && (
        <div className="modal-backdrop" onClick={() => setModal({ open: false, type: "", client: null })}>
          {renderModal()}
        </div>
      )}
    </div>
  );
}
