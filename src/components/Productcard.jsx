import "./ProductCard.css";

function ProductCard({ produto }) {
  return (
    <div className="card">

      <img
        src={produto.image}
        alt={produto.title}
      />

      <h3>{produto.title}</h3>

      <p className="preco">
        R$ {produto.price}
      </p>

    </div>
  );
}

export default ProductCard;