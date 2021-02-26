import Head from 'next/head'
import CovidApi from './covidapi'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
      <div>
         <CovidApi/>
    </div>
  )
}
