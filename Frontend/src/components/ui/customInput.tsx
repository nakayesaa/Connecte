import { Search } from "lucide-react";

const CustomInput = ({ ...props }) => (
  <div className="relative flex-1 group">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] group-focus-within:text-white transition-colors" />
    <input
      {...props}
      className="w-full bg-[#161616] border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-white/20 transition-all"
    />
  </div>
);

export default CustomInput;
