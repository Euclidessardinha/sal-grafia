
import { useState } from "react";
import { addToCart } from "../utils/cart";

import "./DishDetails.css";

function DishDetails() {
  const [quantity, setQuantity] = useState(1);

  const pathParts = window.location.pathname
    .split("/")
    .filter(Boolean);

  const itemId = pathParts[pathParts.length - 1];

  /*
   * AMOSTRA VISUAL
   *
   * Nesta fase não estamos a mexer no Supabase.
   */
  const menuItems = [
    {
      id: "benedict",
      category: "Ovos / Eggs",
      name: "Benedict",
      price: 700,
      description:
        "Pão branco ou escuro torrado, abacate, ovos escalfados, bacon ou salmão, molho hollandaise.",
      image:
        "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1200&q=85",
      featured: true,
      available: true,
    },

    {
      id: "fruit-plate",
      category: "Pequeno-Almoço Saudável",
      name: "Prato de Fruta / Fruit Plate",
      price: 300,
      description: "",
      image:
        "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=85",
      featured: false,
      available: true,
    },

    {
      id: "pancakes-nutella",
      category: "Pão e Panquecas",
      name:
        "Panquecas com Nutella ou Mel / Pancakes with Nutella or Honey",
      price: 350,
      description: "",
      image:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=85",
      featured: true,
      available: true,
    },

    {
      id: "croissant-salmao",
      category: "Pão e Panquecas",
      name:
        "Croissant Folhado com Salmão Fumado / French Croissant with Smoked Salmon",
      price: 450,
      description: "",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85",
      featured: false,
      available: true,
    },

    {
      id: "laranja",
      category: "Sumos Naturais",
      name: "Laranja / Orange",
      price: 300,
      description: "",
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=85",
      featured: false,
      available: true,
    },

    {
      id: "cappuccino",
      category: "Café / Coffee",
      name: "Cappuccino",
      price: 200,
      description: "",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=85",
      featured: true,
      available: true,
    },

    {
      id: "cha-salgrafia",
      category: "Chá / Tea",
      name: "Chá Sal&G rafia / Sal & Grafia Tea",
      price: 200,
      description: "",
      image:
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=85",
      featured: false,
      available: true,
    },
  ];

  /*
   * ENCONTRAR O PRATO PELO ID DA URL
   */
  const item = menuItems.find(
    (menuItem) => menuItem.id === itemId
  );

  const formatPrice = (price) => {
    return `${Number(price).toLocaleString("pt-MZ")} MZN`;
  };

  const handleIncrease = () => {
    setQuantity((current) => current + 1);
  };

  const handleDecrease = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const handleAddToCart = () => {
    if (!item) {
      return;
    }

    addToCart(item, quantity);

    window.location.href = "/cart";
  };

  /*
   * PRATO NÃO ENCONTRADO
   */
  if (!item) {
    return (
      <div className="dish-details-page">
        <div className="dish-not-found">

          <span className="dish-not-found-icon">
            🍽️
          </span>

          <h1>Prato não encontrado</h1>

          <p>
            O prato que você está procurando não está
            disponível neste momento.
          </p>

          <a
            href="/menu"
            className="dish-back-button"
          >
            ← Voltar ao menu
          </a>

        </div>
      </div>
    );
  }

  return (
    <div className="dish-details-page">

      {/* HEADER */}
      <header className="dish-details-header">

        <a
          href="/"
          className="dish-details-brand"
        >
          <img
            src="/logo-sal-grafia.png"
            alt="Sal & Grafia"
          />

          <span>
            <strong>Sal & Grafia</strong>

            <small>
              Gastronomia • Cultura • Arte
            </small>
          </span>
        </a>

        <a
          href="/menu"
          className="dish-header-menu"
        >
          Ver menu
        </a>

      </header>

      {/* CONTEÚDO */}
      <main className="dish-details-main">

        <a
          href="/menu"
          className="dish-back-link"
        >
          ← Voltar ao menu
        </a>

        <div className="dish-details-container">

          {/* IMAGEM */}
          <div className="dish-details-image-wrapper">

            <img
              src={item.image}
              alt={item.name}
              className="dish-details-image"
            />

            {item.featured && (
              <span className="dish-details-featured">
                ⭐ Destaque
              </span>
            )}

          </div>

          {/* INFORMAÇÕES */}
          <div className="dish-details-info">

            <span className="dish-details-category">
              {item.category}
            </span>

            <h1>
              {item.name}
            </h1>

            <div className="dish-details-price">
              {formatPrice(item.price)}
            </div>

            {item.description && (
              <div className="dish-about">

                <h2>
                  Sobre este prato
                </h2>

                <p>
                  {item.description}
                </p>

              </div>
            )}

            {item.available && (
              <div className="dish-order-area">

                {/* QUANTIDADE */}
                <div className="dish-quantity">

                  <span>
                    Quantidade
                  </span>

                  <div className="quantity-control">

                    <button
                      type="button"
                      onClick={handleDecrease}
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>

                    <strong>
                      {quantity}
                    </strong>

                    <button
                      type="button"
                      onClick={handleIncrease}
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* ADICIONAR AO PEDIDO */}
                <button
                  type="button"
                  className="dish-whatsapp-button"
                  onClick={handleAddToCart}
                >

                  <span className="whatsapp-icon">
                    🛒
                  </span>

                  <span className="dish-order-text">

                    <small>
                      FAÇA O SEU PEDIDO
                    </small>

                    <strong>
                      Adicionar ao pedido
                    </strong>

                  </span>

                  <span className="whatsapp-arrow">
                    →
                  </span>

                </button>

              </div>
            )}

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="dish-details-footer">

        <div>

          <strong>
            SAL & GRAFIA
          </strong>

          <span>
            Gastronomia • Cultura • Arte
          </span>

        </div>

        <a href="/menu">
          Ver menu completo →
        </a>

      </footer>

    </div>
  );
}

export default DishDetails;

