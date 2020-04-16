import gql from 'graphql-tag'

const SIGN_IN = gql`
	mutation signIn($input: SignInInput!) {
		signin(input: $input) {
			token
		}
	}
`

const SIGN_UP = gql`
	mutation signUp($input: SignUpInput!) {
		signup(input: $input)
	}
`

export {SIGN_IN, SIGN_UP}
