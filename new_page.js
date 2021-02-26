
/*
var ourRequest = new XMLHttpRequest();

ourRequest.open('GET', 'https://steamcommunity.com/profiles/76561198867785639/inventory/json/753/6');
ourRequest.onload = function(){
    
    console.log(ourRequest.responseText);
};

ourRequest.send(); */

/*
fetch('https://steamcommunity.com/profiles/76561198867785639/inventory/json/753/6')
    .then(function(u){ return u.json();})
    .then(function(data){

        let output = "<ul>";

        console.log(data.rgDescriptions);

        for (x in data.rgDescriptions){
        

                output += `<li>Game_name:  ${data.rgDescriptions[x]["type"]} || Card_name:  ${data.rgDescriptions[x]["name"]} </li>`
           
        }
        
        output += "</ul>";

        document.getElementById("demo").innerHTML = output;

        });*/


var name1 = "lale"
var name2 = "papatya"
var dates = [];

fetch('https://steamcommunity.com/profiles/76561198867785639/inventory/json/753/6')
    .then(function(u){ return u.json();})
    .then(function(data){

        let output = "<ul>";

        /*console.log(data); */

        var inv_inv = data.rgInventory;
        var inv_data = data.rgDescriptions;

        for (item in inv_data){

            if (name1 != inv_data[item]["type"]){
                name1 = inv_data[item]["type"];
            }

            if (name2 != inv_data[item]["name"]){
                name2 = inv_data[item]["name"];
            

            if (inv_data[item]["marketable"] == 0){
                var count_dates = 0;

                for ( dat in  inv_data){
                    if (inv_data[dat]["market_hash_name"] == inv_data[item]["market_hash_name"]){
                        if (inv_data[dat]["marketable"] == 0){

                            var classid = inv_data[dat]["classid"];
                            var instanceid = inv_data[dat]["instanceid"];

                            for (inst in inv_inv){
                                if (inv_inv[inst]["classid"] == classid && inv_inv[inst]["instanceid"] == instanceid){
                                    count_dates += 1;

                                    dates.push(inv_data[dat]["cache_expiration"] ,count_dates);
                                    count_dates = 0;
                                }

                            }
                        }
                    }
                }


            }

            classid = inv_data[item]["classid"];

            var count_num = 0;
            var count_data = 0;

            for (i in inv_inv){

                if ( inv_inv[i]["classid"] == classid){
                    count_num += 1;

                    if (inv_inv[i]["instanceid"] == '0'){
                        count_data += 1;
                    }


                }
            }

            var inv_game_name = inv_data[item]["type"].slice(0, -13);
            var inv_card_name = inv_data[item]["name"];
            var inv_in_inv = count_num;
            var inv_off_sale = count_data;

            console.log(inv_game_name);
            console.log(inv_card_name);
            console.log(inv_in_inv);
            console.log(inv_off_sale);
            console.log("____________________________________________________________________");


            output += `<li> ${inv_game_name} -- ${inv_card_name} -- ${inv_in_inv} / ${inv_off_sale} `


        }
        

            

       

        }
        
       output += "</ul>";

       document.getElementById("demo").innerHTML += output;
        

        });
        