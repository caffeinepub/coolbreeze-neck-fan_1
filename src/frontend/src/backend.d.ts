import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderSummary {
    couponCode?: string;
    total: number;
    discount: number;
    subtotal: number;
}
export interface CartItem {
    color: string;
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    availableColors: Array<string>;
    name: string;
    description: string;
    price: number;
}
export interface backendInterface {
    addProduct(name: string, description: string, price: number, colors: Array<string>): Promise<bigint>;
    addToCart(productId: bigint, color: string, quantity: bigint): Promise<void>;
    calculateOrderSummary(couponCode: string | null): Promise<OrderSummary>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    validateCoupon(code: string): Promise<number | null>;
}
