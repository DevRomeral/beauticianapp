'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AlertType = '' | 'alert' | 'confirm';

export interface CommonArgs {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export interface AlertDialogArgs extends CommonArgs {}

export interface AlertConfirmArgs extends CommonArgs {
  onConfirm: () => void;
}

export interface AlertContextType {
  type: AlertType;
  title: string | null;
  message: string | null;
  visible: boolean;
  cancelText: string | undefined;
  confirmText: string | undefined;
  showAlert: (args: AlertDialogArgs) => void;
  showConfirm: (args: AlertConfirmArgs) => void;
  hide: () => void;
  onConfirm?: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [type, setType] = useState<AlertType>('');
  const [title, setTitle] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState<string | undefined>(undefined);
  const [cancelText, setCancelText] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);

  const setCommonArgs = (title: string, message: string, confirmText?: string, cancelText?: string) => {
    setTitle(title);
    setMessage(message);
    setConfirmText(confirmText);
    setCancelText(cancelText);
  };

  const showAlert = ({ title, message, confirmText, cancelText }: AlertDialogArgs) => {
    setType('alert');
    setCommonArgs(title, message, confirmText, cancelText);
    setVisible(true);
  };

  const showConfirm = ({ title, message, onConfirm, confirmText, cancelText }: AlertConfirmArgs) => {
    setType('confirm');
    setCommonArgs(title, message, confirmText, cancelText);
    setOnConfirm(() => onConfirm);
    setVisible(true);
  };

  const hide = () => {
    setOnConfirm(undefined);
    setVisible(false);
  };
  return (
    <AlertContext.Provider
      value={{ title, visible, type, showAlert, showConfirm, cancelText, confirmText, hide, message, onConfirm }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
