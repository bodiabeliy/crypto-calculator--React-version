import React, {useEffect, useMemo, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import {getProfitSelector, getProfitPerecentSelector} from "../redux/table/tableSlice";
import "../App.css"




const SearchedCryptoCurrency = () => {
    const profit = useSelector(getProfitSelector)
    const profitPerecent = useSelector(getProfitPerecentSelector)

    return ( 
        <div className="data-view-section__content-block">
            <p className='data-view-section__description'>Profit: </p>
            <span className="data-view-section__title">$ {profit}</span>
            <p className='data-view-section__description'>Perecent</p>
            <span className="data-view-section__title">{profitPerecent}</span>
            <div className="data-view-section__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cumque animi mollitia ipsam quae fuga voluptatibus aut quia autem nulla corrupti suscipit quam, rem veniam, reiciendis, temporibus magni quis velit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cumque animi mollitia ipsam quae fuga voluptatibus aut quia autem nulla corrupti suscipit quam, rem veniam, reiciendis, temporibus magni quis velit! Lorem ipsum dolor sit amet consectetur adipisicing
            </div>
        </div>
     );
}
 
export default SearchedCryptoCurrency;