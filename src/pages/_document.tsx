import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-2xl">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
