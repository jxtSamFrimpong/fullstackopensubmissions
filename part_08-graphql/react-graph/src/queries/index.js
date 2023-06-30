import { gql } from '@apollo/client'
import { PERSON_RESPONSE_FRAGMENT } from './fragments'

export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
  addPerson(
    name: $name,
    street: $street,
    city: $city,
    phone: $phone
  ) {
    ...PersonResponseFragment
  }
}
${PERSON_RESPONSE_FRAGMENT}
`

export const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`

export const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    ...PersonResponseFragment
  }
}
${PERSON_RESPONSE_FRAGMENT}
`

export const EDIT_NUMBER = gql`
mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone) {
    ...PersonResponseFragment
  }
}
${PERSON_RESPONSE_FRAGMENT}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`