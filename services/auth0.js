import auth0 from 'auth0-js'
import Cookies from 'js-cookie'

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

    get isAuthenticated() {
        const expiresAt = Cookies.getJSON("expiresAt")
        return new Date().getTime() < expiresAt
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