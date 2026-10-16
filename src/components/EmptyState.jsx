/* ============================================================
   TRENDZO — EmptyState
   Reusable "nothing here" message.
   Props:
     icon  → emoji or string (default: 📭)
     title → main text
     text  → secondary text (optional)
   ============================================================ */

export default function EmptyState({ icon = "📭", title, text }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div className="empty-state-title">{title}</div>
      {text && <div className="empty-state-text">{text}</div>}
    </div>
  );
}