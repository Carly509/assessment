import { Poppins } from 'next/font/google';
import type { Metadata } from 'next';
import { FiCommand } from 'react-icons/fi';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], display: 'swap' });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load', function() {
            document.documentElement.classList.add('page-loaded');
          });

          setTimeout(function() {
            document.documentElement.classList.add('page-loaded');
          }, 2000);
        ` }} />
      </head>
      <body className={poppins.className}>
        <div id="app-loader" className="app-loader">
          <FiCommand className="loading-icon" />
        </div>

        {children}
      </body>
    </html>
  );
}
