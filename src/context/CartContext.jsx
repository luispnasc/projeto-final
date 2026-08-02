import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

function carregarCarrinhoSalvo() {
  try {
    const carrinhoSalvo = localStorage.getItem("nasc-imports-carrinho");

    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  } catch (error) {
    console.error("Erro ao carregar carrinho:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState(carregarCarrinhoSalvo);

  useEffect(() => {
    localStorage.setItem(
      "nasc-imports-carrinho",
      JSON.stringify(carrinho)
    );
  }, [carrinho]);

  function adicionarAoCarrinho(produto) {
    setCarrinho((carrinhoAtual) => {
      const produtoExistente = carrinhoAtual.find(
        (item) => item.id === produto.id
      );

      if (produtoExistente) {
        return carrinhoAtual.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );
      }

      return [
        ...carrinhoAtual,
        {
          ...produto,
          quantidade: 1,
        },
      ];
    });
  }

  function aumentarQuantidade(id) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item
      )
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerDoCarrinho(id) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter((item) => item.id !== id)
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.price * item.quantidade,
    0
  );

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        limparCarrinho,
        totalCarrinho,
        quantidadeTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error(
      "useCart deve ser usado dentro de CartProvider"
    );
  }

  return contexto;
}