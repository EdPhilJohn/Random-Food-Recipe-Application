import Head from 'next/head'
import RecipeAPI from './recipeapi'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
      <div>
         <RecipeAPI/>
    </div>
  )
}
