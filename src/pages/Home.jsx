import { useState } from "react";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

import "../styles/Home.css";

function Home() {
  const { produtos, loading, erro } = useProducts();

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("todos");

  const categorias = [
    "todos",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const produtosFiltrados =
    categoriaSelecionada === "todos"
      ? produtos
      : produtos.filter(
          (produto) => produto.category === categoriaSelecionada
        );

  return (
    <>
      <Header />

      <main className="container">
        <h1 className="titulo-produtos">Produtos</h1>

        <nav className="categorias">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              className={
                categoriaSelecionada === categoria
                  ? "categoria-ativa"
                  : ""
              }
              onClick={() => setCategoriaSelecionada(categoria)}
            >
              {categoria === "todos" ? "Todos" : categoria}
            </button>
          ))}
        </nav>

        {loading && <p>Carregando produtos...</p>}

{erro && <p className="erro">{erro}</p>}

{!loading && !erro && (
  <section className="grid">
    {produtosFiltrados.map((produto) => (
      <ProductCard
        key={produto.id}
        produto={produto}
      />
    ))}
  </section>
)}
      </main>
    </>
  );
}

export default Home;