import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CartItem, OrderSummary, Product } from "../backend.d";
import { useActor } from "./useActor";

const SEED_PRODUCTS: Product[] = [
  {
    id: BigInt(1),
    name: "AeroFlow Neck Fan Pro",
    description:
      "360° bladeless cooling with ultra-quiet motor. Perfect for outdoor activities.",
    price: 49.99,
    availableColors: ["White", "Black", "Pink"],
  },
  {
    id: BigInt(2),
    name: "AeroFlow Neck Fan Lite",
    description:
      "Lightweight everyday cooling companion. USB-C rechargeable with 8h battery life.",
    price: 34.99,
    availableColors: ["White", "Black"],
  },
  {
    id: BigInt(3),
    name: "AeroFlow Sport Edition",
    description:
      "Extra powerful airflow for intense workouts and hot summer days.",
    price: 59.99,
    availableColors: ["Black", "Pink"],
  },
];

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return SEED_PRODUCTS;
      const products = await actor.getAllProducts();
      return products.length > 0 ? products : SEED_PRODUCTS;
    },
    enabled: !isFetching,
    placeholderData: SEED_PRODUCTS,
  });
}

export function useGetCart() {
  const { actor, isFetching } = useActor();
  return useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      color,
      quantity,
    }: { productId: bigint; color: string; quantity: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addToCart(productId, color, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orderSummary"] });
    },
  });
}

export function useCalculateOrderSummary(couponCode: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<OrderSummary>({
    queryKey: ["orderSummary", couponCode],
    queryFn: async () => {
      if (!actor)
        return { subtotal: 0, discount: 0, total: 0, couponCode: undefined };
      return actor.calculateOrderSummary(couponCode);
    },
    enabled: !isFetching,
  });
}

export function useValidateCoupon() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (code: string): Promise<number | null> => {
      if (!actor) throw new Error("Not connected");
      return actor.validateCoupon(code);
    },
  });
}
