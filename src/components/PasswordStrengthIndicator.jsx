import PropTypes from "prop-types";

export const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (password) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    
    // Character type checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const getStrengthLabel = (strength) => {
    if (strength <= 2) return { label: "Weak", color: "bg-red-400/80" };
    if (strength <= 4) return { label: "Medium", color: "bg-yellow-400/80" };
    return { label: "Strong", color: "bg-emerald-400/80" };
  };

  const strength = calculateStrength(password);
  const { label, color } = getStrengthLabel(strength);

  return (
    <div className="mt-6 backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-white/70">Password Strength</span>
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${(strength / 6) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string.isRequired
};
