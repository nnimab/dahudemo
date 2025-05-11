import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: '模擬大戶投Demo',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="remove-bis-attributes" strategy="beforeInteractive">
          {`
            (function() {
              const observer = new MutationObserver(function(mutations) {
                const attributesToRemove = [
                  'bis_skin_checked',
                  'bis_register',
                  '__processed_'
                ];
                
                mutations.forEach(function(mutation) {
                  if (mutation.type === 'attributes') {
                    const attributeName = mutation.attributeName;
                    if (attributesToRemove.some(attr => attributeName.startsWith(attr))) {
                      mutation.target.removeAttribute(attributeName);
                    }
                  }
                });
              });
              
              observer.observe(document.documentElement, {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: ['bis_skin_checked', 'bis_register', '__processed_']
              });
            })();
          `}
        </Script>
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
