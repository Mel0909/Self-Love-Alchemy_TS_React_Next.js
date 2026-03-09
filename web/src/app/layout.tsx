import { ToastProvider } from "./(frontend)/contexts/ToastContext"; 
import { MagicProvider } from "./(frontend)/contexts/MagicContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ToastProvider>
          <MagicProvider>
            {children}
          </MagicProvider>
        </ToastProvider>
      </body>
    </html>
  );
}