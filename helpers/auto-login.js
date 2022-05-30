import fetch from './fetch-data';
export async function AutoLogin(ctx) {
    if (ctx.req && ctx.req.cookies) {
        const email = ctx.req.cookies["email"]
        const password = ctx.req.cookies["password"]

        const authData = {
            'email': email,
            'password': password
        }

        const response = await fetch('login', 'post', authData);
        if (response.data.roles?.permissions) {
            response.data.roles.permissions = JSON.parse(response.data?.roles?.permissions);
        }
        return {
            dataUser: response.data != undefined ? response.data : {
                email: 'younes@gmail.com',
                password: '1234',
                name: 'Younes',
            },
        }
    } else {
        return {
            dataUser: {
                email: 'younes@gmail.com',
                password: '1234',
                name: 'Younes',
            }
        }
    }
}