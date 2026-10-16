/* ============================================================
   TRENDZO — SearchBar
   Controlled input. Value comes from parent, changes go back to parent.
   Props:
     value    → current search text
     onChange → callback when user types
     placeholder → optional placeholder text
   ============================================================ */

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}) {
  return (
    <div className="searchbar">
      <input
        type="text"
        className="searchbar-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}