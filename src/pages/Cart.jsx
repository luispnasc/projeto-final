import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "../styles/Cart.css";

function Cart() {
  const {
    carrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    totalCarrinho,
  } = useCart();

  if (carrinho.length === 0) {
    return (
      <main className="cart-container">
        <h1>Meu Carrinho</h1>

        <p>O carrinho está vazio.</p>

        <Link to="/" className="voltar-loja">
          Voltar para a loja
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-container">
      <div className="cart-header">
        <h1>Meu Carrinho</h1>

        <button
          type="button"
          className="limpar-carrinho"
          onClick={limparCarrinho}
        >
          Limpar carrinho
        </button>
      </div>

      <section className="cart-list">
        {carrinho.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="cart-info">
              <h2>{item.title}</h2>

              <p>
                {item.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <div className="quantidade">
                <button
                  type="button"
                  onClick={() => diminuirQuantidade(item.id)}
                >
                  −
                </button>

                <span>{item.quantidade}</span>

                <button
                  type="button"
                  onClick={() => aumentarQuantidade(item.id)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className="remover-item"
              onClick={() => removerDoCarrinho(item.id)}
            >
              Remover
            </button>
          </article>
        ))}
      </section>

      <section className="cart-total">
        <h2>
          Total:{" "}
          {totalCarrinho.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2>

        <Link to="/" className="voltar-loja">
          Continuar comprando
        </Link>
      </section>
    </main>
  );
}

export default Cart;