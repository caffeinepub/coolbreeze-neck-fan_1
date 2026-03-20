import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    availableColors : [Text];
  };

  type CartItem = {
    productId : Nat;
    color : Text;
    quantity : Nat;
  };

  type OrderSummary = {
    subtotal : Float;
    discount : Float;
    total : Float;
    couponCode : ?Text;
  };

  // Persistent product catalog
  let productsCatalog = Map.empty<Nat, Product>();
  var nextProductId = 1;

  module CustomerCarts {
    public type Customer = Principal;
    public type Cart = [CartItem];
  };

  let customerCarts = Map.empty<Principal, [CartItem]>();

  // Persistent coupon codes
  let coupons = Map.fromIter([("SUMMER20", 20.0), ("FAN10", 10.0), ("WELCOME5", 5.0)].values().enumerate().map(func(i, (code, discount)) { (code, discount) }));

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Float, colors : [Text]) : async Nat {
    let productId = nextProductId;
    let product : Product = {
      id = productId;
      name;
      description;
      price;
      availableColors = colors;
    };

    productsCatalog.add(productId, product);
    nextProductId += 1;
    productId;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    productsCatalog.values().toArray();
  };

  public query ({ caller }) func validateCoupon(code : Text) : async ?Float {
    coupons.get(code);
  };

  public shared ({ caller }) func addToCart(productId : Nat, color : Text, quantity : Nat) : async () {
    let product = switch (productsCatalog.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };

    // Fix: Use values().any to check for color existence
    if (not product.availableColors.values().any(func(c) { c == color })) {
      Runtime.trap("Selected color not available for this product");
    };

    let currentCart = switch (customerCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };

    let updatedCart = currentCart.concat([{
      productId;
      color;
      quantity;
    }]);

    customerCarts.add(caller, updatedCart);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (customerCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  public query ({ caller }) func calculateOrderSummary(couponCode : ?Text) : async OrderSummary {
    let cart = switch (customerCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };

    let subtotal = cart.foldLeft(0.0, func(acc, item) {
      let product = switch (productsCatalog.get(item.productId)) {
        case (null) { Runtime.trap("Product not found in cart") };
        case (?product) { product };
      };
      acc + (product.price * item.quantity.toFloat());
    });

    let discountPercent = switch (couponCode) {
      case (null) { 0.0 };
      case (?code) {
        switch (coupons.get(code)) {
          case (null) { 0.0 };
          case (?discount) { discount };
        };
      };
    };

    let discount = subtotal * (discountPercent / 100.0);
    let total = subtotal - discount;

    {
      subtotal;
      discount;
      total;
      couponCode;
    };
  };
};
