// app/loading.tsx
import { FiCommand } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <FiCommand className="loading-icon" />
      </div>
    </div>
  );
}
