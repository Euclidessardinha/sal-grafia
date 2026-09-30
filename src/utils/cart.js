const CART_KEY = "lagostim_cart";

export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);

    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Erro ao carregar carrinho:", error);

    return [];
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cart)
    );

    return cart;
  } catch (error) {
    console.error("Erro ao guardar carrinho:", error);

    return cart;
  }
};

export const addToCart = (item, quantity = 1) => {
  const cart = getCart();

  const existingItem = cart.find(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity,
    });
  }

  saveCart(cart);

  return cart;
};

export const updateCartItemQuantity = (
  itemId,
  quantity
) => {
  const cart = getCart();

  const updatedCart = cart
    .map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity,
        };
      }

      return item;
    })
    .filter((item) => item.quantity > 0);

  saveCart(updatedCart);

  return updatedCart;
};

export const removeFromCart = (itemId) => {
  const cart = getCart();

  const updatedCart = cart.filter(
    (item) => item.id !== itemId
  );

  saveCart(updatedCart);

  return updatedCart;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const getCartItemCount = () => {
  const cart = getCart();

  return cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
};

export const getCartTotal = () => {
  const cart = getCart();

  return cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
};