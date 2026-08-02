import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export function useProducts() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProdutos() {
      try {
        setLoading(true);
        setErro("");

        const dados = await getProducts();
        setProdutos(dados);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  return {
    produtos,
    loading,
    erro,
  };
}