import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productService";

import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const { adicionarAoCarrinho } = useCart();

  useEffect(() => {
    async function carregarProduto() {
      try {
        setLoading(true);
        setErro("");

        const dados = await getProductById(id);
        setProduto(dados);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar o produto.");
      } finally {
        setLoading(false);
      }
    }

    carregarProduto();
  }, [id]);

  if (loading) {
    return <p className="mensagem">Carregando produto...</p>;
  }

  if (erro) {
    return <p className="mensagem erro">{erro}</p>;
  }

  return (
    <main className="product-details">
      <Link to="/" className="voltar">
        ← Voltar para a loja
      </Link>

      <img src={produto.image} alt={produto.title} />

      <h1>{produto.title}</h1>

      <p className="preco">
        {produto.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>

      <p>{produto.description}</p>

      <button
        type="button"
        className="btn-comprar"
        onClick={() => adicionarAoCarrinho(produto)}
      >
        Adicionar ao carrinho
      </button>
    </main>
  );
}

export default ProductDetails;