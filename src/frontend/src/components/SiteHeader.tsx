import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User, Wind } from "lucide-react";

interface SiteHeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function SiteHeader({
  cartCount,
  onCartClick,
}: SiteHeaderProps) {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Shop", href: "#shop" },
    { label: "Features", href: "#features" },
    { label: "Reviews", href: "#reviews" },
    { label: "Support", href: "#support" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
            <Wind className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-brand-navy tracking-tight">
            CoolBreeze
          </span>
        </a>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-body hover:text-brand-teal transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Utility icons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-brand-body hover:text-brand-teal"
            data-ocid="nav.button"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-brand-body hover:text-brand-teal"
            data-ocid="nav.button"
          >
            <User className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-brand-body hover:text-brand-teal"
            onClick={onCartClick}
            data-ocid="cart.open_modal_button"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                {cartCount}
              </Badge>
            )}
          </Button>
          <span className="hidden sm:block text-xs text-brand-muted ml-1">
            ({cartCount})
          </span>
        </div>
      </div>
    </header>
  );
}
