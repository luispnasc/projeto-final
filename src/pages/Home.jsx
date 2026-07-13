import { useEffect, useState } from "react";

import Header from "../components/Header";
import ProductCard from "../components/Productcard";

import "./Home.css";

function Home() {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {

        fetch("https://fakestoreapi.com/products")
        .then((response)=>response.json())
        .then((dados)=>setProdutos(dados));

    },[]);

    return(

        <>
            <Header/>

            <main className="container">

                <h1>Produtos</h1>

                <section className="grid">

                    {
                        produtos.map((produto)=>(
                            <ProductCard
                                key={produto.id}
                                produto={produto}
                            />
                        ))
                    }

                </section>

            </main>

        </>

    );

}

export default Home;