import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function Productcard({ produto }) {
  return (
    <Link to={`/product/${produto.id}`} className="card-link">
      <div className="card">
        <img
          src={produto.image}
          alt={produto.title}
        />

        <h3>{produto.title}</h3>

        <p className="preco">
          {produto.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </Link>
  );
}

export default Productcard;