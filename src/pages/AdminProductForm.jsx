import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import "./AdminProductForm.css";

function AdminProductForm({ product, onCancel, onSaved }) {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [portion, setPortion] = useState("");
  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(true);

  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");


  useEffect(() => {
    const loadCategories = async () => {
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

    loadCategories();
  }, []);

  useEffect(() => {
  if (!product) return;

  setName(product.name || "");
  setCategoryId(product.category_id || "");
  setPrice(
    product.price !== null && product.price !== undefined
      ? String(product.price)
      : ""
  );
  setDescription(product.description || "");
  setIngredients(
    Array.isArray(product.ingredients)
      ? product.ingredients.join(", ")
      : ""
  );
  setPreparationTime(product.preparation_time || "");
  setPortion(product.portion || "");
  setFeatured(product.featured ?? false);
  setAvailable(product.available ?? true);
  setImagePreview(product.image || "");
}, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const {
  data: { user: currentUser },
} = await supabase.auth.getUser();

console.log("USUÁRIO ATUAL:", currentUser);
console.log("APP METADATA:", currentUser?.app_metadata);
console.log("ROLE:", currentUser?.app_metadata?.role);

    if (!name.trim()) {
      setError("Digite o nome do produto.");
      return;
    }

     

    setLoading(true);

    let imageUrl = null;

if (imageFile) {
  const fileExtension =
    imageFile.name.split(".").pop();

  const fileName = `${crypto.randomUUID()}.${fileExtension}`;

  const filePath = `products/${fileName}`;

  const { error: uploadError } =
    await supabase.storage
      .from("product-images")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

  if (uploadError) {
    console.error(
      "Erro ao enviar imagem:",
      uploadError
    );

    setError(
      "Não foi possível enviar a imagem."
    );

    setLoading(false);
    return;
  }

  const { data: publicUrlData } =
    supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

  imageUrl = publicUrlData.publicUrl;
}

    const ingredientsArray = ingredients
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

const productData = {
  name: name.trim(),
  category_id: categoryId || null,
  price: price ? Number(price) : null,
  description: description.trim() || null,
  ingredients: ingredientsArray,
  preparation_time:
    preparationTime.trim() || null,
  portion: portion.trim() || null,
  featured,
  available,
};

let error;

if (product) {
  // EDITAR produto existente
  const updateData = {
    ...productData,
  };

  // Só altera a imagem se o administrador
  // tiver escolhido uma nova imagem
  if (imageFile) {
    updateData.image = imageUrl;
  }

  const result = await supabase
    .from("products")
    .update(updateData)
    .eq("id", product.id);

  error = result.error;
} else {
  // CRIAR novo produto
  const productId = crypto.randomUUID();

  const result = await supabase
    .from("products")
    .insert({
      id: productId,
      ...productData,
      image: imageUrl,
    });

  error = result.error;
}

    if (error) {
      console.error("Erro completo:", JSON.stringify(error, null, 2));

setError(
  error.message ||
  "Não foi possível criar o produto."
);

      setLoading(false);
      return;
    }

    setLoading(false);

    if (onSaved) {
      onSaved();
    }
  };

  

  return (
    <div className="admin-product-form">

      <div className="admin-product-form-header">

        <div>
          <span>
            {product ? "EDITAR PRODUTO" : "NOVO PRODUTO"}
          </span>

          <h2>
            {product ? "Editar produto" : "Adicionar produto"}
          </h2>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="admin-product-form-close"
        >
          ✕
        </button>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="admin-form-grid">

          <div className="admin-form-field">

            <label>
              Nome do produto *
            </label>

            <input
              type="text"
              placeholder="Ex.: Camarão Grelhado"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

          </div>

          <div className="admin-form-field">

            <label>
              Categoria
            </label>

            <select
              value={categoryId}
              onChange={(event) =>
                setCategoryId(event.target.value)
              }
              disabled={categoriesLoading}
              
            >
              <option value="">
                {categoriesLoading
                  ? "A carregar..."
                  : "Selecione uma categoria"}
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.icon} {category.name}
                </option>
              ))}
            </select>

          </div>

          <div className="admin-form-field">

            <label>
              Preço (MT) 
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Ex.: 850"
              value={price}
              onChange={(event) =>
                setPrice(event.target.value)
              }
              
            />

          </div>

          <div className="admin-form-field">

            <label>
              Porção
            </label>

            <input
              type="text"
              placeholder="Ex.: 1 pessoa"
              value={portion}
              onChange={(event) =>
                setPortion(event.target.value)
              }
            />

          </div>

          <div className="admin-form-field">

            <label>
              Tempo de preparação
            </label>

            <input
              type="text"
              placeholder="Ex.: 25 min"
              value={preparationTime}
              onChange={(event) =>
                setPreparationTime(
                  event.target.value
                )
              }
            />

          </div>

          <div className="admin-form-field">

  <label>
    Imagem do produto
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(event) => {
      const file = event.target.files?.[0];

      if (!file) return;

      setImageFile(file);

      const previewUrl =
        URL.createObjectURL(file);

      setImagePreview(previewUrl);
    }}
  />

  <small>
    Escolha uma imagem da galeria ou tire uma foto.
  </small>

  {imagePreview && (
    <div className="admin-image-preview">

      <img
        src={imagePreview}
        alt="Pré-visualização"
      />

      <button
        type="button"
        onClick={() => {
          setImageFile(null);
          setImagePreview("");
        }}
      >
        Remover imagem
      </button>

    </div>
  )}

</div>

        </div>

        <div className="admin-form-field">

          <label>
            Descrição
          </label>

          <textarea
            placeholder="Descreva o produto..."
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows="4"
          />

        </div>

        <div className="admin-form-field">

          <label>
            Ingredientes
          </label>

          <input
            type="text"
            placeholder="Ex.: Camarão, alho, limão, manteiga"
            value={ingredients}
            onChange={(event) =>
              setIngredients(event.target.value)
            }
          />

          <small>
            Separe os ingredientes por vírgulas.
          </small>

        </div>

        <div className="admin-form-options">

          <label className="admin-checkbox">

            <input
              type="checkbox"
              checked={featured}
              onChange={(event) =>
                setFeatured(event.target.checked)
              }
            />

            <span>
              ⭐ Produto em destaque
            </span>

          </label>

          <label className="admin-checkbox">

            <input
              type="checkbox"
              checked={available}
              onChange={(event) =>
                setAvailable(event.target.checked)
              }
            />

            <span>
              Produto disponível
            </span>

          </label>

        </div>

        {error && (
          <div className="admin-product-form-error">
            {error}
          </div>
        )}

        <div className="admin-product-form-actions">

          <button
            type="button"
            onClick={onCancel}
            className="admin-product-cancel"
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="admin-product-save"
            disabled={loading}
          >
            {loading
              ? "A guardar..."
              : product
                ? "Guardar alterações"
                : "Guardar produto"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AdminProductForm;