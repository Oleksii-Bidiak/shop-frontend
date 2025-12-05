export const SiteFooter = () => {
  return (
    <footer className="footer">
      <div className="container flex items-center justify-between py-5">
        <p>© {new Date().getFullYear()} Accessory Shop. Тестовий деплой develop / продакшн main.</p>
        <div className="flex gap-3">
          <a href="mailto:info@shop.ua">info@shop.ua</a>
          <a href="tel:+380441112233">+380 (44) 111-22-33</a>
        </div>
      </div>
    </footer>
  );
};
