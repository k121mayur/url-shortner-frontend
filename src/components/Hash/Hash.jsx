import axios from "axios"
import { useParams } from "react-router-dom"


const Hash = () => {
    const {hash} = useParams();
    axios.get(`https://url-shortner-backend-kk8u.onrender.com/${hash}`).then((res) => {
        if (res.status === 200){
            let originalUrl = res.data
            console.log(res.data)
            if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
                originalUrl = `https://${originalUrl}`;
              }
            window.location.replace(res.data)
        } else {
            return (
                <div>Hash : {res.data}</div>
              )
        }
    })    
}

export default Hash