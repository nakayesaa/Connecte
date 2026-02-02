import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { CheckCircle2, AlertOctagon, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        const getStyles = () => {
          const v = variant as string;

          if (v === "destructive") {
            return {
              icon: (
                <AlertOctagon
                  className="text-rose-500"
                  size={20}
                  strokeWidth={2.5}
                />
              ),
              class:
                "border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]",
              bar: "bg-rose-500",
            };
          }

          if (v === "success") {
            return {
              icon: (
                <CheckCircle2
                  className="text-emerald-400"
                  size={20}
                  strokeWidth={2.5}
                />
              ),
              class:
                "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
              bar: "bg-emerald-500",
            };
          }

          return {
            icon: (
              <Info className="text-blue-400" size={20} strokeWidth={2.5} />
            ),
            class: "border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]",
            bar: "bg-blue-400",
          };
        };

        const styles = getStyles();

        return (
          <Toast
            key={id}
            {...props}
            // Use type assertion here to satisfy the Toast component's expected types
            variant={variant as any}
            className={`
              group relative overflow-hidden bg-[#161616]/95 backdrop-blur-lg border-2 rounded-[24px] p-5 transition-all
              ${styles.class}
            `}
          >
            <div className="flex gap-4 w-full">
              <div className="mt-0.5 shrink-0">{styles.icon}</div>

              <div className="flex flex-col gap-1 pr-4">
                {title && (
                  <ToastTitle className="text-sm font-bold tracking-tight text-white">
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>

            {action}
            <ToastClose className="absolute right-4 top-4 text-[#71717A] hover:text-white transition-all opacity-0 group-hover:opacity-100" />
            <div
              className={`absolute bottom-0 left-0 h-[3px] w-full opacity-30 ${styles.bar}`}
            />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
