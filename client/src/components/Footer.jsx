const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* About Section */}
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-lg font-bold mb-2">About ECOshop 2024</h2>
          <p className="text-sm">
            ECOshop 2024 is dedicated to providing eco-friendly and sustainable
            products to help you live a greener life.
          </p>
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-right md:w-1/2">
          <h2 className="text-lg font-bold mb-2">Contact Us</h2>
          <p className="text-sm">Email: info@ecoshop2024.com</p>
          <p className="text-sm">Phone: +1 (234) 567-890</p>
          <p className="text-sm">123 Green Street, Eco City, Earth</p>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm">
          &copy; 2024 ECOshop 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
