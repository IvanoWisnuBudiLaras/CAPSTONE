import Login from '@/client/loginclient'

export const metadata = {
  title:       'Masuk',
  description: 'Masuk ke akun Fin Smart untuk mulai kelola keuangan generasi sandwich kamu.',
}

export default function Page() {
  return <Login />
}