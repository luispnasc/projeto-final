import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduto(data))
      .catch((erro) => {
        console.error("Erro ao buscar produto:", erro);
      });
  }, [id]);

  if (!produto) {
    return <p>Carregando produto...</p>;
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
  </main>
);
}

export default ProductDetails;