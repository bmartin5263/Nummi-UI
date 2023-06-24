// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// export const authOptions = {
  
//   credentials: {
//       email: {
//           label: "Email",
//           type: "text",
//           placeholder: "Enter email",
//       },
//       password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Enter Password",
//       },
//   },
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         try {
//             const user = await clientAxios.get('/login', {}, {
//               auth: {
//                 username: credentials.username,
//                 password: credentials.password,
//               }
//             })
//             if (user?.token) {
//                 return user;
//             } 
//             return Promise.reject(new Error("Login Failed"));​​
//         } catch (error) {
//             console.log(error)
//             return Promise.reject(new Error("Login Failed"));​​
//         }
//       }
//     }),
//   ],
//   callbacks: {
//       async jwt({ token, user }) {
//         if (user?.userId) {
//           return { ...token, ...user };
//         }
      
//         // on subsequent calls, token is provided and we need to check if it's expired
//         if (token?.accessTokenExpires) {
//           if (Date.now() / 1000 < token?.accessTokenExpires) return { ...token, ...user };
//         } else if (token?.refreshToken) return refreshAccessToken(token);
      
//         return { ...token, ...user };
//       }
//   },
//   pages: {
//     signIn: '/login/new',
//     signOut: '/register',
//     error: '/bots', // Error code passed in query string as ?error=
//     verifyRequest: '/auth/verify-request', // (used for check email message)
//     newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
//   }
// }

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import nummiClient from '../../../util/nummiClient';

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          try {
            console.log("Logging In");
            const response = await nummiClient.post('/login', {}, {
              auth: {
                username: credentials.username,
                password: credentials.password,
              }
            });


            console.log("Cookies");
            const cookies = response.headers['set-cookie'];

            console.log(cookies);
            res.setHeader('Set-Cookie', cookies);
            // res.setHeader('Access-Control-Allow-Credentials', response.headers['access-control-allow-credentials']);
            
            return response.data
          } catch (error) {
            console.log("Failed to Login");
            console.log(error)
            return Promise.reject(new Error("Login Failed"));
          } 
        }
      })
    ],
    callbacks: {
      async jwt({ token, user }) {
        console.log("jwt(" + token + ", " + user + ")")
        if (user?.userId) {
          console.log("Has User Id");
          return { ...token, ...user };
        }
      
        // on subsequent calls, token is provided and we need to check if it's expired
        if (token?.accessTokenExpires && Date.now() / 1000 < token.accessTokenExpires) {
          console.log("Not Expired");
          return { ...token, ...user };
        } 
        else if (token?.refreshToken) {
          console.log("Refreshing");
          return refreshAccessToken(token);
        }
      
        console.log("Regular Return");
        return { ...token, ...user };
      }
    },
    pages: {
      signIn: '/login/new',
      signOut: '/register',
      error: '/bots', // Error code passed in query string as ?error=
      verifyRequest: '/auth/verify-request', // (used for check email message)
      newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
  }
}

export default (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res))
}