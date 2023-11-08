import React from 'react';
import axios from "axios";

import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {SearchContext} from "../App";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";

const Home = () => {
    const dispatch = useDispatch();
    const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
    const sortType = sort.sortProperty;

    const {searchValue} = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [orderType, setOrderType] = React.useState(true);


    const onSetCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    React.useEffect(() => {
        setIsLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        const sortBy = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc';

        axios.get(`https://6538192ea543859d1bb13d9d.mockapi.io/items?page=${currentPage}&limit=4&${
            category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                setItems(res.data);
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
                <Sort  orderType={orderType} setOrderType={setOrderType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;