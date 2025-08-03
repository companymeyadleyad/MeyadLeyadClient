import React, { createContext, useContext, useState, ReactNode } from "react";
import Popup from "./Popup";

type PopupType = 'success' | 'error';

interface PopupContextProps {
  showPopup: (options: {
    type: PopupType;
    message: string;
    title?: string;
    actionText?: string;
    actionHandler?: () => void;
  }) => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<PopupType>('success');
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [actionText, setActionText] = useState<string | undefined>(undefined);
  const [actionHandler, setActionHandler] = useState<(() => void) | undefined>(undefined);

  const showPopup = ({
    type,
    message,
    title,
    actionText,
    actionHandler,
  }: {
    type: PopupType;
    message: string;
    title?: string;
    actionText?: string;
    actionHandler?: () => void;
  }) => {
    setType(type);
    setMessage(message);
    setTitle(title);
    setActionText(actionText);
    setActionHandler(() => actionHandler);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (actionHandler) actionHandler();
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <Popup
        open={open}
        onClose={handleClose}
        type={type}
        title={title}
        message={message}
        actionText={actionText}
        actionHandler={handleClose}
      />
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context.showPopup;
}; 