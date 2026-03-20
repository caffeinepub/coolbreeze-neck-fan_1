import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";

const COLOR_IMAGE_MAP: Record<string, string> = {
  White: "/assets/generated/neck-fan-white.dim_600x600.png",
  Black: "/assets/generated/neck-fan-black.dim_600x600.png",
  Pink: "/assets/generated/neck-fan-pink.dim_600x600.png",
};

const COLOR_SWATCH: Record<string, string> = {
  White: "bg-gray-100 border-2",
  Black: "bg-gray-900",
  Pink: "bg-pink-300",
};

const PRODUCT_RATINGS: Record<string, { stars: number; count: number }> = {
  "1": { stars: 4.8, count: 342 },
  "2": { stars: 4.6, count: 187 },
  "3": { stars: 4.9, count: 521 },
};

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (productId: bigint, color: string) => void;
  isAdding: boolean;
}

export default function ProductCard({
  product,
  index,
  onAddToCart,
  isAdding,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors[0] ?? "White",
  );
  const rating = PRODUCT_RATINGS[product.id.toString()] ?? {
    stars: 4.7,
    count: 99,
  };
  const image = COLOR_IMAGE_MAP[selectedColor] ?? COLOR_IMAGE_MAP.White;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all group"
      data-ocid={`shop.item.${index + 1}`}
    >
      <div className="relative overflow-hidden rounded-t-2xl bg-accent p-6 flex items-center justify-center h-56">
        <img
          src={image}
          alt={`${product.name} in ${selectedColor}`}
          className="w-40 h-40 object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {product.id === BigInt(1) && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
            Best Seller
          </Badge>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-brand-navy text-base mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-brand-muted mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${
                  s <= Math.floor(rating.stars)
                    ? "fill-brand-star text-brand-star"
                    : s === Math.ceil(rating.stars) && rating.stars % 1 !== 0
                      ? "fill-brand-star/50 text-brand-star"
                      : "text-border fill-none"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-brand-muted">
            {rating.stars} ({rating.count})
          </span>
        </div>

        <div className="mb-4">
          <p className="text-xs text-brand-muted mb-2 font-medium">
            Color: <span className="text-brand-body">{selectedColor}</span>
          </p>
          <div className="flex gap-2">
            {product.availableColors.map((color) => (
              <button
                type="button"
                key={color}
                onClick={() => setSelectedColor(color)}
                title={color}
                className={`w-7 h-7 rounded-full transition-all hover:scale-110 ${COLOR_SWATCH[color] ?? "bg-gray-200"} ${
                  selectedColor === color
                    ? "ring-2 ring-primary ring-offset-2 scale-110"
                    : "ring-1 ring-border"
                }`}
                data-ocid="shop.toggle"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-extrabold text-brand-navy">
            ${product.price.toFixed(2)}
          </span>
          <Button
            type="button"
            size="sm"
            className="bg-primary hover:bg-brand-teal-dark text-white font-semibold transition-all hover:scale-105"
            onClick={() => onAddToCart(product.id, selectedColor)}
            disabled={isAdding}
            data-ocid="shop.button"
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" />
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
