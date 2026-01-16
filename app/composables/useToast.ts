import { toast } from 'vue-sonner'

export const useToast = () => {
  return {
    success: (message: string, options?: any) => toast.success(message, options),
    error: (message: string, options?: any) => toast.error(message, options),
    info: (message: string, options?: any) => toast.info(message, options),
    warning: (message: string, options?: any) => toast.warning(message, options),
    loading: (message: string, options?: any) => toast.loading(message, options),
    promise: toast.promise,
    custom: toast.custom,
    dismiss: toast.dismiss,
  }
}
