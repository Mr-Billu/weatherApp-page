let btn = document.getElementById("search-btn")
let details = document.querySelector(".details")

btn.addEventListener("click", function(){
    let input  = document.getElementById("city-input").value 
    let apiKey = "5922a908ee8600aa87adb425f86d7cb8"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`
    let alert = document.getElementById("alert")
    if(input === ""){
        let alert3 = `<div>
        <h3>You didn't search any city</h3>
        </div>`
        details.innerHTML = alert3;
        details.style.display =" block"
        details.style.alignContent = "center"
        alert.style.display = "block"
        alert.style.letterSpacing = "0.5px"
        
        setTimeout(() => {
            alert.style.display ="none"
        }, 3000);
        details.classList.add("Animation");    
        return;
    } 
    
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        if(data.cod !== 200){
            let alert2 =  `<div>
            <h3> Incorrect City Name </h3>
            <p> City not Found</p> 
            </div>`
            
            alert.style.display ="block"
            alert.textContent ="Invalid input"
            alert.style.letterSpacing = "1px"
            details.innerHTML = alert2
            details.style.display = "block"
            details.style.textAlign = "center"
            details.style.alignContent = "center" 
            
            setTimeout(() => {
                alert.style.display = "none "
                
            }, 3000);
            
            details.classList.add("Animation");    
            
        }

        let city = data.name
        let temp = data.main.temp
        let wetDesc = data.weather[0].description
        let humidity =data.main.humidity
        let windSpeed = data.wind.speed
        
        let emoji =""
        if(temp < 20){
            emoji = "🥶"
        }
        
        
        let humEmoji = ""
        if(humidity >=  80){
            humEmoji = "💦"
        }
        else if(humidity >= 50){
            humEmoji ="🌫️	"
        }
        else {
            humEmoji ="💨"
        }
        

        let wEmoji = ""
        
        if(wetDesc.includes("clear")){
            wEmoji ="☀"
        } else if(wetDesc.includes("cloud")){
            wEmoji ="☁"
            
        }
        else if(wetDesc.includes("rain")){
            
            wEmoji ="🌧"
        }
        else if(wetDesc.includes("snow")){
            
            wEmoji ="❄🌨"
        }
        else if(wetDesc.includes("thunder")){
            
            wEmoji ="⛈"
        }
        else if(wetDesc.includes("mist") || wetDesc.includes("fog")){
            wEmoji ="🌁"
            
        }
        else{
            wEmoji ="☀"
            
        }
        
                 let results = `<div>
                         <p><strong>City Name:</strong>${city} </p>
                         <p><strong>Temperature:</strong> ${temp} °C ${emoji}</p>
                         <p><strong>Description:</strong>${wetDesc} ${wEmoji} </p>
                         <p><strong>Humidity:</strong>${humidity} % ${humEmoji}</p>
                         <p><strong>Wind-Speed:</strong>${windSpeed} m/s<sup>2 </p>
                         </div>`
                         
                         
        details.innerHTML = results;
           details.style.display="block"      
                         details.classList.add("Animation");    
    
    })
    .catch(err => {
        console.error("Something went wrong", Error)
    })

})





