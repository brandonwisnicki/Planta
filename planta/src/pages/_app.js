import '@/styles/globals.css'
import { Nunito, Outfit } from 'next/font/google'
import Layout from '../components/Layout'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const nunito = Nunito({
  weight: ['700'],
  subsets: ['latin'],
})


const outfit = Outfit({
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return <> 
   <style jsx global>{`
        html {
          font-family: ${outfit.style.fontFamily};
        }
        body {
          margin: 0;
        }
        h1,h2,h3,h4 {
          font-family: ${nunito.style.fontFamily};

        }
        
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
</>
}
