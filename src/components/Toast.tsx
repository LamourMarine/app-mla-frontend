import { useEffect } from "react";

interface ToastProps {
    message: string;
    onClose(): void;
    duration?: number; // en millisecondes
}

const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return() => clearTimeout(timer);
    }, [duration, onClose]);

    return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in z-50">
      <span>✓ {message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 font-bold text-xl"
      >
        ×
      </button>
    </div>
  );

};

export default Toast;
