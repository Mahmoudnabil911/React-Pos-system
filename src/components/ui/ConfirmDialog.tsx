import { Modal } from './Modal';
import { useTranslation } from 'react-i18next';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen, onClose, onConfirm, title, message, confirmText, cancelText, isDestructive = true
}: ConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button
            onClick={onClose}
            style={{
              padding: '0.625rem 1.25rem', borderRadius: '0.75rem',
              border: '1px solid rgb(var(--border-primary))',
              background: 'none', cursor: 'pointer', fontSize: '0.875rem',
              fontFamily: 'var(--font-sans)', color: 'rgb(var(--text-secondary))',
            }}
          >
            {cancelText || t('common.cancel')}
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`btn-primary`}
            style={{
              background: isDestructive ? 'rgb(var(--accent-danger))' : 'rgb(var(--accent-primary))',
              color: 'white',
            }}
          >
            {confirmText || (isDestructive ? t('common.delete') : t('confirm'))}
          </button>
        </>
      }
    >
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgb(var(--text-secondary))', lineHeight: 1.5 }}>
        {message}
      </p>
    </Modal>
  );
}
