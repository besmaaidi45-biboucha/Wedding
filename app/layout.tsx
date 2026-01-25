import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />           {/* navbar au-dessus du Canva */}
        {children}           {/* contenu SPA */}
      </body>
    </html>
  );
}

