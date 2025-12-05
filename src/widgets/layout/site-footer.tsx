export const SiteFooter = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Accessory Shop. Тестовий деплой develop / продакшн main.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="mailto:info@shop.ua">info@shop.ua</a>
          <a href="tel:+380441112233">+380 (44) 111-22-33</a>
        </div>
      </div>
    </footer>
  );
};
