interface UserDropdownProps {
  type: string,
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<UserDropdownProps> = ({type, options, selectedValue, onChange }) => {
  return (
    <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
      <option value="">All {type}</option>
      {options.map((user) => (
        <option key={user} value={user}>
          {user}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;