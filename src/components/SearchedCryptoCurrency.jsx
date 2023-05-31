import React, {useEffect, useMemo, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import {getProfitSelector, getProfitPerecentSelector, getTotalAmountPeriodSelector} from "../redux/table/tableSlice";
import "../App.css"




const SearchedCryptoCurrency = () => {
    const profitPerecent = useSelector(getProfitPerecentSelector)
    const totalAmount = useSelector(getTotalAmountPeriodSelector)

    return ( 
        <div className="data-view-section__content-block">
            <p className='data-view-section__description'>Profit: </p>
            <span className="data-view-section__title"> {totalAmount != undefined? "$"+Math.ceil(totalAmount): "0"}</span>
            <p className='data-view-section__description'>Perecent</p>
            <span className="data-view-section__title">{profitPerecent != undefined? Math.ceil(profitPerecent) +"%": "-"}</span>
            <div className="data-view-section__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cumque animi mollitia ipsam quae fuga voluptatibus aut quia autem nulla corrupti suscipit quam, rem veniam, reiciendis, temporibus magni quis velit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cumque animi mollitia ipsam quae fuga voluptatibus aut quia autem nulla corrupti suscipit quam, rem veniam, reiciendis, temporibus magni quis velit! Lorem ipsum dolor sit amet consectetur adipisicing
            </div>
        </div>
     );
}
 
export default SearchedCryptoCurrency;