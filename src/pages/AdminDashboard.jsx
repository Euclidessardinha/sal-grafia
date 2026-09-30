import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminProductForm from "./AdminProductForm";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  const [error, setError] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categorySaving, setCategorySaving] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("ADMIN USUÁRIO:", user);
      console.log(
        "ADMIN APP METADATA:",
        user?.app_metadata
      );
      console.log(
        "ADMIN ROLE:",
        user?.app_metadata?.role
      );

      if (!user) {
        window.location.href = "/admin/login";
        return;
      }

      const role = user.app_metadata?.role;

      if (role !== "admin") {
        await supabase.auth.signOut();
        window.location.href = "/admin/login";
        return;
      }

      setUser(user);
      setLoading(false);

      loadProducts();
      loadCategories();
    };

    checkAdmin();
  }, []);

  const loadProducts = async () => {
    setProductsLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name");

    if (error) {
      console.error(
        "Erro ao carregar produtos:",
        error
      );

      setError(
        "Não foi possível carregar os produtos."
      );

      setProductsLoading(false);
      return;
    }

    setProducts(data || []);
    setProductsLoading(false);
  };

  const loadCategories = async () => {
    setCategoriesLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error(
        "Erro ao carregar categorias:",
        error
      );

      setError(
        "Não foi possível carregar as categorias."
      );

      setCategoriesLoading(false);
      return;
    }

    setCategories(data || []);
    setCategoriesLoading(false);
  };

  const handleSaveCategory = async (event) => {
    event.preventDefault();

    setError("");

    if (!categoryName.trim()) {
      setError("Digite o nome da categoria.");
      return;
    }

    setCategorySaving(true);

    let error;

    if (editingCategory) {
      // EDITAR CATEGORIA
      const result = await supabase
        .from("categories")
        .update({
          name: categoryName.trim(),
          icon: categoryIcon.trim() || "🍽️",
        })
        .eq("id", editingCategory.id);

      error = result.error;
    } else {
      // CRIAR CATEGORIA
      const result = await supabase
        .from("categories")
        .insert({
          id: crypto.randomUUID(),
          name: categoryName.trim(),
          icon: categoryIcon.trim() || "🍽️",
        });

      error = result.error;
    }

    if (error) {
      console.error(
        "Erro ao guardar categoria:",
        error
      );

      setError(
        error.message ||
          "Não foi possível guardar a categoria."
      );

      setCategorySaving(false);
      return;
    }

    // Limpar formulário
    setCategoryName("");
    setCategoryIcon("");

    // Limpar categoria em edição
    setEditingCategory(null);

    // Fechar formulário
    setShowCategoryForm(false);

    // Atualizar lista
    await loadCategories();

    setCategorySaving(false);
  };

  const handleDeleteCategory = async (category) => {
  setError("");

  try {
    // Verificar se existem produtos associados à categoria
    const {
      data: productsInCategory,
      error: productsCheckError,
    } = await supabase
      .from("products")
      .select("id")
      .eq("category_id", category.id);

    if (productsCheckError) {
      console.error(
        "Erro ao verificar produtos da categoria:",
        productsCheckError
      );

      setError(
        "Não foi possível verificar os produtos desta categoria."
      );

      return;
    }

    // Se existirem produtos, impedir eliminação
    if (
      productsInCategory &&
      productsInCategory.length > 0
    ) {
      setError(
        `Não é possível eliminar "${category.name}" porque existem ${productsInCategory.length} produto(s) associado(s) a esta categoria. Altere a categoria desses produtos antes de eliminá-la.`
      );

      return;
    }

    // Confirmar eliminação
    const confirmed = window.confirm(
      `Tem certeza que deseja eliminar a categoria "${category.name}"?`
    );

    if (!confirmed) {
      return;
    }

    // Eliminar categoria
    const { error: deleteCategoryError } =
      await supabase
        .from("categories")
        .delete()
        .eq("id", category.id);

    if (deleteCategoryError) {
      console.error(
        "Erro ao eliminar categoria:",
        deleteCategoryError
      );

      setError(
        deleteCategoryError.message ||
          "Não foi possível eliminar a categoria."
      );

      return;
    }

    // Atualizar lista de categorias
    await loadCategories();

  } catch (error) {
    console.error(
      "Erro inesperado ao eliminar categoria:",
      error
    );

    setError(
      "Ocorreu um erro ao eliminar a categoria."
    );
  }
};

  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/admin/login";
  };

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <p>A carregar painel...</p>
      </div>
    );
  }

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja eliminar "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      // 1. Eliminar o produto da tabela
      const { error: deleteProductError } =
        await supabase
          .from("products")
          .delete()
          .eq("id", product.id);

      if (deleteProductError) {
        console.error(
          "Erro ao eliminar produto:",
          deleteProductError
        );

        setError(
          "Não foi possível eliminar o produto."
        );

        return;
      }

      // 2. Se o produto tiver imagem, eliminar do Storage
      if (product.image) {
        const marker = "/product-images/";

        const imagePathIndex =
          product.image.indexOf(marker);

        if (imagePathIndex !== -1) {
          const imagePath =
            product.image.substring(
              imagePathIndex + marker.length
            );

          const { error: deleteImageError } =
            await supabase.storage
              .from("product-images")
              .remove([imagePath]);

          if (deleteImageError) {
            console.error(
              "Produto eliminado, mas não foi possível eliminar a imagem:",
              deleteImageError
            );
          }
        }
      }

      // 3. Atualizar a lista
      await loadProducts();
    } catch (error) {
      console.error(
        "Erro inesperado ao eliminar produto:",
        error
      );

      setError(
        "Ocorreu um erro ao eliminar o produto."
      );
    }
  };

  return (
    <div className="admin-dashboard-page">

      <header className="admin-dashboard-header">

        <a
          href="/"
          className="admin-dashboard-brand"
        >
          <img
            src="/logo-lagostim.png"
            alt="Lagostim de MZ"
          />

          <div>
            <strong>
              Lagostim de MZ
            </strong>

            <span>
              Administração
            </span>
          </div>
        </a>

        <button
          type="button"
          onClick={handleLogout}
          className="admin-logout-button"
        >
          Sair
        </button>

      </header>

      <main className="admin-dashboard-main">

        <div className="admin-dashboard-welcome">

          <span>
            PAINEL ADMINISTRATIVO
          </span>

          <h1>
            Gestão do Menu
          </h1>

          <p>
            Bem-vindo,{" "}
            <strong>{user.email}</strong>
          </p>

        </div>

        {/* =====================================================
            CATEGORIAS
        ===================================================== */}

        <section className="admin-categories-section">

          <div className="admin-categories-heading">

            <div>
              <span>
                MENU
              </span>

              <h2>
                Categorias
              </h2>
            </div>

            <button
              type="button"
              className="admin-add-category-button"
              onClick={() => {
                setEditingCategory(null);
                setCategoryName("");
                setCategoryIcon("");
                setShowCategoryForm(true);
                setError("");
              }}
            >
              + Adicionar categoria
            </button>

          </div>

          {showCategoryForm && (
            <form
              className="admin-category-form"
              onSubmit={handleSaveCategory}
            >

              <div className="admin-category-form-header">

                <div>
                  <span>
                    {editingCategory
                      ? "EDITAR CATEGORIA"
                      : "NOVA CATEGORIA"}
                  </span>

                  <h3>
                    {editingCategory
                      ? "Editar categoria"
                      : "Adicionar categoria"}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryForm(false);
                    setEditingCategory(null);
                    setCategoryName("");
                    setCategoryIcon("");
                    setError("");
                  }}
                  className="admin-category-form-close"
                >
                  ✕
                </button>

              </div>

              <div className="admin-category-form-grid">

                <div className="admin-form-field">

                  <label>
                    Nome da categoria *
                  </label>

                  <input
                    type="text"
                    placeholder="Ex.: Hambúrgueres"
                    value={categoryName}
                    onChange={(event) =>
                      setCategoryName(
                        event.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="admin-form-field">

                  <label>
                    Ícone
                  </label>

                  <input
                    type="text"
                    placeholder="Ex.: 🍔"
                    value={categoryIcon}
                    onChange={(event) =>
                      setCategoryIcon(
                        event.target.value
                      )
                    }
                    maxLength={10}
                  />

                  <small>
                    Pode usar um emoji, por exemplo:
                    🍔 🍕 🥤 🍰
                  </small>

                </div>

              </div>

              {error && (
                <div className="admin-product-form-error">
                  {error}
                </div>
              )}

              <div className="admin-category-form-actions">

                <button
                  type="button"
                  className="admin-product-cancel"
                  onClick={() => {
                    setShowCategoryForm(false);
                    setEditingCategory(null);
                    setCategoryName("");
                    setCategoryIcon("");
                    setError("");
                  }}
                  disabled={categorySaving}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="admin-product-save"
                  disabled={categorySaving}
                >
                  {categorySaving
                    ? "A guardar..."
                    : editingCategory
                    ? "Guardar alterações"
                    : "Guardar categoria"}
                </button>

              </div>

            </form>
          )}

          {categoriesLoading ? (
            <div className="admin-categories-loading">
              <p>
                A carregar categorias...
              </p>
            </div>
          ) : categories.length === 0 ? (
            <div className="admin-categories-empty">

              <span>
                📂
              </span>

              <h3>
                Nenhuma categoria encontrada
              </h3>

            </div>
          ) : (
            <div className="admin-categories-list">

              {categories.map((category) => (
                <div
                  key={category.id}
                  className="admin-category-item"
                >

                  <div className="admin-category-info">

                    <span className="admin-category-icon">
                      {category.icon}
                    </span>

                    <strong>
                      {category.name}
                    </strong>

                  </div>

                  <div className="admin-category-actions">

                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategory(category);
                        setCategoryName(
                          category.name || ""
                        );
                        setCategoryIcon(
                          category.icon || ""
                        );
                        setShowCategoryForm(true);
                        setError("");
                      }}
                    >
                      Editar
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            handleDeleteCategory(category)
                        }
                    >
                     Eliminar
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

        {/* =====================================================
            PRODUTOS
        ===================================================== */}

        <section className="admin-products-section">

          <div className="admin-products-heading">

            <div>
              <span>
                MENU
              </span>

              <h2>
                Produtos
              </h2>
            </div>

            <button
              type="button"
              className="admin-add-product-button"
              onClick={() => {
                setEditingProduct(null);
                setShowProductForm(true);
              }}
            >
              + Adicionar produto
            </button>

          </div>

          {showProductForm && (
            <AdminProductForm
              product={editingProduct}
              onCancel={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
              onSaved={() => {
                setShowProductForm(false);
                setEditingProduct(null);
                loadProducts();
              }}
            />
          )}

          {productsLoading ? (
            <div className="admin-products-loading">
              <p>
                A carregar produtos...
              </p>
            </div>
          ) : error ? (
            <div className="admin-products-error">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="admin-products-empty">

              <span>
                🍽️
              </span>

              <h3>
                Nenhum produto encontrado
              </h3>

            </div>
          ) : (
            <div className="admin-products-table-wrapper">

              <table className="admin-products-table">

                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Categoria</th>
                    <th>Status</th>
                    <th>Destaque</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>

                  {products.map((product) => (
                    <tr key={product.id}>

                      <td>
                        <div className="admin-product-name">

                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                            />
                          )}

                          <strong>
                            {product.name}
                          </strong>

                        </div>
                      </td>

                      <td>
                        {Number(
                          product.price
                        ).toLocaleString("pt-MZ")}{" "}
                        MT
                      </td>

                      <td>
                        {categories.find(
                          (category) =>
                            category.id ===
                            product.category_id
                        ) ? (
                          <>
                            {
                              categories.find(
                                (category) =>
                                  category.id ===
                                  product.category_id
                              ).icon
                            }{" "}
                            {
                              categories.find(
                                (category) =>
                                  category.id ===
                                  product.category_id
                              ).name
                            }
                          </>
                        ) : (
                          "Sem categoria"
                        )}
                      </td>

                      <td>
                        <span
                          className={
                            product.available
                              ? "admin-status available"
                              : "admin-status unavailable"
                          }
                        >
                          {product.available
                            ? "Disponível"
                            : "Indisponível"}
                        </span>
                      </td>

                      <td>
                        {product.featured
                          ? "⭐ Sim"
                          : "Não"}
                      </td>

                      <td>
                        <div className="admin-product-actions">

                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(
                                product
                              );
                              setShowProductForm(
                                true
                              );
                            }}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteProduct(
                                product
                              )
                            }
                          >
                            Eliminar
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;