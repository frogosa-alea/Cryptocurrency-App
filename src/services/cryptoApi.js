import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const cryptoApiHeaders ={
    'X-RapidAPI-Key': 'df98fcf707msh668a93c76fcea3bp12b40fjsnb31fc19ea3fc',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const createRequest = ( url ) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        })
    })
})

export const {
    useGetCryptosQuery,
} = cryptoApi