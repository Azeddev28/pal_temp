import Layout from '@/components/layout'
import { Poppins } from 'next/font/google'
import '../../styles/globals.css'

// Subsets are really important. CHECK BELOW FOR MORE INFO
const poppins = Poppins({
  weight: '400',
  subsets: ['latin']
})

function MyApp({ Component, pageProps }) {
  return (
    <div >
      <main className={poppins.className}>
        <Layout/>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp