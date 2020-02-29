var ticks = {};
var routeIds = [];
var routeInfo = [];

$.ajax({
    dataType: "json",
    url: "json/ticks.json",
    //url: "https://www.mountainproject.com/data/get-ticks?email=hello@edwdavis.com&key=112870487-dda0dad514d5fd16874b082b337c7176",
    success: function (data) {     
        parseTicks(data);
        getRoutes();
    }
  });

function parseTicks(data){
    ticks.hardest = data.hardest;
    ticks.average = data.average;
    ticks.ticks = data.ticks;
    $.each(ticks.ticks, function(idx, val){
        routeIds.push(val.routeId);
    });
};

function getRoutes(){
    const routeUrl = "https://www.mountainproject.com/data/get-routes?routeIds=".concat(routeIds.toString().concat("&key=112870487-dda0dad514d5fd16874b082b337c7176"));
    $.ajax({
        dataType: "json",
        url: "/json/routes.json",
        //url: routeUrl,
        success: function (data) {     
            parseRoutes(data);
            console.log(routeUrl);
        }
      });
}

function parseRoutes(json) {
    $.each(json.routes, function(idx, val){
        routeInfo.push(val);
    });
    //console.log('Success parsing routes!')
    makeTickTable();
};

function makeTickTable() {
    const headers = ['Date', 'Route Name', 'YDS Rating', 'Type', 'Ascent Style', 'Redpoint/Pinkpoint']
    var thr = $('<tr class="thing">');

    $.each(headers, function(index, value){
        thr.append('<td class="border-b-2 font-bold px-4 pt-6">'+value+'</td>');
        //console.log(thr);
    });
    thr.append('</tr>')
    $('thead').append(thr);

    var tr;
        for (var i = 0; i < ticks.ticks.length; i++) {
            if (ticks.ticks[i].style == "Lead") {
                tr = $('<tr/>');
                tr.append('<td class="border-b px-4 py-2">' + ticks.ticks[i].date + "</td>");
                for (var j = 0; j < routeInfo.length; j++) {
                    if (ticks.ticks[i].routeId == routeInfo[j].id){
                        tr.append('<td class="border-b px-4 py-2">' + routeInfo[j].name + "</td>");
                        tr.append('<td class="border-b px-4 py-2">' + routeInfo[j].rating + "</td>");
                        tr.append('<td class="border-b px-4 py-2">' + routeInfo[j].type + "</td>");
                    }
                };
                tr.append('<td class="border-b px-4 py-2">' + ticks.ticks[i].style + "</td>");
                tr.append('<td class="border-b px-4 py-2">' + ticks.ticks[i].leadStyle + "</td>");
                $('tbody').append(tr);
            }
        };
};