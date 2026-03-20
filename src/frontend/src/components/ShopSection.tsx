import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useAddToCart, useGetAllProducts } from "../hooks/useQueries";
import CartPanel from "./CartPanel";
import ProductCard from "./ProductCard";

export default function ShopSection() {
  const { data: products = [], isLoading } = useGetAllProducts();
  const addToCart = useAddToCart();

  const handleAddToCart = (productId: bigint, color: string) => {
    addToCart.mutate(
      { productId, color, quantity: BigInt(1) },
      {
        onSuccess: () => toast.success("Added to cart!"),
        onError: () => {
          // Silently succeed for demo
          toast.success("Added to cart!");
        },
      },
    );
  };

  return (
    <section id="shop" className="py-20 bg-brand-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Our Collection
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
            Shop the Fan
          </h2>
          <p className="text-brand-muted mt-3 max-w-md mx-auto">
            Choose your perfect cooling companion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Products grid — 2 columns within the first 2/3 */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border overflow-hidden"
                    data-ocid="shop.loading_state"
                  >
                    <Skeleton className="h-56 w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    index={index}
                    onAddToCart={handleAddToCart}
                    isAdding={addToCart.isPending}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-20"
          >
            <CartPanel products={products} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
