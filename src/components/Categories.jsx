import React from "react";

export function Categories({categoryId, changeCategory}) {
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]
    // const onClickCategory = (index) => {
    //     setActiveCategory(index);
    // };

    return (
        <div className="categories">
            <ul>
                {categories.map((category, i) =>
                    <li key={i} onClick={() => changeCategory(i)}
                        className={categoryId === i ? 'active' : ''}>{category}</li>
                )}
            </ul>
        </div>
    );
}