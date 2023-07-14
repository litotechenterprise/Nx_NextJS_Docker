import { AppProps } from 'next/app';
// import Head from 'next/head';
// import './styles.css';

// function CustomApp({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Head>
//         <title>Welcome to web!</title>
//       </Head>
//       <main className="app">
//         <Component {...pageProps} />
//       </main>
//     </>
//   );
// }

// export default CustomApp;

import { NativeBaseProvider } from 'native-base';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NativeBaseProvider>
      <Component {...pageProps} />
    </NativeBaseProvider>
  );
}

export default MyApp;
