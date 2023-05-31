import {apiSlice} from "../apiSlice";

export const tableApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        fetchAllCoins: build.query({
            query: () => {
                return {
                    url:"coin/coins",
                    method: 'GET',
                    
                }
            }
        }),
        
        searchCoin: build.mutation({
            query: body => {
                return {
                    url: '/coin/search',
                    method: 'POST',
                    body
                }
            }
        }),
    }),
})

export const {
    useFetchAllCoinsQuery,
    useSearchCoinMutation,

} = tableApiSlice