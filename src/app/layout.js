import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationProvider } from './NotificationProvider';
import Header from './components/Header/Header';
import { headers } from 'next/headers';

export default function RootLayout({ children }) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const hideHeader = pathname === '/login' || pathname === '/register' || pathname === '/';

  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          <div className="App">
            {!hideHeader && (
              <div className='header-div'>
                <Header/>
              </div>
            )}
            {children}
            <ToastContainer />
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}