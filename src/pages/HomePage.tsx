import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import { SearchFormData } from "@/utils/ZodSchemas";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const text2 = "Food is just a click away with Foody.".split(" ");
  const text3 = "Order food online even faster with Foody's App.".split(" ");
  const navigate = useNavigate();

  const handleSearchSubmit = (data: SearchFormData) => {
    navigate({
      pathname: `/search/${data.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className=" md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-300">
          Food in a takeway today
        </h1>
        <motion.div className="text-xl flex justify-center gap-1">
          {text2.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i * 0.1,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        <SearchBar
          placeHolder="Search for restaurants"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order food online even faster!
          </span>
          <motion.div className="text-xl flex justify-center gap-1">
            {text3.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: i * 0.8,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
}
