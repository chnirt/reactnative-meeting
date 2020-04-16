import gql from 'graphql-tag'

const GET_GREETING = gql`
	query getGreeting($language: String!) {
		greeting(language: $language) {
			message
		}
	}
`

export {GET_GREETING}
