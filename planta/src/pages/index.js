import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Garden from './garden'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Garden/>
    </>
  )
}
