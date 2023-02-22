
import React, { useState, useEffect } from 'react';
// import finnhub from 'finnhib'
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['cfqkocpr01qigsfjuck0cfqkocpr01qigsfjuckg'];
api_key.apiKey = "cfqkocpr01qigsfjuck0cfqkocpr01qigsfjuckg"
const finnhubClient = new finnhub.DefaultApi()


export default function App () {

    const [data, setData] = useState(null);

    useEffect(() => {
      finnhubClient.quote("AAPL", (error, data, response) => {
        if (error) {
          console.error(error);
          return;
        }
        setData(data);
      });
const getData = async ()=>{
    
    const res =  await  fetch('finnhub.io/api/v1quote?symbol=AAPL',{
        method: 'GET',
        headers: {
            'X-Finnhub-Token' : 'cfqkocpr01qigsfjuck0cfqkocpr01qigsfjuckg',
            // 'Content-Type': 'Application/JSON'
        }
    })
    res = res.json();
    console.log(res)
    setData(res)

}
getData()

    }, []);
  
    return (
      <div>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    );
  }
