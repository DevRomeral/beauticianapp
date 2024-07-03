'use client';

import { useAlert } from '@/contexts/AlertContext';
import { useTranslations } from 'next-intl';
import React from 'react';

export const AlertConfig = {
  alertId: 'alertDialogId',
  btnConfirmId: 'btnConfirmAlertDialog',
};

const AlertDialog: React.FC = () => {
  const t = useTranslations('Alert.Defaults');
  const { title, message, hide, visible, confirmText, cancelText, onConfirm } = useAlert();

  if (!visible) return null;

  return (
    <div className="custom-alert-wrapper fixed z-40 h-full w-full">
      <div className="background-alert fixed h-full w-full" onClick={hide}></div>
      {visible && (
        <div className="custom-alert" id={AlertConfig.alertId} data-testid={AlertConfig.alertId}>
          {title != '' && <span className="title">{title}</span>}
          <p className="description">{message}</p>

          <div className="button-row">
            <button className="cancel" onClick={hide}>
              {cancelText ?? t('cancel')}
            </button>
            <button
              id={AlertConfig.btnConfirmId}
              data-testid={AlertConfig.btnConfirmId}
              onClick={() => {
                if (onConfirm) onConfirm();
                hide();
              }}
            >
              {confirmText ?? t('ok')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertDialog;
