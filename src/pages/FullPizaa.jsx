import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizaa = () => {
    const {id} = useParams();
    const [pizza, setPizza] = useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza () {
            try {
              const {data} = await axios.get(`https://6538192ea543859d1bb13d9d.mockapi.io/items/` + id);
              setPizza(data);
            } catch (error) {
                console.log(error);
                alert('Ошибка при получении пиццы');
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    //Пока ждем данные в стейт с бэкенда
    if (!pizza) {
        return <div className="container">Loading data...</div>;
    }

    return (
        <div className="container">
            <img width={260} height={260} src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <p>Рейтинг: {pizza.rating}</p>
            <h4>Цена: {pizza.price} ₽</h4>
        </div>
    );
};

export default FullPizaa;