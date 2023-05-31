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
    investingPeriod:1,
    totalAnount:0,

    reducers: {
        getProfitAmount(state, action) {
            state.profit = action.payload*(state.profitPerecent/100)
        },
        getProfitPercectAmount(state, action) {
            state.profitPerecent = action.payload/1000

        },
        getInvestingPeriod(state, action) {
            // state.investingPeriod = state.profit * action.payload
            let accumulate = state.profit*action.payload
            state.totalAnount = accumulate
            console.log("state.profit",  state.totalAnount);
        }
    }
})

export const getProfitSelector = state => state.table.profit
export const getProfitPerecentSelector = state => state.table.profitPerecent
export const getInvestingPeriodSelector = state => state.table.investingPeriod
export const getTotalAmountPeriodSelector = state => state.table.totalAnount



export const {getProfitAmount, getProfitPercectAmount, getInvestingPeriod} = tableState.actions

export default tableState.reducer