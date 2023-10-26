import React from 'react';

import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";

const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0);
    const [orderType, setOrderType] = React.useState(true);
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating'
    });
    const onSetCategory = (id) => {
        setCategoryId(id);
    };

    React.useEffect(() => {
        setIsLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

        fetch(`https://6538192ea543859d1bb13d9d.mockapi.io/items?${
                category}&sortBy=${sortBy}&order=${order}`
            // }&sortBy=${sortType.sortProperty}&order=${sortType.order}`
            // }&sortBy=${sortType.sortProperty}&order=${orderType ? 'desc' : 'asc'}`
        )
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} changeCategory={(id) => onSetCategory(id)}/>
                <Sort sortType={sortType} changeSort={(i) => setSortType(i)} orderType={orderType} setOrderType={setOrderType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </div>
    );
};

export default Home;