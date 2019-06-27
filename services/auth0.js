import auth0 from 'auth0-js'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import axios from 'axios'

class AuthClient {
    constructor() {
        this.auth = new auth0.WebAuth({
            domain: "dev-qeugy7rr.eu.auth0.com",
            clientID: "KFqF72FeiKoRuunN43nhNlw8fzsnYqST",
            redirectUri: "http://localhost:3000/callback",
            responseType: "token id_token",
            scope: "openid profile"
        })
    }

    isAuthenticated = async () => {
        const token = Cookies.getJSON('jwt')
        return await this.verifyToken(token)
    }

    verifyToken = async token => {
        if(token) {
            const decodedToken = jwt.decode(token, { complete: true })
            const jwks = await this.getJWKS()
            const jwk = jwks.keys[0]

            let certificate = jwk.x5c[0]
            certificate = certificate.match(/.{1,64}/g).join("\n")
            certificate = `-----BEGIN CERTIFICATE-----\n${certificate}\n-----END CERTIFICATE-----\n`

            if(jwk.kid === decodedToken.header.kid) {
                try {
                    const verifiedToken = jwt.verify(token, certificate)
                    const expiresAt = verifiedToken.exp * 1000
                    return new Date().getTime() < expiresAt ? verifiedToken : null
                } catch(e) {
                    console.log("Unable to verify jwt: ", e)
                    return null
                }
            }
            return null
        }
        return null
    } 

    getJWKS = async () => {
        try {
            const { data } = await axios.get('https://dev-qeugy7rr.eu.auth0.com/.well-known/jwks.json')
            return data
        } catch(e) { 
            console.log("Unable to fetch jwks: ", e)
            return null
        }
    }

    isAuthenticatedServerSide = async req => {
        if(req.headers.cookie) {
            const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))

            if(!jwtCookie) return false

            const token = jwtCookie.split("=")[1]
            
            return await this.verifyToken(token)
        }
        return null
    }

    login = () => {
        this.auth.authorize()
    }

    logout = () => {
        Cookies.remove("user")
        Cookies.remove("jwt")
        Cookies.remove("expiresAt")

        this.auth.logout({
            returnTo: "",
            clientID: "KFqF72FeiKoRuunN43nhNlw8fzsnYqST"
        })
    }

    handleAuth = () => new Promise((resolve, reject) => {
        this.auth.parseHash((err, authRes) => {
            if(authRes && authRes.accessToken && authRes.idToken) {
                this.setSession(authRes)
                resolve()
            } else {
                console.log(err)
                reject(err)
            }
        })
    })
        
    setSession = authRes => {
        const expiresAt = JSON.stringify((authRes.expiresIn * 1000) + new Date().getTime());
        
        Cookies.set("user", authRes.idTokenPayload)
        Cookies.set("jwt", authRes.idToken)
        Cookies.set("expiresAt", expiresAt)
    }
}

export default new AuthClient()