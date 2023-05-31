import React, {useEffect, useMemo, useRef, useState} from 'react';

import SearchBoxForm from '../components/SearchBoxForm';
import SearchedCryptoCurrency from "../components/SearchedCryptoCurrency"

import "../App.css"



const Main = () => {


    return (
        <div className="main-container__wrapper">
            <div className="main-container__form-section">
            <SearchBoxForm />
            </div>
            <div className="main-container__data-view-section">
            <SearchedCryptoCurrency />
            </div>
            
        </div>
    );
};

export default Main;