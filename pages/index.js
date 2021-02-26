import Head from 'next/head'
import RecipeApi from './recipeapi'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
      <div>
         <RecipeApi/>
    </div>
  )
}
