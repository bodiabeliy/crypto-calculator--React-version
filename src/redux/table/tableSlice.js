import {createSlice} from "@reduxjs/toolkit"

const tableState = createSlice({
    name: "table",
    initialState: {
        data: [],
        currentCoins: [],
        changedCoinsNames:[],
    },
    profit:0,
    profitPerecent:0,
    investingPeriod:0,
    totalAnount:0,

    reducers: {
        getProfitAmount(state, action) {
            state.profit = action.payload*(state.profitPerecent/100)
        },
        getProfitPercectAmount(state, action) {
            state.profitPerecent =  action.payload/1000
        },
        getInvestingPeriod(state, action) {
            // state.investingPeriod = state.profit * action.payload
            state.profit = action.payload
            console.log("state.profit",  state.profit);
        }
    }
})

export const getProfitSelector = state => state.table.profit
export const getProfitPerecentSelector = state => state.table.profitPerecent
export const getInvestingPeriodSelector = state => state.table.investingPeriod


export const {getProfitAmount, getProfitPercectAmount, getInvestingPeriod} = tableState.actions

export default tableState.reducer