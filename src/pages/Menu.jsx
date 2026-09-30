
import { useEffect, useMemo, useState } from "react";
import { addToCart, getCart } from "../utils/cart";
import "./Menu.css";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [addedItemId, setAddedItemId] = useState(null);
  const [showCartNotice, setShowCartNotice] = useState(false);

  /*
   * AMOSTRA VISUAL
   *
   * Nesta fase não estamos a mexer no Supabase.
   * Estes dados servem apenas para visualizar o novo menu.
   */
  const categories = [
    {
      id: "ovos",
      name: "Ovos / Eggs",
      icon: "🍳",
    },
    {
      id: "pequeno-almoco",
      name: "Pequeno-Almoço Saudável",
      icon: "🥑",
    },
    {
      id: "pao-panquecas",
      name: "Pão e Panquecas",
      icon: "🥞",
    },
    {
      id: "pastelaria",
      name: "Pastelaria",
      icon: "🥐",
    },
    {
      id: "sumos",
      name: "Sumos Naturais",
      icon: "🍊",
    },
    {
      id: "cafe",
      name: "Café / Coffee",
      icon: "☕",
    },
    {
      id: "cha",
      name: "Chá / Tea",
      icon: "🍵",
    },
    {
      id: "tapas",
      name: "Tapas",
      icon: "🍽️",
    },
    {
      id: "refeicoes",
      name: "Refeições Ligeiras",
      icon: "🥗",
    },
    {
      id: "saladas",
      name: "Saladas",
      icon: "🥬",
    },
    {
      id: "vegetarianos",
      name: "Vegetarianos",
      icon: "🌿",
    },
  ];

  /*
   * ALGUNS PRATOS REAIS PARA A AMOSTRA
   *
   * Os nomes e preços são os fornecidos para o menu
   * Sal & Grafia.
   */
  const menuItems = [
    {
      id: "benedict",
      category_id: "ovos",
      name: "Benedict",
      price: 700,
      description:
        "Pão branco ou escuro torrado, abacate, ovos escalfados, bacon ou salmão, molho hollandaise.",
      image:
        "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=85",
      available: true,
      featured: true,
    },

    {
      id: "fruit-plate",
      category_id: "pequeno-almoco",
      name: "Prato de Fruta / Fruit Plate",
      price: 300,
      description: "",
      image:
        "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=85",
      available: true,
      featured: false,
    },

    {
      id: "pancakes-nutella",
      category_id: "pao-panquecas",
      name: "Panquecas com Nutella ou Mel / Pancakes with Nutella or Honey",
      price: 350,
      description: "",
      image:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85",
      available: true,
      featured: true,
    },

    {
      id: "croissant-salmao",
      category_id: "pao-panquecas",
      name:
        "Croissant Folhado com Salmão Fumado / French Croissant with Smoked Salmon",
      price: 450,
      description: "",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85",
      available: true,
      featured: false,
    },

    {
      id: "laranja",
      category_id: "sumos",
      name: "Laranja / Orange",
      price: 300,
      description: "",
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=85",
      available: true,
      featured: false,
    },

    {
      id: "cappuccino",
      category_id: "cafe",
      name: "Cappuccino",
      price: 200,
      description: "",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=85",
      available: true,
      featured: true,
    },

    {
      id: "cha-salgrafia",
      category_id: "cha",
      name: "Chá Sal&G rafia / Sal & Grafia Tea",
      price: 200,
      description: "",
      image:
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85",
      available: true,
      featured: false,
    },
  ];

  /*
   * CARRINHO
   */
  useEffect(() => {
    const cart = getCart();

    const count = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(count);
  }, []);

  /*
   * WHATSAPP
   */
  const whatsappNumber = "258871538162";

  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de fazer um pedido no Sal & Grafia."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  /*
   * PREÇO
   */
  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "Preço não definido";
    }

    return `${Number(price).toLocaleString("pt-MZ")} MZN`;
  };

  /*
   * ADICIONAR AO CARRINHO
   */
  const handleAddToCart = (item) => {
    if (!item.available) {
      return;
    }

    const updatedCart = addToCart(item, 1);

    const count = updatedCart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(count);

    setAddedItemId(item.id);
    setShowCartNotice(true);

    setTimeout(() => {
      setAddedItemId(null);
    }, 1500);
  };

  /*
   * NOME DA CATEGORIA
   */
  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (category) => category.id === categoryId
    );

    return category?.name || "Menu";
  };

  /*
   * FILTRO
   */
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "todos" ||
        item.category_id === activeCategory;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        item.name.toLowerCase().includes(searchText) ||
        (item.description || "")
          .toLowerCase()
          .includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="menu-page">

      {/* HEADER */}
      <header className="menu-header">
        <a href="/" className="menu-brand">
          <img
            src="/logo-sal-grafia.png"
            alt="Sal & Grafia"
          />

          <div className="menu-brand-text">
            <strong>Sal & Grafia</strong>
            <span>Gastronomia • Cultura • Arte</span>
          </div>
        </a>

        <div className="menu-header-actions">
          <a
            href="/cart"
            className="menu-header-cart"
          >
            <span className="menu-header-cart-icon">
              🛒
            </span>

            <span>Carrinho</span>

            {cartCount > 0 && (
              <strong>{cartCount}</strong>
            )}
          </a>

          <a
            href={whatsappUrl}
            className="menu-header-whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* AVISO DO CARRINHO */}
      {showCartNotice && cartCount > 0 && (
        <div className="menu-cart-notice">
          <div className="menu-cart-notice-content">
            <span className="menu-cart-notice-icon">
              ✓
            </span>

            <div>
              <strong>Pedido atualizado</strong>

              <span>
                {cartCount}{" "}
                {cartCount === 1
                  ? "item"
                  : "itens"}{" "}
                no carrinho
              </span>
            </div>
          </div>

          <a
            href="/cart"
            className="menu-cart-notice-button"
          >
            Ver carrinho
            <span>→</span>
          </a>
        </div>
      )}

      {/* HERO */}
      <section className="menu-intro">
        <div className="menu-intro-overlay"></div>

        <div className="menu-intro-content">
          <span className="menu-intro-label">
            SAL & GRAFIA
          </span>

          <h1>
            O nosso <span>Menu</span>
          </h1>

          <p>
            Sabores, encontros e experiências
            à mesa.
          </p>
        </div>

        <div className="menu-intro-badge">
          <span>✦</span>

          <strong>
            Gastronomia • Cultura • Arte
          </strong>
        </div>
      </section>

      {/* CONTEÚDO */}
      <main className="menu-content">

        {/* PESQUISA */}
        <div className="menu-search-wrapper">
          <span className="menu-search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Pesquisar no menu..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              className="menu-search-clear"
              onClick={() => setSearch("")}
              aria-label="Limpar pesquisa"
            >
              ×
            </button>
          )}
        </div>

        {/* CATEGORIAS */}
        <section className="menu-category-section">

          <div className="menu-category-heading">
            <div>
              <span>EXPLORE</span>

              <h2>
                Escolha uma categoria
              </h2>
            </div>

            <p>
              Descubra o que temos para si
            </p>
          </div>

          <div className="menu-categories">

            {/* TODOS */}
            <button
              type="button"
              className={`category-card ${
                activeCategory === "todos"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory("todos")
              }
            >
              <span className="category-card-icon">
                ✦
              </span>

              <span className="category-card-text">
                <strong>Todos</strong>
                <small>Ver todo o menu</small>
              </span>

              <span className="category-card-arrow">
                →
              </span>
            </button>

            {/* CATEGORIAS */}
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={`category-card ${
                  activeCategory === category.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveCategory(category.id)
                }
              >
                <span className="category-card-icon">
                  {category.icon}
                </span>

                <span className="category-card-text">
                  <strong>
                    {category.name}
                  </strong>

                  <small>
                    Explorar
                  </small>
                </span>

                <span className="category-card-arrow">
                  →
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* RESULTADOS */}
        <div className="menu-results-header">
          <div>
            <span>MENU</span>

            <h2>
              {activeCategory === "todos"
                ? "Todos"
                : getCategoryName(activeCategory)}
            </h2>
          </div>

          <p>
            {filteredItems.length}{" "}
            {filteredItems.length === 1
              ? "opção"
              : "opções"}
          </p>
        </div>

        {/* PRATOS */}
        {filteredItems.length > 0 ? (
          <div className="menu-grid">

            {filteredItems.map((item) => (
              <article
                className={`menu-dish-card ${
                  !item.available
                    ? "unavailable"
                    : ""
                }`}
                key={item.id}
              >

                {/* IMAGEM */}
                <a
                  href={`/menu/${item.id}`}
                  className="menu-dish-image"
                  aria-label={`Ver detalhes de ${item.name}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  {item.featured && (
                    <span className="menu-dish-featured">
                      Destaque
                    </span>
                  )}

                  {!item.available && (
                    <span className="menu-dish-unavailable">
                      Indisponível
                    </span>
                  )}

                  {item.available && (
                    <button
                      type="button"
                      className={`menu-dish-add ${
                        addedItemId === item.id
                          ? "added"
                          : ""
                      }`}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleAddToCart(item);
                      }}
                      aria-label={`Adicionar ${item.name} ao pedido`}
                    >
                      {addedItemId === item.id
                        ? "✓"
                        : "+"}
                    </button>
                  )}

                  {addedItemId === item.id && (
                    <span className="menu-dish-added-message">
                      Adicionado ao pedido
                    </span>
                  )}
                </a>

                {/* INFORMAÇÕES */}
                <div className="menu-dish-info">

                  <span className="menu-dish-category">
                    {getCategoryName(
                      item.category_id
                    )}
                  </span>

                  <h3>{item.name}</h3>

                  {item.description && (
                    <p>
                      {item.description}
                    </p>
                  )}

                  <div className="menu-dish-bottom">

                    <strong>
                      {formatPrice(item.price)}
                    </strong>

                    <a
                      href={`/menu/${item.id}`}
                      className="menu-view-button"
                    >
                      Ver detalhe
                      <span>→</span>
                    </a>

                  </div>
                </div>
              </article>
            ))}

          </div>
        ) : (
          <div className="menu-empty">

            <span className="menu-empty-icon">
              ✦
            </span>

            <h3>
              Nenhuma opção encontrada
            </h3>

            <p>
              Tente pesquisar por outro nome
              ou selecionar outra categoria.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("todos");
              }}
            >
              Ver todo o menu
            </button>

          </div>
        )}
      </main>

      {/* WHATSAPP */}
      <section className="menu-whatsapp-section">
        <div>
          <span>
            FAÇA O SEU PEDIDO
          </span>

          <h2>
            Encontrou o que procura?
          </h2>

          <p>
            Entre em contacto connosco pelo
            WhatsApp para fazer o seu pedido.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          Pedir pelo WhatsApp
          <span>→</span>
        </a>
      </section>

      {/* FOOTER */}
      <footer className="menu-footer">

        <div>
          <strong>
            SAL & GRAFIA
          </strong>

          <span>
            Gastronomia • Cultura • Arte
          </span>
        </div>

        <a href="/">
          ← Página inicial
        </a>

      </footer>

    </div>
  );
}

export default Menu;

