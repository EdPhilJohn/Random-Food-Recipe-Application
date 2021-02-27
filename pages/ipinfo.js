
import 'bootswatch/dist/flatly/bootstrap.min.css';
export default function IPInfo({ data }) {
    let proxyOutput = "You are using "
    data.proxy.proxy ? proxyOutput = proxyOutput + 'Proxy' : proxyOutput = proxyOutput + ' no Proxy'
    data.proxy.vpn ? proxyOutput =', VPN ' : proxyOutput = proxyOutput + ', no VPN '
    data.proxy.tor ? proxyOutput = 'and Tor.' : proxyOutput = proxyOutput + 'and no Tor.'
    let imgsrc = "https://maps.googleapis.com/maps/api/staticmap?center=" + data.location.lat + ',' + data.location.lng + "&markers=color:red%7Clabel:C%7C40.718217,-73.998284&zoom=12&size=600x400&key=API-KEY"
    let locSrc = "Latitude " + data.location.lat  + ",Longitude " + data.location.lng
    
    return (<div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/projects/ipinfo">IP Information</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor02">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Back To Main Site</a>
                    </li>
                </ul>
                </div>
</nav>
        <div className="container">
            <br/>
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Public IP Details</h5>
                        
                    </div>
                    <p class="mb-1">IP Address - <b>{data.ip}</b></p>
                    <p class="mb-1">Internet Service Provider - <b>{data.isp}</b> <button type="button"  class="btn btn-link"><a target="_blank" href={data.as.domain}>Click to see full site</a></button> </p>
                    <p class="text-danger">{proxyOutput}</p>
              </a>
                
            </div>
            <br/>
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <img data-toggle="tooltip" data-placement="top" title={locSrc} src={imgsrc} />
                        
                    </div>
                    <hr/>
                    <h4 class="text-danger">You are located at {data.location.city}, {data.location.region}, {data.location.country}</h4>
                    
                </a>

            </div>
       
            
        </div>
        </div>)
}
export const getStaticProps = async() => {
    const response =await fetch('https://geo.ipify.org/api/v1?apiKey=API_KEY')
    const data = await response.json()
    return {
        props: {
            data
        }
    }
}