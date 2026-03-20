import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Wind,
  Youtube,
} from "lucide-react";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  const footerCols = [
    { title: "Company", links: ["About Us", "Blog", "Careers", "Press Kit"] },
    {
      title: "Shop",
      links: ["All Products", "Best Sellers", "New Arrivals", "Gift Cards"],
    },
    {
      title: "Help",
      links: ["FAQ", "Shipping & Returns", "Warranty", "Contact Us"],
    },
  ];

  return (
    <footer id="support" className="bg-brand-section border-t border-border">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Wind className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-brand-navy">
                CoolBreeze
              </span>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed mb-5">
              Instant personal cooling. Engineered for comfort, built for life.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="https://coolbreeze.example.com"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-brand-muted hover:text-brand-teal hover:border-primary transition-colors"
                  data-ocid="nav.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-brand-navy text-sm mb-4 uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="https://coolbreeze.example.com"
                      className="text-sm text-brand-muted hover:text-brand-teal transition-colors"
                      data-ocid="nav.link"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-10 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-brand-navy mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" /> Stay in the Breeze
              </h4>
              <p className="text-sm text-brand-muted">
                Get exclusive deals and cooling tips.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-sm md:w-64"
                data-ocid="footer.input"
              />
              <Button
                type="button"
                className="bg-primary hover:bg-brand-teal-dark text-white font-semibold"
                data-ocid="footer.submit_button"
              >
                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
          <p>
            &copy; {year}. Built with &hearts; using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-teal transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-4">
            <a
              href="https://coolbreeze.example.com"
              className="hover:text-brand-teal transition-colors"
            >
              Terms
            </a>
            <a
              href="https://coolbreeze.example.com"
              className="hover:text-brand-teal transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
