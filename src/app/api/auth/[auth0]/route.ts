// app/api/auth/[auth0]/route.js
import { handleAuth,handleLogin } from '@auth0/nextjs-auth0';


export const GET = handleAuth({
    login:handleLogin({
        returnTo: '/notes'
    }),
    signup:handleLogin({
        authorizationParams: {
            screen_hint: 'signup'
        },
        returnTo: '/notes'
    })
});