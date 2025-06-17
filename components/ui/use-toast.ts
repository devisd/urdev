import { useToast as useToastHook } from "@/hooks/use-toast";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

export { useToastHook as useToast }; 