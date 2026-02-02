import { ArrowRight } from "lucide-react";

const CustomAuthButton = ({
  icon: Icon,
  text,
  onClick,
  variant = "secondary",
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center justify-between w-full px-6 py-3.5 rounded-full border border-white/5
      transition-all duration-300 group active:scale-95
      ${
        variant === "primary"
          ? "bg-white text-black font-bold"
          : "bg-[#161616]/50 text-[#A1A1AA] hover:bg-[#161616] hover:text-white hover:border-white/10"
      }
    `}
  >
    <div className="flex items-center gap-3">
      <Icon
        className={`${variant === "primary" ? "text-black" : "text-lg group-hover:scale-110 transition-transform"}`}
      />
      <span className="text-sm font-medium">{text}</span>
    </div>
    <ArrowRight
      size={14}
      className={
        variant === "primary"
          ? "text-black"
          : "text-[#71717A] group-hover:text-white"
      }
    />
  </button>
);

export default CustomAuthButton;
