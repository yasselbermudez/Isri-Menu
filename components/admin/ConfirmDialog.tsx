import {LoaderCircle} from 'lucide-react'

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Eliminar',
  danger = true,
  loading,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl border border-gray-700 p-5">
        <h3 className="text-base font-bold text-gray-100">{title}</h3>
        <p className="text-sm text-gray-400 mt-2">{message}</p>
        <div className="flex gap-3 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 rounded-full py-2.5 text-sm font-semibold bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
              danger ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'
            } disabled:opacity-60`}
          >
            {loading && <LoaderCircle className="w-5 h-5 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}