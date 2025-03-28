import "./globals.css";
import Provider from "./Provider";
import { Josefin_Sans } from 'next/font/google';

const roboto = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
