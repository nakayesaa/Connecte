const ProfileInput = ({
  label,
  icon,
  value,
  disabled,
  onChange,
  placeholder,
}: any) => (
  <div className="flex flex-col gap-1.5 group">
    <div className="flex items-center gap-2 text-[10px] font-bold text-[#71717A] uppercase tracking-widest ml-1">
      {icon} {label}
    </div>
    <input
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`
        w-full bg-[#0A0A0A]/50 border rounded-2xl px-4 py-3 text-sm transition-all
        ${
          disabled
            ? "border-transparent text-[#A1A1AA] cursor-not-allowed opacity-80"
            : "border-white/10 text-white focus:outline-none focus:border-white/30 bg-[#0A0A0A]"
        }
      `}
    />
  </div>
);

export default ProfileInput;
