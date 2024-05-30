import NotFound from "../assets/NotFound.jpg";
const NotFoundPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <p className="text-bold text-2xl">
        Uhh Ohh, It is Not Good from Us.
        <br /> We will get back soon.
      </p>
      <img src={NotFound} alt="404" className="w-1/2" />
    </div>
  );
};

export default NotFoundPage;
