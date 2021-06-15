import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {Provider} from 'react-redux'
import store from './features/store'
import 'semantic-ui-css/semantic.min.css'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    // uri: 'http://localhost:4000/',
    uri: 'https://sqlite.texnopraksis.com/',
    // uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
});

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
)
