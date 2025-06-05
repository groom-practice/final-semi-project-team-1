type AuthInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};
function AuthInput({ label, value, onChange, type = "text" }: AuthInputProps) {
  return (
    <div className="flex flex-row items-center gap-2 py-2">
      <label className="min-w-[70px] text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={`${label}을 입력해주세요`}
        onChange={onChange}
        className="block p-2 w-full border border-slate-200 rounded"
      />
    </div>
  );
}

export default AuthInput;
