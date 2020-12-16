import express from 'express';
import Cors from 'cors'
import fetch from "node-fetch";


//Express JS to handle API endpoints
const app = express();

//App running on port set in environment variables or if not set on port 8001
const port = process.env.PORT || 8001

//JSON parsing using express JS
app.use(express.json())

// Enabling Cross-Origin Resource Sharing (CORS) for accessibility to everyone.
app.use(Cors());

//Asynchronous function to handle API
async function movieInfo()  {
  
    
  //Make API request to grab latest customer data.
    app.get('/api/recommendation/highest_rated', async(req,res) => {
    const customer_data = await fetch('https://anna-codechallenge.s3.us-east-2.amazonaws.com/customers.json')
    const customer_json = await customer_data.json();

    //HashMap to store customer Data
    var customerMap = new Map();

    //Load customer data to a hashMap with key => customerId and Value => Last_login_date
    for (var i = 0 ; i < customer_json.length ; i++) {
        customerMap.set(customer_json[i].id,customer_json[i].last_login_date);
    }

    // Get the Earliest Date URL from URL
    var date = req.query.earliest;
    var d1 = new Date(date);
    var customerID = []

    // Check if the date is equal to or later than the earliest date
    for ( const [key,value] of customerMap.entries()) {
        var d2 = new Date(value)
        if(d2.getTime() >= d1.getTime()){
            customerID.push(key);
        }
    }
  

    //Make API request to grab latest recommendation data
    const user_data = await fetch('https://anna-codechallenge.s3.us-east-2.amazonaws.com/recommender.json')
    const user_json = await user_data.json();
    
    //HashMap to store recommendation data.
    var userMap = new Map();

    //Load recommendation data into a hashMap with key => customerId and value => scores
    for ( var i = 0; i < user_json.length ; i++) {
         userMap.set(user_json[i].customer_id,user_json[i].scores);
    }

    var horrorSum = 0;
    var comedySum = 0;
    var actionSum = 0;
    var count = 0;
    var leng = userMap.size;
    customerID.forEach(collectGenre);
    
    //Calculate sum to get Arithmetic Mean (Mean = Sum/number of data points)
    function collectGenre(value) {
        if(userMap.has(value)) {
            var val = userMap.get(value);
            horrorSum += val['Horror']
            comedySum += val['Comedy']
            actionSum += val['Action']
            count++;
            userMap.delete(value);
        }      
    }

    //MeanScores of customers with login date equal to or greater than specified.
    var meanScores = `{"scores":{"Horror":${horrorSum/count},"Action":${actionSum/count},"Comedy":${comedySum/count}}}`
    
    //Calculation of remaining category values if date is not mentioned
    for (const key of userMap.keys()) {
        var val = userMap.get(key);
        horrorSum+=val['Horror']
        comedySum+=val['Comedy']
        actionSum+=val['Action']
    }

    //MeanScores of customers with no earliest URL parameter.
    var totalMeanScores = `{"scores":{"Horror":${horrorSum/leng},"Action":${actionSum/leng},"Comedy":${comedySum/leng}}}`
   
      //If earliest URL parameter is specified. 
      if(req.query.earliest) {
          try {
        res.status(200).send(JSON.parse(meanScores));
          }
          catch(err) {
              res.status(500).send("500 Internal Server Error! Date is beyond Range or Invalid");
          }
      }
      //If no parameter is sent.
      else {
          try {
          res.status(200).send(JSON.parse(totalMeanScores));
          }
          catch(err) {
            res.status(500).send("500 Internal Server Error!");
        }

      }
    
});
}

movieInfo();

//Make the APP listen on the specified port.
app.listen(port, () => console.log(`listening on localhost : ${port}`));



