import { Bounce, toast, ToastOptions, TypeOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};

export const showToast = (
  message: string,
  type: TypeOptions = 'info',
  options: ToastOptions = {}
) => {
  toast(message, { ...defaultOptions, type, ...options });
};

// Specific toast shortcuts for convenience
export const toastSuccess = (message: string, options: ToastOptions = {}) =>
  showToast(message, 'success', options);
export const toastError = (message: string, options: ToastOptions = {}) =>
  showToast(message, 'error', options);
export const toastInfo = (message: string, options: ToastOptions = {}) =>
  showToast(message, 'info', options);
export const toastWarning = (message: string, options: ToastOptions = {}) =>
  showToast(message, 'warning', options);
