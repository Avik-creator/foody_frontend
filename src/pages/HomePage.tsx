import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import { motion } from "framer-motion";

export default function HomePage() {
  const text2 = "Food is just a click away with Foody.".split(" ");
  const text3 = "Order food online even faster with Foody's App.".split(" ");
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
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
