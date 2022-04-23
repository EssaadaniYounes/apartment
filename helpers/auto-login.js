import fetch from './fetch-data';
export async function AutoLogin(ctx) {
    if (ctx.req && ctx.req.cookies) {
        const email = ctx.req.cookies["email"]
        const password = ctx.req.cookies["password"]

        const authData = {
            'email': email,
            'password': password
        }

        const response = await fetch('login', 'post', authData)
        return {
            dataUser: response.data.data
        }
    } else {
        return {
            dataUser: undefined
        }
    }
}