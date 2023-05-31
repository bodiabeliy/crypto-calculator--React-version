import React, {useEffect, useMemo, useRef, useState} from "react";
import useDebounce from "../hooks/useDebounce";

import {useSearchCoinMutation} from "../redux/table/tableApiSlice";
import {getProfitAmount, getProfitPercectAmount} from "../redux/table/tableSlice";

import SearchBoxItem from '../components/SearchBoxItem';
import { useDispatch } from "react-redux";



const SearchBoxForm = () => {
    const dispatch  = useDispatch()
    const [searchCoin] = useSearchCoinMutation()

    
    const searchContainerRef = useRef(null)


    const [search, setSearch] = useState('')
    const [cryptoAmount, setCryptoAmount] = useState(0)
    const [resultSearch, setResultSearch] = useState([])
    const [cursor, setCursor] = useState(-1);
    const [hashTags, setHashTages] = useState([])

    const filteredCoins = useMemo(() => {
        if (!search) {
            return resultSearch
        }
        dispatch(getProfitAmount(search))
        resultSearch.map(searchResult =>  {
            if( searchResult.name.toLowerCase().includes(search.toLowerCase())) {
                dispatch(getProfitAmount(searchResult.price))
                dispatch(getProfitPercectAmount(searchResult.rating))

            }
        })
        return resultSearch.filter(searchResult =>   searchResult.name.toLowerCase().includes(search.toLowerCase()))

    }, [resultSearch, search])



    const handleSearch = async (text) => {
        setSearch(text)
        if (text.length > 0) {
            const res = await searchCoin({text})
            setResultSearch(res.data.coins)

        } else {
            setResultSearch([])
        }

    }

    const onChange = async e => {
        setSearch(e.target.value)
        await debouncedSearch(e.target.value)
        
    }

    const onAmoutChange =(event) => {
        setCryptoAmount(event.target.value)
        dispatch(getProfitAmount(event.target.value))
    }
    const debouncedSearch = useDebounce(handleSearch, 0)

    const onPressArrowkey =(event) => {
        if (event.key == "ArrowDown") {
           if(search !="") {

            setCursor(currentPosition => (currentPosition < filteredCoins.length -1) ? currentPosition +1: currentPosition-1)
           }
        }
        if (event.key == "ArrowUp") {
            setCursor(currentPosition => (currentPosition > 0 ? currentPosition -1:0))
        } 
        if (event.key == "Escape") {
            setSearch("")
            setCursor(-1)
        }
    }
    return ( 
    <section className="page__main-title main-title container">
        <div className="" style={{marginBottom:"30px"}}>
        <input 
            value={cryptoAmount} 
            onChange={onAmoutChange} 
            type="number" 
            name="a" 
            step={1000}
            min={1000}
            max={1000000}
            className="search__input"
            placeholder={'Enter cryptocyrrency'}
            onKeyDown={(e) =>onPressArrowkey(e)}
        />
        </div>
    <div className={`main-title__search search ${search.length ? 'dropdown-open' : null}`} ref={searchContainerRef}>
        <input 
            value={search} 
            onChange={onChange} 
            type="text" 
            name="search" 
            className="search__input"
            placeholder={'Enter cryptocyrrency'}
            onKeyDown={(e) =>onPressArrowkey(e)}
        />
        <div className="search__placeholder">
            <picture>
                <source srcSet={require("../assets/img/lupa.webp")} type="image/webp"/>
                <img src={require("../assets/img/lupa.png")} alt="search"/>
            </picture>
        </div>
        <div style={{
                display: search.length ? 'block' : 'none', 
                maxHeight:filteredCoins.length > 4?"200px": null,
                overflowY:filteredCoins.length > 4?"scroll":null
            }} className="main-title_search-dropdown">

            {
              filteredCoins.map((coin, index) => (
                    <SearchBoxItem 
                        key={coin.name} 
                        onSelect={() => {
                        setSearch(coin.name)
                      }}
                      isHighlighted={cursor ==index ?true: false}
                      searchCoin={coin}
                    />
                    
                ))
            }


        </div>
    </div>
</section>  );
}
 
export default SearchBoxForm;