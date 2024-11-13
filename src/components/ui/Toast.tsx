import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';
const Toast = ({ title, description }) => {
  return (
    <ToastPrimitive.Root className="toast">
      <ToastPrimitive.Title>{title}</ToastPrimitive.Title>
      <ToastPrimitive.Description>{description}</ToastPrimitive.Description>
    </ToastPrimitive.Root>
  );
};
export default Toast;