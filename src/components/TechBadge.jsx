export function TechBadge({ children }) {
  return (
    <li className="rounded-full border border-fg/10 bg-fg/[0.05] px-3 py-1 text-[0.8rem] font-medium text-iris-soft">
      {children}
    </li>
  );
}

export function TechList({ items, className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies">
      {items.map((item) => (
        <TechBadge key={item}>{item}</TechBadge>
      ))}
    </ul>
  );
}
