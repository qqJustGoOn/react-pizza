import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
// import {SearchContext} from "../../App";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";

const Search = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    // const {setSearchValue} = React.useContext(SearchContext);
    const searchRef = React.useRef(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        searchRef.current.focus();
    }
    //отложенное выполнение функции для поиска
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 200),
        []
    );

    const onChangeInput = (e) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon}
                 xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path
                    d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
            <input onChange={onChangeInput}
                   ref={searchRef}
                   value={value}
                   className={styles.input}
                   type="text" placeholder="Search pizza.."/>
            {value &&
                <svg onClick={onClickClear}
                     className={styles.clearIcon}
                     xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100"
                     height="100" viewBox="0 0 24 24">
                    <path
                        d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                </svg>}
        </div>

    );
};

export default Search;