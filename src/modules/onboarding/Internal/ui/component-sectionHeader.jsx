export default function SectionHeader({ title, description, align = "center" }) {
  const alignmentClass = align === "left" ? "text-left" : "text-center";

  return (
    <div className={alignmentClass}>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      {description && (
        <p className="mt-3 text-base leading-7 text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
