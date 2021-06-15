import {gql} from '@apollo/client'

export const countPoems = gql`
    query dataPoems {
        countPoems
        countCategories
        maxIdPoems
        categories{id description}
        minMaxByCategory{
            min
            max
            category
        }
    }
`
export const getPoemById = gql`
    query getPoembyId($id:Int!){
        getPoemById(id:$id){
            id
            idInCategory
            content
            category {
                id
                description
            }
            authDate
            explanation
        }
    }
`
export const getPoems = gql`
    query Query($poemsOrder: String, $poemsCategory: ID, $poemsSearch: String) {
        poems(order: $poemsOrder, category: $poemsCategory, search: $poemsSearch) {
            id
            idInCategory
            content
            category {
                id
                description
            }
            authDate
            explanation
        }
    }
`

export const checkIfExists = gql`
    query query(
        $id: Int!
        $category: ID!
        $idInCategory: Int!
        $content: String!
    ) {
        getPoemById(id: $id) {
            id
        }
        getPoemByCategoryId(category: $category, idInCategory: $idInCategory) {
            id
        }
        getPoemByContent(content: $content) {
            id
        }
    }`

export const addPoem = gql`
    mutation Mutation($input: PoemsInput!) {
        addPoem(input: $input) {
            id
        }
    }
`

export const bulkImport = gql`
    mutation Mutation($input: [PoemsInput!]!) {
        addMassPoem(input: $input)
    }
`