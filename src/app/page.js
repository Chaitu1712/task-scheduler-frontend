import { redirect } from 'next/navigation';

export { default } from './pages/Login';

export default function Home() {
  redirect('/login');
}