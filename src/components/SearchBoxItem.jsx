import React, {useMemo} from "react"

const SearchBoxItem = ({searchCoin, onSelect, isHighlighted}) => {


    return (
        <div className={`main-title_search-dropdown_option ${isHighlighted ?"dropdown--highlighed" :null}`} key={searchCoin._id} onClick={onSelect}>
            <img src={searchCoin.img} alt="" className="main-title_search-dropdown_option_icon" />
            <span
                className="main-title_search-dropdown_option_crypto-project-name">{searchCoin.full_name}</span>
            <span
                className="main-title_search-dropdown_option_crypto-project-ticker">{searchCoin.name}</span>
        </div>
    );
}

export default SearchBoxItem;