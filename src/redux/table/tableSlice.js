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

    reducers: {
        getProfitAmount(state, action) {
            state.profit =  action.payload
        },
        getProfitPercectAmount(state, action) {
            state.profitPerecent =  action.payload/1000
        }
    }
})

export const getProfitSelector = state => state.table.profit
export const getProfitPerecentSelector = state => state.table.profitPerecent

export const {getProfitAmount, getProfitPercectAmount} = tableState.actions

export default tableState.reducer