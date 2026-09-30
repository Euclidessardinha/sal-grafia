export const categories = [
  {
    id: "mariscos",
    name: "Mariscos",
    icon: "🦐",
  },
  {
    id: "peixes",
    name: "Peixes",
    icon: "🐟",
  },
  {
    id: "pratos-principais",
    name: "Pratos Principais",
    icon: "🍽️",
  },
  {
    id: "acompanhamentos",
    name: "Acompanhamentos",
    icon: "🍟",
  },
  {
    id: "bebidas",
    name: "Bebidas",
    icon: "🥤",
  },
  {
    id: "sobremesas",
    name: "Sobremesas",
    icon: "🍰",
  },
];


export const menuItems = [

  /* =========================================================
     MARISCOS
  ========================================================= */

  {
    id: "1",
    name: "Lagostim Grelhado",
    category: "mariscos",

    price: 850,

    description:
      "Lagostim fresco grelhado, preparado com ervas aromáticas e temperos especiais da casa.",

    ingredients: [
      "Lagostim fresco",
      "Ervas aromáticas",
      "Limão",
      "Alho",
      "Especiarias da casa",
    ],

    preparationTime: "20–30 min",
    portion: "1 pessoa",

    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85",

    featured: true,
    available: true,
  },


  {
    id: "2",
    name: "Camarão à Lagostim",
    category: "mariscos",

    price: 750,

    description:
      "Camarões preparados ao estilo da casa, combinando sabores frescos e um tempero especial.",

    ingredients: [
      "Camarão fresco",
      "Alho",
      "Limão",
      "Ervas aromáticas",
      "Temperos da casa",
    ],

    preparationTime: "20–25 min",
    portion: "1 pessoa",

    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85",

    featured: true,
    available: true,
  },


  {
    id: "3",
    name: "Camarão Grelhado",
    category: "mariscos",

    price: 700,

    description:
      "Camarões frescos grelhados no ponto certo, servidos com limão e temperos selecionados.",

    ingredients: [
      "Camarão fresco",
      "Limão",
      "Alho",
      "Ervas aromáticas",
    ],

    preparationTime: "20–25 min",
    portion: "1 pessoa",

    image:
      "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=1200&q=85",

    featured: false,
    available: true,
  },


  {
    id: "4",
    name: "Mix de Mariscos",
    category: "mariscos",

    price: 1200,

    description:
      "Uma seleção especial de mariscos frescos para quem deseja experimentar diferentes sabores do mar.",

    ingredients: [
      "Lagostim",
      "Camarão",
      "Mariscos selecionados",
      "Limão",
      "Ervas aromáticas",
      "Especiarias",
    ],

    preparationTime: "30–40 min",
    portion: "2 pessoas",

    image:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1200&q=85",

    featured: true,
    available: true,
  },


  /* =========================================================
     PEIXES
  ========================================================= */

  {
    id: "5",
    name: "Peixe Grelhado",
    category: "peixes",

    price: 650,

    description:
      "Peixe fresco grelhado e cuidadosamente temperado para preservar o sabor natural do mar.",

    ingredients: [
      "Peixe fresco",
      "Limão",
      "Alho",
      "Ervas aromáticas",
      "Especiarias",
    ],

    preparationTime: "25–30 min",
    portion: "1 pessoa",

    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85",

    featured: true,
    available: true,
  },


  {
    id: "6",
    name: "Peixe ao Molho de Limão",
    category: "peixes",

    price: 700,

    description:
      "Peixe fresco acompanhado por um delicado molho de limão preparado na casa.",

    ingredients: [
      "Peixe fresco",
      "Limão",
      "Manteiga",
      "Ervas aromáticas",
      "Especiarias",
    ],

    preparationTime: "25–30 min",
    portion: "1 pessoa",

    image:
      "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=1200&q=85",

    featured: false,
    available: true,
  },


  /* =========================================================
     PRATOS PRINCIPAIS
  ========================================================= */

  {
    id: "7",
    name: "Arroz de Marisco",
    category: "pratos-principais",

    price: 900,

    description:
      "Arroz cremoso preparado com uma seleção de mariscos e temperos especiais.",

    ingredients: [
      "Arroz",
      "Camarão",
      "Mariscos",
      "Tomate",
      "Ervas aromáticas",
      "Especiarias",
    ],

    preparationTime: "30–40 min",
    portion: "1 pessoa",

    image:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1200&q=85",

    featured: true,
    available: true,
  },


  {
    id: "8",
    name: "Massa com Camarão",
    category: "pratos-principais",

    price: 800,

    description:
      "Massa preparada com camarão fresco e molho especial da casa.",

    ingredients: [
      "Massa",
      "Camarão fresco",
      "Alho",
      "Molho da casa",
      "Ervas aromáticas",
    ],

    preparationTime: "25–30 min",
    portion: "1 pessoa",

    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=1200&q=85",

    featured: false,
    available: true,
  },


  /* =========================================================
     ACOMPANHAMENTOS
  ========================================================= */

  {
    id: "9",
    name: "Batata Frita",
    category: "acompanhamentos",

    price: 250,

    description:
      "Batatas cuidadosamente preparadas e fritas até ficarem douradas e crocantes.",

    ingredients: [
      "Batata",
      "Óleo vegetal",
      "Sal",
    ],

    preparationTime: "10–15 min",
    portion: "1 porção",

    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85",

    featured: false,
    available: true,
  },


  {
    id: "10",
    name: "Arroz Branco",
    category: "acompanhamentos",

    price: 200,

    description:
      "Arroz branco preparado de forma simples e leve para acompanhar os seus pratos favoritos.",

    ingredients: [
      "Arroz",
      "Água",
      "Sal",
    ],

    preparationTime: "15–20 min",
    portion: "1 porção",

    image:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1200&q=85",

    featured: false,
    available: true,
  },


  {
    id: "11",
    name: "Salada da Casa",
    category: "acompanhamentos",

    price: 250,

    description:
      "Salada fresca preparada com uma seleção de vegetais e ingredientes da casa.",

    ingredients: [
      "Alface",
      "Tomate",
      "Cenoura",
      "Pepino",
      "Molho da casa",
    ],

    preparationTime: "10 min",
    portion: "1 porção",

    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85",

    featured: false,
    available: true,
  },


  /* =========================================================
     BEBIDAS
  ========================================================= */

  {
    id: "12",
    name: "Sumo Natural",
    category: "bebidas",

    price: 200,

    description:
      "Sumo natural preparado com frutas frescas e servido bem gelado.",

    ingredients: [
      "Fruta fresca",
      "Água",
      "Gelo",
    ],

    preparationTime: "5–10 min",
    portion: "1 copo",

    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=85",

    featured: false,
    available: true,
  },


  {
    id: "13",
    name: "Água Mineral",
    category: "bebidas",

    price: 100,

    description:
      "Água mineral servida fresca.",

    ingredients: [
      "Água mineral",
    ],

    preparationTime: "Imediato",
    portion: "1 garrafa",

    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=85",

    featured: false,
    available: true,
  },


  /* =========================================================
     SOBREMESAS
  ========================================================= */

  {
    id: "14",
    name: "Cheesecake",
    category: "sobremesas",

    price: 350,

    description:
      "Cheesecake cremoso com uma combinação equilibrada de textura suave e sabor delicado.",

    ingredients: [
      "Queijo creme",
      "Biscoito",
      "Açúcar",
      "Baunilha",
    ],

    preparationTime: "5–10 min",
    portion: "1 fatia",

    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=85",

    featured: true,
    available: true,
  },


  {
    id: "15",
    name: "Fruta Tropical",
    category: "sobremesas",

    price: 250,

    description:
      "Seleção refrescante de frutas tropicais frescas.",

    ingredients: [
      "Frutas tropicais",
      "Limão",
    ],

    preparationTime: "5–10 min",
    portion: "1 porção",

    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=85",

    featured: false,
    available: true,
  },
];


/* =========================================================
   FUNÇÕES AUXILIARES
========================================================= */

export function getCategoryById(categoryId) {
  return categories.find(
    (category) => category.id === categoryId
  );
}


export function getItemsByCategory(categoryId) {
  return menuItems.filter(
    (item) =>
      item.category === categoryId &&
      item.available
  );
}


export function getFeaturedItems() {
  return menuItems.filter(
    (item) =>
      item.featured &&
      item.available
  );
}


export function getItemById(itemId) {
  return menuItems.find(
    (item) => item.id === itemId
  );
}