import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import ReviewsSection from "./components/ReviewsSection";
import ShopSection from "./components/ShopSection";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { useGetCart } from "./hooks/useQueries";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function AppContent() {
  const { data: cartItems = [] } = useGetCart();
  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  const scrollToShop = () =>
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader cartCount={cartCount} onCartClick={scrollToShop} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ShopSection />
        <ReviewsSection />
      </main>
      <SiteFooter />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
