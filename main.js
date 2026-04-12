// global variables
var scriptName;
var counter = 0;

//---------------------------------------------------------------------------------------
function doDateTime() 
{
    var tokens;
    var response;
    var serverDateTime;
    var xhttp = new XMLHttpRequest();

    document.getElementById("serverResponse").innerHTML = "Processing, one moment please...";  

    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            response = xhttp.responseText;
            console.log(response);

            var resp = document.getElementById("serverResponse");  

            if (response.includes("OK!") == true)
            {
                tokens = response.split("!");
                serverDateTime = tokens[1].trim();

                if (counter == 0)
                {
                    resp.style.color = "white";
                    resp.style.backgroundColor = "blue";
                }
                else if (counter == 1)
                {
                    resp.style.color = "black";
                    resp.style.backgroundColor = "orange";
                }
                else if (counter == 2)
                {
                    resp.style.color = "white";
                    resp.style.backgroundColor = "green";
                }
                else if (counter == 3)
                {
                    resp.style.color = "black";
                    resp.style.backgroundColor = "cyan";
                }

                counter++;
                if (counter >= 4)
                {
                    counter = 0;
                }

                resp.innerHTML = serverDateTime;  
            }
            else if (response.includes("ERROR") == true)
            {
                resp.style.color = "white";
                resp.style.backgroundColor = "red";
                resp.innerHTML = response;  
            }
            else
            {
                resp.style.color = "black";
                resp.style.backgroundColor = "yellow";
                resp.innerHTML = response;  
            }
        }
    };

    scriptName = "cgi-bin/getTimeDB.cgi";

    xhttp.open("POST", scriptName, true);
    xhttp.send();
}


//---------------------------------------------------------------------------------------------------------------
function getAllRecords()
{
    var tokens;
    var response;
    var headerString;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            response = xhttp.responseText;
            parsedData = JSON.parse(response);

            var myWindow = window.open("", "_blank");

            myWindow.document.write('<table border="2" width="100%" style="text-align:center" cellspacing="10" cellpadding="5">');
            myWindow.document.write('<center>');

            headerString = "<h1>LIST SERVER INFO REQUESTS</h1>";
            myWindow.document.write(headerString);

            myWindow.document.write('</center>');
            myWindow.document.write('<th> id </th>');
            myWindow.document.write('<th> name </th>');
            myWindow.document.write('<th> info </th>');
            myWindow.document.write('<th> cmd </th>');
            myWindow.document.write('<th> date </th>');
            myWindow.document.write('<tbody></tbody>');

            parsedData.forEach(json_data_set => {
                var tr = myWindow.document.createElement("tr");

                Object.keys(json_data_set).forEach(key => {
                    var td = myWindow.document.createElement("td");
                    td.innerText = json_data_set[key];
                    tr.appendChild(td);
                });

                myWindow.document.querySelector("tbody").appendChild(tr);
            });
        }
    };

    scriptName = "cgi-bin/getTimeDBJSON.cgi";

    xhttp.open("POST", scriptName, true);
    xhttp.send();
}