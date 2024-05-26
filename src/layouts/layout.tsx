import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { motion, useInView, useAnimate, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col min-h-screen relative overflow-hidden"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 10, delay: 1 }}
    >
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </motion.div>
  );
};

export default Layout;
