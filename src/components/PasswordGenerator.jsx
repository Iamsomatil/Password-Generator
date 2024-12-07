import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { generatePassword } from "../utils/passwordGenerator";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

export const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  const [copied, setCopied] = useState(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopyPassword = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md p-8 backdrop-blur-lg bg-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Password Generator
      </h1>

      <div className="relative mb-6">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full p-4 pr-24 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-white/50 font-mono transition-all"
          placeholder="Click generate to start"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            onClick={handleCopyPassword}
            className="p-2 text-white/70 hover:text-white transition-colors hover:bg-white/10 rounded-lg"
            title="Copy password"
          >
            <Copy size={20} />
          </button>
          <button
            onClick={handleGeneratePassword}
            className="p-2 text-white/70 hover:text-white transition-colors hover:bg-white/10 rounded-lg"
            title="Generate new password"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {copied && (
        <div className="text-sm text-emerald-300 mb-6 text-center font-medium">
          Password copied to clipboard!
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-white/90 font-medium">Password Length: {options.length}</span>
            <input
              type="range"
              min="8"
              max="32"
              value={options.length}
              onChange={(e) =>
                setOptions({ ...options, length: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "includeUppercase", label: "Uppercase Letters" },
            { key: "includeLowercase", label: "Lowercase Letters" },
            { key: "includeNumbers", label: "Numbers" },
            { key: "includeSymbols", label: "Symbols" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 text-white/90 hover:text-white cursor-pointer group">
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(e) =>
                  setOptions({ ...options, [key]: e.target.checked })
                }
                className="w-5 h-5 bg-white/5 border border-white/10 rounded checked:bg-purple-500 checked:border-purple-500 focus:ring-offset-0 focus:ring-1 focus:ring-purple-500/50 transition-all cursor-pointer"
              />
              <span className="text-sm font-medium transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {password && <PasswordStrengthIndicator password={password} />}

      <button
        onClick={handleGeneratePassword}
        className="w-full mt-8 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Generate Password
      </button>
    </div>
  );
};
