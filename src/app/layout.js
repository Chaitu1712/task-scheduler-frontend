import { NotificationProvider } from './NotificationProvider';
import HeaderWrapper from './components/Header/HeaderWrapper';
import ClientToastContainer from './components/ClientToastContainer';
export default async function RootLayout({ children }) {
  return (
    <html lang="en" className=''>
      <body style={{ margin: '0px' }} suppressHydrationWarning>
        <NotificationProvider>
          <div className="App">
            <HeaderWrapper />
            {children}
            <ClientToastContainer />
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}