/* ============================================================
   TRENDZO — Footer
   Simple bottom bar.
   ============================================================ */

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} Trendzo — Shop the trend.
      </div>
    </footer>
  );
}