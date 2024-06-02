import GitHub from '@auth/core/providers/github';
import Google from "@auth/core/providers/google"
import { defineConfig } from 'auth-astro';

export default defineConfig({
    providers: [
        GitHub({
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            id: import.meta.env.AUTH_GOOGLE_ID,
            secret: import.meta.env.AUTH_GOOGLE_SECRET
        })
    ],
});
