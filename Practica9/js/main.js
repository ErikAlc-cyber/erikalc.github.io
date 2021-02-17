      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});
      var triggers ={};

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/17oKYwgLRfRyMuV1Pa2HCcj_bxm7gLE-YYl5HEOzWi2Y/edit?usp=sharing';

      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300,
                        'is3D': true
                      };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }

      function init() {
        Tabletop.init( { key: publicSpreadsheetUrl,
                         callback: showInfo,
                         simpleSheet: true } )
      }

      function showInfo(data, tabletop) {
        alert('Successfully processed!')
        console.log(data);
      }

    triggers.clicks = function(){
  
      /*little easter egg*/
      document.addEventListener('keyup', function(e){
      if (e.which === 17) {
        cat();
      } 
      else if (e.which === 13) {
        document.location.reload();
      }
      });
    }

    /*Easter egg*/
function cat() {
  console.log("nya!");
  var audio = document.getElementById("audio");
  audio.play();
  setTimeout(function(){
        audio.pause();
      },10000);
}

  triggers.clicks();
  window.addEventListener('DOMContentLoaded', init)