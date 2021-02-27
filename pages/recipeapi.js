//Spoonacular API
import 'bootswatch/dist/flatly/bootstrap.min.css';
import Head from 'next/head';
export default function RecipeApi({ data }) {
    let nameStorage = ''
    console.log(data.recipes[0].extendedIngredients.length)
    data.recipes[0].extendedIngredients.forEach(e => {
        
        if (data.recipes[0].extendedIngredients.length-1 == data.recipes[0].extendedIngredients.indexOf(e)) {
            nameStorage += ' and '
            nameStorage += e.name
        }
        else {
            nameStorage += e.name
            nameStorage += ", "
        }
    })
    let newPrize = Math.floor(data.recipes[0].pricePerServing) / 10
    
    
    return (<div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand" href="/recipeapi">Random Recipe Application</a>
            <div class="collapse navbar-collapse" id="navbarColor02">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Back To Main Site</a>
                    </li>
                </ul>
            </div>
</nav>
        <div className="container">
        <Head>
            <title> Random Recipe </title>
        </Head>
        <div class="card mb-3">
            <h3 class="card-header">{data.recipes[0].title}</h3>
            <div class="card-body">
                <h5 class="card-title">Prize Per Serving - {newPrize}$</h5>
                <h6 class="card-subtitle text-muted">ready in {data.recipes[0].readyInMinutes} minutes</h6>
            </div>
            <img src={data.recipes[0].image} width="300px" height="200px" />
           
            <div class="card-body">
                <h3 class="card-text">Note!!</h3>
                <div dangerouslySetInnerHTML={{ __html: data.recipes[0].summary }}></div>
            </div>
            <div class="card-footer">
                <button type="button" onClick={() => window.location.reload()} class="btn btn-primary">Don't feel like making {data.recipes[0].title}? No Worries, click here for another</button>
  </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Ingredients</h4>
                <h6 class="card-subtitle mb-2">The ingredients used for this dish are <b>{nameStorage}</b></h6>
             </div>  
        </div><br/>
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Recipe</h4>
                <h6 class="card-subtitle mb-2" dangerouslySetInnerHTML={{ __html: data.recipes[0].instructions }}></h6>
            </div>
            <div class="card-footer text-muted">
                <p>Enjoy!!</p>
            </div>
        </div>
       
     
        {
           data.recipes[0].extendedIngredients.forEach(e => { return (<div>{e.name}</div>) })
            
        }
      </div>  
    </div>)
}
export const getStaticProps = async () => {
    const response = await fetch("https://api.spoonacular.com/recipes/random?number=1&apiKey=API-KEY")
    const data = await response.json()
   
    return {
        props: {
            data
        }
    }
}