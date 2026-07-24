import { useMemo, useState } from "react";

export default function SearchableMultiSelect({
  label,
  options,
  selectedValues,
  onChange,
  allowCustom = true,
  placeholder = "Search or add an option",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const visibleOptions = useMemo(
    () =>
      options.filter((option) =>
        option.toLowerCase().includes(normalizedSearch)
      ),
    [normalizedSearch, options]
  );

  const toggleValue = (value) => {
    onChange(
      selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
  };

  const addCustomValue = () => {
    const customValue = searchTerm.trim();

    if (!customValue || selectedValues.includes(customValue)) {
      return;
    }

    onChange([...selectedValues, customValue]);
    setSearchTerm("");
  };

  const showCustomAction =
    allowCustom &&
    searchTerm.trim() !== "" &&
    !options.some((option) => option.toLowerCase() === normalizedSearch) &&
    !selectedValues.some((value) => value.toLowerCase() === normalizedSearch);

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={`${label}-search`} className="text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        id={`${label}-search`}
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && showCustomAction) {
            event.preventDefault();
            addCustomValue();
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
      />

      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleValue(value)}
              className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 transition-colors hover:bg-blue-500/20"
            >
              {value} x
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-2 sm:grid-cols-2">
        {visibleOptions.map((option) => {
          const isSelected = selectedValues.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleValue(option)}
              className={`rounded-lg border px-3 py-2 text-left text-sm font-medium transition ${
                isSelected
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showCustomAction && (
        <button
          type="button"
          onClick={addCustomValue}
          className="rounded-lg border border-dashed border-slate-700 px-3 py-2 text-left text-sm font-medium text-slate-300 transition-colors hover:border-blue-500 hover:text-blue-300"
        >
          Add "{searchTerm.trim()}"
        </button>
      )}
    </div>
  );
}
