import { Button } from "@/components/ui/button";
import { ArrowRight, Wind } from "lucide-react";
import { motion } from "motion/react";

// ↓ Swap this constant to change the hero image
const HERO_IMAGE_URL = "/assets/generated/summer-beach-hero.dim_1600x700.jpg";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[560px] md:min-h-[640px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_IMAGE_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/50 to-transparent" />

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full mb-5 border border-white/20">
              <Wind className="w-3.5 h-3.5" />
              New 2024 Model — Bladeless Technology
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Stay Cool,
              <br />
              <span
                className="text-brand-teal"
                style={{ color: "oklch(0.75 0.09 195)" }}
              >
                Anywhere.
              </span>
            </h1>
            <p className="text-white/85 text-lg mb-8 leading-relaxed">
              The CoolBreeze Neck Fan delivers instant 360° airflow.
              Ultra-quiet, USB rechargeable, and safe for all ages — your
              personal summer escape.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-brand-teal-dark text-white font-semibold px-8 transition-all hover:scale-105 shadow-lg"
                onClick={() =>
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.primary_button"
              >
                Shop Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold px-8"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.secondary_button"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
