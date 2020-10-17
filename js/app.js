    getLocation();

    async function postData(url) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'user-key': '292fab90775dbb348b747b02c6c96cad'
       }
    });
    
    return response.json(); 
  }

    function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        alert("Geolocation is not supported by this browser.");
      }
    }
    
    
    async function showPosition(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      await postData('https://developers.zomato.com/api/v2.1/search?q=noodles&count=100&lat='+lat+'&lon='+long)
      .then(data => {
        //console.log(data); 
        let row = document.querySelector('#search_listing');
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
    
            wrap.append(thumb, title);
            col.append(wrap)
    
            row.append(col);
         }
      });
    }
 

   
   
      
        
           
      
      
    