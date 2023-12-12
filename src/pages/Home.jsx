import React from 'react';
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Categories} from "../components/Categories";
import {list, Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
// import {SearchContext} from "../App";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzaSlice";
import styles from "../components/NotFoundBlock/NotFoundBlock.module.scss";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const {categoryId, sort, currentPage, searchValue} = useSelector((state) => state.filter);
    const {items, status} = useSelector((state) => state.pizza);
    // const { categoryId, currentPage, sort: { sortProperty: sortType } } = useSelector(state => state.filter)
    const sortType = sort.sortProperty;

    // const {searchValue} = React.useContext(SearchContext);
    const [orderType, setOrderType] = React.useState(true);


    const onSetCategory = (id) => {
        dispatch(setCategoryId(id));
    };
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        const sortBy = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc';

        //Получение пицц используя createAsyncThunk
        dispatch(
            fetchPizzas({
                category,
                search,
                sortBy,
                order,
                currentPage,
            })
        );

        window.scrollTo(0, 0);
    }
    // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
    React.useEffect(() => {
        if (window.location.search) {
            //Превращаем адресную строку в объект
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find(obj => obj.sortProperty === params.sortProperty);
            dispatch(
                //передаем в редакс
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, []);

    // Если изменили параметры и был первый рендер
    React.useEffect(() => {
        //Если УЖЕ БЫЛ первый рендер, тогда выполни действие
        if (isMounted.current) {
            //Превращаем объект в строку, чтобы вшить потом в адресную строчку
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            //вшиваем в ссылку параметры с редакса
            navigate(`?${queryString}`);
        }
        //Устанавливаем флаг после первого рендера
        isMounted.current = true;
    }, [categoryId, sortType, currentPage]);

    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sortType, searchValue, currentPage]);


    // const pizzas = items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // }).map(...)
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} changeCategory={(id) => onSetCategory(id)}/>
                <Sort orderType={orderType} setOrderType={setOrderType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2> 😕 Произошла ошибка 😕
                    </h2>
                    <p>К сожалению пиццы не найдены</p>
                </div>
            ) : (
                <div className="content__items">
                    {
                        status === 'loading'
                            ? skeletons
                            : pizzas
                    }
                </div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;