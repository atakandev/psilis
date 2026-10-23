import { login } from '@/lib/actions'

export default async function Login({ searchParams }) {
  const err = (await searchParams).e
  return (
    <main className="adm" style={{ maxWidth: 380 }}>
      <h1>Admin login</h1>
      <form action={login}>
        <label>Email</label><input name="email" type="email" required />
        <label>Password</label><input name="password" type="password" required />
        {err && <p style={{ color: 'crimson' }}>Invalid email or password.</p>}
        <p><button className="pri">Sign in</button></p>
      </form>
    </main>
  )
}
