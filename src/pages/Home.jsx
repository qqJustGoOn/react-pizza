import React from 'react';
import ReactPaginate from "react-paginate";


import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = ({searchValue}) => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
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
        const search = searchValue ? `&search=${searchValue}` : '';
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

        fetch(`https://6538192ea543859d1bb13d9d.mockapi.io/items?page=${currentPage}&limit=4&${
                category}&sortBy=${sortBy}&order=${order}${search}`
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
    }, [categoryId, sortType, searchValue, currentPage]);

    // const pizzas = items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // }).map(...)
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} changeCategory={(id) => onSetCategory(id)}/>
                <Sort sortType={sortType} changeSort={(obj) => setSortType(obj)} orderType={orderType} setOrderType={setOrderType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    );
};

export default Home;