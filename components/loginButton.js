import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const session = useSession()
  console.log("session " + session);
  if (session) {
    return (
      <>
        Signed in <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}