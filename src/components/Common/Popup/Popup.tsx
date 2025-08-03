import React from 'react';
import './Popup.css';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title?: string;
  message: string;
  actionText?: string; // default: 'OK'
  actionHandler?: () => void; // default: onClose
}

const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  type,
  title,
  message,
  actionText = 'OK',
  actionHandler,
}) => {
  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`popup-modal popup-${type}`} onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose} aria-label="Close">&times;</button>
        <div className="popup-icon">
          {type === 'success' ? '✔️' : '❌'}
        </div>
        {title && <div className="popup-title">{title}</div>}
        <div className="popup-message">{message}</div>
        <button className="popup-action" onClick={actionHandler || onClose}>
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default Popup; 