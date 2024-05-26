import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import useIntro from "@/customHooks/useIntro";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const showAnimation = useIntro();

  useEffect(() => {
    if (isInView && showAnimation) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        className="flex flex-col min-h-screen"
        variants={{
          hidden: { opacity: 0.5, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Header />
        <Hero />
        <div className="container mx-auto flex-1 py-10">{children}</div>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Layout;
