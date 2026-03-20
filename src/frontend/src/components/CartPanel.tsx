import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import {
  useAddToCart,
  useCalculateOrderSummary,
  useGetCart,
  useValidateCoupon,
} from "../hooks/useQueries";

const COLOR_IMAGE_MAP: Record<string, string> = {
  White: "/assets/generated/neck-fan-white.dim_600x600.png",
  Black: "/assets/generated/neck-fan-black.dim_600x600.png",
  Pink: "/assets/generated/neck-fan-pink.dim_600x600.png",
};

interface CartPanelProps {
  products: Product[];
  onClose?: () => void;
}

export default function CartPanel({ products, onClose }: CartPanelProps) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponStatus, setCouponStatus] = useState<
    "idle" | "valid" | "invalid"
  >("idle");

  const { data: cartItems = [] } = useGetCart();
  const { data: orderSummary } = useCalculateOrderSummary(appliedCoupon);
  const validateCoupon = useValidateCoupon();
  const addToCart = useAddToCart();

  const getProductName = (productId: bigint) =>
    products.find((p) => p.id === productId)?.name ?? "Neck Fan";

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    try {
      const discount = await validateCoupon.mutateAsync(
        couponInput.toUpperCase(),
      );
      if (discount !== null) {
        setAppliedCoupon(couponInput.toUpperCase());
        setCouponStatus("valid");
        toast.success(`Coupon applied! ${discount}% off`);
      } else {
        setCouponStatus("invalid");
        toast.error("Invalid coupon code");
      }
    } catch {
      const localCoupons: Record<string, number> = { COOL10: 10, SUMMER20: 20 };
      const upper = couponInput.toUpperCase();
      if (localCoupons[upper] !== undefined) {
        setAppliedCoupon(upper);
        setCouponStatus("valid");
        toast.success(`Coupon applied! ${localCoupons[upper]}% off`);
      } else {
        setCouponStatus("invalid");
        toast.error("Invalid coupon code");
      }
    }
  };

  const handleQuantityChange = (
    productId: bigint,
    color: string,
    delta: number,
  ) => {
    if (delta > 0) {
      addToCart.mutate({ productId, color, quantity: BigInt(1) });
    }
  };

  const subtotal =
    orderSummary?.subtotal ??
    cartItems.reduce((sum, item) => {
      const price = products.find((p) => p.id === item.productId)?.price ?? 0;
      return sum + price * Number(item.quantity);
    }, 0);
  const discount = orderSummary?.discount ?? 0;
  const total = orderSummary?.total ?? subtotal - discount;

  return (
    <div
      className="bg-brand-cart rounded-2xl border border-border p-5 flex flex-col gap-4 h-fit"
      data-ocid="cart.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-brand-navy text-lg flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Your Cart
          {cartItems.length > 0 && (
            <span className="text-sm font-normal text-brand-muted">
              ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
            </span>
          )}
        </h2>
        {onClose && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-brand-muted hover:text-brand-navy"
            data-ocid="cart.close_button"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      <AnimatePresence mode="popLayout">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag className="w-12 h-12 text-border mx-auto mb-3" />
            <p className="text-brand-muted text-sm">Your cart is empty.</p>
            <p className="text-xs text-brand-muted mt-1">
              Add a fan to get started!
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {cartItems.map((item, idx) => (
              <motion.div
                key={`${item.productId}-${item.color}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 bg-white rounded-xl p-3 border border-border"
                data-ocid={`cart.item.${idx + 1}`}
              >
                <img
                  src={COLOR_IMAGE_MAP[item.color] ?? COLOR_IMAGE_MAP.White}
                  alt={item.color}
                  className="w-12 h-12 object-contain rounded-lg bg-accent p-1"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-brand-navy truncate">
                    {getProductName(item.productId)}
                  </p>
                  <p className="text-xs text-brand-muted">{item.color}</p>
                </div>
                <div
                  className="flex items-center gap-1.5"
                  data-ocid="cart.toggle"
                >
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-brand-muted hover:text-brand-teal hover:border-primary transition-colors"
                    onClick={() =>
                      handleQuantityChange(item.productId, item.color, -1)
                    }
                    data-ocid="cart.secondary_button"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-brand-navy">
                    {Number(item.quantity)}
                  </span>
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-brand-muted hover:text-brand-teal hover:border-primary transition-colors"
                    onClick={() =>
                      handleQuantityChange(item.productId, item.color, 1)
                    }
                    data-ocid="cart.secondary_button"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <Separator />

      {/* Coupon code */}
      <div>
        <p className="text-xs font-semibold text-brand-navy mb-2 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-primary" /> Coupon Code
          <span className="font-normal text-brand-muted">
            Try: COOL10 or SUMMER20
          </span>
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Enter code"
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value);
                setCouponStatus("idle");
              }}
              className={`text-sm ${
                couponStatus === "valid"
                  ? "border-green-500 focus-visible:ring-green-500"
                  : couponStatus === "invalid"
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
              }`}
              onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
              data-ocid="cart.input"
            />
            {couponStatus === "valid" && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
            {couponStatus === "invalid" && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleApplyCoupon}
            disabled={validateCoupon.isPending}
            className="border-primary text-primary hover:bg-primary hover:text-white font-semibold"
            data-ocid="cart.submit_button"
          >
            Apply
          </Button>
        </div>
      </div>

      <Separator />

      {/* Order summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-brand-body">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({appliedCoupon})</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between text-brand-navy font-bold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        type="button"
        className="w-full bg-primary hover:bg-brand-teal-dark text-white font-bold text-sm h-11 transition-all hover:scale-[1.02] shadow-md"
        onClick={() =>
          toast.success("Order placed! 🎉 Your CoolBreeze is on its way.")
        }
        data-ocid="cart.primary_button"
      >
        CHECKOUT NOW
      </Button>

      <button
        type="button"
        className="text-center text-xs text-brand-muted hover:text-brand-teal transition-colors underline-offset-2 hover:underline"
        onClick={() =>
          document
            .getElementById("shop")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        data-ocid="cart.link"
      >
        ← Continue Shopping
      </button>
    </div>
  );
}
