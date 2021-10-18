function request() {
    var dataInit = formatDate(date)
    var dataEnd = formatDate(dateFinal)
    var data  = JSON.parse(DashboardBlock.input.ctx.headers);
    var host = data.host;
    var body = {"deviceId": DashboardBlock.input.ctx.childrenId.id, "init": dataInit, "end": dataEnd, "attributesX":[selectX], "attributesY":[selectY]}
    var jsonBody = JSON.stringify(body)
    var xhr = new XMLHttpRequest();
    var url = "https://" + host + "/api/validate-login";  
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json"); 
    var authorization = DashboardBlock.input.ctx.authorization; 
    xhr.setRequestHeader("Authorization","Bearer " +authorization); 
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {   
        var objResponse = JSON.parse(xhr.responseText);
        chart(objResponse)
      }
    };  
    
    xhr.send(jsonBody);
  }
