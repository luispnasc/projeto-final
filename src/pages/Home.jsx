import { useEffect, useState } from "react";

import Header from "../components/Header";
import ProductCard from "../components/Productcard";

import "./Home.css";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((dados) => setProdutos(dados))
      .catch((erro) => {
        console.error("Erro ao buscar produtos:", erro);
      });
  }, []);

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
        <h1>Produtos</h1>

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

        <section className="grid">
          {produtosFiltrados.map((produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Home;