export default function MultiSelect({
  label,
  options,
  selectedValues,
  onChange,
  helperText,
  columns = "sm:grid-cols-2",
}) {
  const fieldsetId = `${label.replace(/\s+/g, "-").toLowerCase()}-options`;

  const toggleValue = (value) => {
    onChange(
      selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
  };

  return (
    <fieldset
      className="flex flex-col gap-3"
      aria-describedby={helperText ? `${fieldsetId}-helper` : undefined}
    >
      <legend className="text-sm font-medium text-slate-300">{label}</legend>

      {helperText && (
        <p id={`${fieldsetId}-helper`} className="text-sm text-slate-500">
          {helperText}
        </p>
      )}

      <div id={fieldsetId} className={`grid gap-2 ${columns}`}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleValue(option)}
              className={`flex min-h-11 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm font-medium transition ${
                isSelected
                  ? "border-blue-500 bg-blue-500/10 text-blue-300"
                  : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <span>{option}</span>
              <span
                className={`flex size-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                  isSelected
                    ? "border-blue-400 bg-blue-500 text-white"
                    : "border-slate-700"
                }`}
              >
                {isSelected ? "\u2713" : ""}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
