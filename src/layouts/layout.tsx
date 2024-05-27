import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

const Layout = ({ children, showHero }: Props) => {
  return (
    <motion.div
      className="flex flex-col min-h-screen relative overflow-hidden"
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </motion.div>
  );
};

export default Layout;
