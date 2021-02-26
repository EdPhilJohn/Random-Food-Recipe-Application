import 'bootswatch/dist/flatly/bootstrap.min.css';
import {useState} from 'react'
import { ProgressBar } from 'react-bootstrap'
import Head from 'next/head'
export default function CovidAPI({ data, data_2}) {
 
    let id=0
    return (<div className="container">
        <Head>
            <title>COVID-19</title>
            <link rel="icon" href="https://michiganross.umich.edu/sites/default/files/images/blog/covid19.jpg" />
        </Head>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">COVID-19 Statistics</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>          
        </nav><br/>
        {
            
            data.map(e => {
                let pcrec=0,pcdea=0
                if (e.cases != 0) {
                    e.recovered = e.cases - e.deaths
                    pcrec = (e.recovered / e.cases) * 100
                    pcdea = (e.deaths / e.cases) * 100
                    
                }
                else {
                    pcrec = 0
                    pcdea = 0

                }
                
                return (<div key={id++}>
                    <div className="list-group">
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                            <div className="d-flex w-100 justify-content-between">

                                <h5 className="mb-1">{(data_2.filter(g => g.alpha2Code === e.country))[0].name} ({e.country})
                                    <img src={(data_2.filter(g => g.alpha2Code === e.country))[0].flag} width="20px" height="20px" />
                                    </h5>
                                
                                <small>Last Updated on {e.last_update.slice(0,10)}</small>
                            </div>
                        </a>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Population
                                <span className="badge badge-primary badge-pill">{(data_2.filter(g => g.alpha2Code === e.country))[0].population}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Number of cases
                                <span className="badge badge-primary badge-pill">{e.cases}</span>
                            </li>
                           
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Number of deaths
                                <span className="badge badge-primary badge-pill"> {e.deaths}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Recovered

                                <span className="badge badge-primary badge-pill">{e.recovered}</span>
                            </li>
                        </ul>
                        
                        <ProgressBar variant="warning" data-toggle="tooltip" data-placement="top" title="Percentage of people affected" now={Math.floor((e.cases / (data_2.filter(g => g.alpha2Code === e.country))[0].population) * 100)} label={Math.floor((e.cases / (data_2.filter(g => g.alpha2Code === e.country))[0].population) * 100)}/>
                        <ProgressBar variant="success" data-toggle="tooltip" data-placement="top" title="Percentage of people recovered" now={pcrec} label={Math.floor(pcrec)} />
                   
                        <ProgressBar variant="danger" data-toggle="tooltip" data-placement="top" title="Percentage of people died" now={pcdea} label={Math.floor(pcdea)} />
                     
                        
                      <br/>
                    </div>
                </div>)
            })
        }
    </div>)
}
export const getStaticProps=async()=>{
    try {
        const response = await fetch('https://covid19-api.org/api/status')
        const data = await response.json()
        const response_2 = await fetch('https://restcountries.eu/rest/v2/all')
        const data_2 = await response_2.json()

        return {
            props: { data, data_2 }
        }
    }
    catch (error) {
        window.alert("Resources Currently Busy, Try again later")
    }
}