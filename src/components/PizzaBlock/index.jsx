import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem, selectCartItemByParams} from "../../redux/slices/cartSlice";
import {Link} from "react-router-dom";

const typesNames = ['тонкое', 'традиционное'];

export function PizzaBlock({id, title, price, imageUrl, sizes, types}) {
    const [activeSize, setActiveSize] = React.useState(0);
    const [activeType, setActiveType] = React.useState(0);
    const dispatch = useDispatch();

    const cartItem = useSelector(selectCartItemByParams(id, typesNames[activeType], sizes[activeSize]));

    const addedPizzaCount = cartItem ? cartItem.count : 0;
    const onClickAdd = () => {
        //Сгенерировал объект корзины, который будет хранится в редаксе
        const item = {
            id,
            title,
            price,
            imageUrl,
            size: sizes[activeSize],
            type: typesNames[activeType]
        };
        dispatch(addItem(item));
    };

    return (
        <div className="pizza-block">
            <Link to={`/pizza/${id}`}>
                <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
                />
                <h4 className="pizza-block__title">{title}</h4>
            </Link>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((type, i) =>
                        <li key={i} onClick={() => setActiveType(i)}
                            className={activeType === i ? 'active' : ''}>{typesNames[type]}
                        </li>
                    )}
                </ul>
                <ul>
                    {sizes.map((size, i) =>
                        <li key={i} onClick={() => setActiveSize(i)}
                            className={activeSize === i ? 'active' : ''}>{size} см.
                        </li>
                    )}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <button onClick={onClickAdd} className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {addedPizzaCount > 0 && <i>{addedPizzaCount}</i>}
                </button>
            </div>
        </div>);
}