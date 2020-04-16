import gql from 'graphql-tag'

const GET_GREETING1 = gql`
	query getGreeting($language: String!) {
		greeting(language: $language) {
			message
		}
	}
`

export {GET_GREETING1}
