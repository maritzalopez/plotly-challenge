function init() {

  function optionChanged(id) {
      d3.json("samples.json").then((importedData) => {
      var info = importedData;
  
      var samples = importedData.samples.filter(s => s.id.toString() ===id)[0];
     
      //Slice top 10 OTU & reverse the array
      var sample_values = samples.sample_values.slice(0,10).reverse();
      var otu_ids = samples.otu_ids.slice(0,10).reverse().map(n => "otu_" + n);
      var otu_labels = samples.otu_labels.slice(0,10).reverse();
      
      //Metadata info
      var metadata = importedData.metadata.filter(s =>s.id.toString()===id)[0];
      var demoInfo = d3.select("#sample-metadata");
      demoInfo.html("");
      Object.entries(metadata).forEach((key) => {   
        demoInfo.append("h5").text(key[0]+ ": " + key[1] + "\n");    
  
      console.log(metadata);
      console.log(sample_values);
     
      var trace1 = [{
                  x: sample_values,
                  y: otu_ids,
                  type: "bar",
                  orientation: "h",
                  text: otu_labels
              }];
  
      var data1 = trace1;
  
      var layout1 = {
          height: 600,
          width: 800
      };
  
      Plotly.newPlot("bar",data1, layout1);
  
      var trace2 = [{
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: 'markers',
          text: samples.otu_labels,
          marker: {
            size: samples.sample_values,
            color: samples.otu_ids
          }
        }];
        
        var data2 = trace2;
        
        var layout2 = {
          showlegend: false,
          height: 600,
          width:900,
          xaxis: {title: "OTU IDs"}
        };
        
        Plotly.newPlot('bubble', data2, layout2);
  
  });
  });
  
    }
    
         var dropdown = d3.select("#selDataset");
        
        d3.json("samples.json").then((importedData)=> {
        console.log(importedData)
       
       importedData.names.forEach((name) => {
        dropdown.append("option").text(name).property("value");
            });
       
      //  optionChanged(importedData[0]);
    
        
    });
    }
    init();
