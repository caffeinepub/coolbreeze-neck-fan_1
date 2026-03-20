import { Battery, Shield, Volume2, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Zap,
    title: "Instant Cooling",
    description:
      "360° airflow engulfs your neck and shoulders in seconds for immediate relief.",
  },
  {
    icon: Shield,
    title: "Bladeless Safety",
    description:
      "Completely bladeless design — perfectly safe for children, pets, and hair.",
  },
  {
    icon: Battery,
    title: "USB Rechargeable",
    description:
      "Up to 8 hours of continuous cooling on a single USB-C charge.",
  },
  {
    icon: Volume2,
    title: "Ultra Quiet",
    description:
      "Less than 25dB operation — quieter than a whisper, even at full power.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
            Why CoolBreeze?
          </h2>
          <p className="text-brand-muted mt-3 max-w-md mx-auto">
            Engineered for comfort, designed for life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-border hover:shadow-card-hover transition-shadow group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <feature.icon className="w-6 h-6 text-brand-teal group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
