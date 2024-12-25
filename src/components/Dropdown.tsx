'use client';

interface DropdownProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const Dropdown = ({ name, value, onChange, options }: DropdownProps) => {
    return <select
        name={name}
        className="bg-background border border-input rounded-md px-3 py-2 focus:ring-blue-200 mb-2 w-fit"
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
            <option key={`${name}_${index}`} value={option.value}>{option.label}</option>
        ))}
    </select>
}

export default Dropdown;