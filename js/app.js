    
     var elmnt = document.getElementById("header");
     var search, lat, long;

     window.addEventListener('load', (event) => {
        geo();
       });



     function geo(){
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        alert("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
     lat = position.coords.latitude;
     long = position.coords.longitude;
    }

    function searchData(event){
        event.preventDefault();
        search = document.getElementById("search-input").value;
        if(!search){
            alert("Enter keywords to search");
            return false;
        }
        else{
            getData();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $("html, body").animate({ scrollTop: elmnt.offsetHeight }, "slow");
            document.getElementById("body-banner").style.display = "inherit";
           
        }
      }

    async function postData(url) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'user-key': '292fab90775dbb348b747b02c6c96cad'
       }
    });
    
    return response.json(); 
  }
    
  var fullData;
    function getData(){
    postData('https://developers.zomato.com/api/v2.1/search?q='+search+'&count=100&lat='+lat+'&lon='+long)
      .then(data => {
        fullData = data;
        //console.log(data); 
        let row = document.querySelector('#search_listing');
        row.innerHTML = '';
        let h3 = document.createElement("h2");
        h3.setAttribute("class","search-header")
        h3.innerHTML = "Search Result";
        row.append(h3);

        //if the search keyword has results
        if(data['results_shown'] > 0){
        for(i=0; i < data['restaurants'].length; i++){
            let col = document.createElement("div");
            col.setAttribute("class","col-md-3");
    
            let wrap = document.createElement("div");
            wrap.setAttribute("class","wrapper");
    
            let thumb = document.createElement("div");
            let img = document.createElement("img");
            img.setAttribute("class","img-responsive center-block");
            if(data['restaurants'][i]['restaurant']['thumb']){
            img.setAttribute("src",data['restaurants'][i]['restaurant']['thumb']);
            }else{
              img.setAttribute("src","img/no_image.png");
              img.setAttribute("style","width:200px");
            }
            thumb.append(img);
    
            let title = document.createElement("div");
            title.setAttribute("class","title")
            title.innerHTML = data['restaurants'][i]['restaurant']['name'];

            let ratings = document.createElement("div");
            ratings.setAttribute("class","ratings")
            ratings.innerHTML =`Rating: ${data['restaurants'][i]['restaurant']['user_rating']['aggregate_rating']} (${data['restaurants'][i]['restaurant']['user_rating']['votes']} votes)`;
            
            let btn_div = document.createElement("div");
            let btn = document.createElement("span");
          
            btn.setAttribute("class","moreinfo btn btn-primary");
            btn.setAttribute("onclick",`moreInfo(${data['restaurants'][i]['restaurant']['id']})`);
            
           
          /*   btn.setAttribute("data-id",data['restaurants'][i]['restaurant']['id']);
            btn.setAttribute("data-featured-img",data['restaurants'][i]['restaurant']['featured_image']);
            btn.setAttribute("data-cost",data['restaurants'][i]['restaurant']['average_cost_for_two']);
            btn.setAttribute("data-phone",data['restaurants'][i]['restaurant']['phone_numbers']); */
            btn.innerText = "More Info";
            btn_div.append(btn);

            wrap.append(thumb, title, ratings, btn_div);
            col.append(wrap)
    
            row.append(col);
         }
      }else{
        document.getElementById("body-banner").style.display = "none";
        let row = document.querySelector('#search_listing');
        row.innerHTML = '';

        let h2 = document.createElement("h2");
        h2.setAttribute("class","search-header")
        h2.innerHTML = "Search Result";

        let h3 = document.createElement("h3");
        h3.setAttribute("style","text-align:center; color:brown")
        h3.innerHTML = "Sorry no results found !!";

        row.append(h2, h3);
      }

      });
      
    }
function moreInfo(id){
    var name, image, cost, phone, address, timings;
    //alert(id);
    console.log(fullData);
    for(i=0; i < fullData['restaurants'].length; i++){
        if(id == fullData['restaurants'][i]['restaurant']['id']){
            name = fullData['restaurants'][i]['restaurant']['name'];
            image = fullData['restaurants'][i]['restaurant']['featured_image'];
            cost = fullData['restaurants'][i]['restaurant']['average_cost_for_two'];
            phone = fullData['restaurants'][i]['restaurant']['phone_numbers']; 
            address = fullData['restaurants'][i]['restaurant']['location']['address']
            timings = fullData['restaurants'][i]['restaurant']['timings'];
            break;
        }
    }
    document.getElementById("modal-title").innerHTML = name;
    document.getElementById("featured_img").setAttribute("src", image)
    document.getElementById("modal-address").innerHTML = address
    document.getElementById("modal-phone").innerHTML = phone;
    document.getElementById("modal-timings").innerHTML = timings; 
    document.getElementById("modal-cost").innerHTML = `Rs.${cost}`; 
    $('#myModal').modal('show');
}
    
   


      
    

  
 

   
   
      
        
           
      
      
    