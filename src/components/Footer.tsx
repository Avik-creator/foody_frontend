const Footer = () => {
  return (
    <div className="bg-orange-300 py-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <span className="text-3xl text-white font-bold tracking-tight">
          Foody
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
