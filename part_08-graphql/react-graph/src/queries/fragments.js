import { gql } from '@apollo/client'

export const PERSON_RESPONSE_FRAGMENT = gql`
fragment PersonResponseFragment on Person {
    name
    phone
    id 
    address {
      street 
      city
    }
  }
`