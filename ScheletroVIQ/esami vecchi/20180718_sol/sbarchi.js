
window.onload = function(){

    Plotly.d3.json("sbarchi.json",function(error,data){
        if(error){
            console.log("Error while loading data file.");
            return;
        }

        // Dot plot

        let traces = [];
        let annotations = [];

        for(let y in data.sbarchi){
            if(data.sbarchi.hasOwnProperty(y)) {
                let trace = {
                    name: y,
                    y: data.sbarchi[y],
                    x: data.mesi,
                    type: "scatter"
                };
                traces.push(trace);
                let n = data.sbarchi[y].length;
                let annotate = {
                    y: data.sbarchi[y][n-1],
                    x: data.mesi[n-1],
                    text:y,
                    showarrow:false,
                    xanchor:"left",xshift:5
                };
                annotations.push(annotate)
            }
        }

        let layout = {
            width: 1000, height: 600,
            margin: {l:50,t:60,b:50,r:60},
            title:"Andamento sbarchi",
            annotations : annotations
        };

        Plotly.plot("graph",traces,layout,{displayModeBar: false});



        /**** summary by semester ****/

        let trace = {
            y: [],
            x: [],
            type: "scatter"
        };
        traces = [trace];

        for(let y in data.sbarchi){
            if(data.sbarchi.hasOwnProperty(y)) {
                let n = data.sbarchi[y].length;
                let semesters = [0,null];
                for(let i=0; i<n; ++i){
                    semesters[Math.trunc(i/6)]+=data.sbarchi[y][i];
                }
                trace.y = trace.y.concat(semesters);
                trace.x = trace.x.concat([y + " S1",y+" S2"]);
            }
        }
        layout = {
            width: 1000, height: 600,
            margin: {l:50,t:60,b:50,r:60},
            yaxis : {range:[0,120000]},
            title:"Andamento sbarchi (per semestre)"
        };

        Plotly.plot("graphSem",traces,layout,{displayModeBar: false});

        traces = [];
        annotations = [];
        for(let y in data.sbarchi){
            if(data.sbarchi.hasOwnProperty(y)) {
                let n = data.sbarchi[y].length;
                for(let i=0; i<n; ++i){
                    let trace;
                    if(traces.length<=i){
                        trace = {
                            name : data.mesi[i],
                            y : [],
                            x : []
                        };
                        traces.push(trace);
                        annotations.push({
                            x : y, y: data.sbarchi[y][i],
                            text :  data.mesi[i],
                            xanchor: "right",
                            showarrow: false
                        })
                    }else{
                        trace = traces[i];
                    }
                    trace.x.push(y);
                    trace.y.push(data.sbarchi[y][i]);
                }
            }
        }
        layout = {
            width: 1000, height: 600,
            margin: {l:50,t:60,b:50,r:60},
            xaxis : { type:'category' },
            annotations : annotations,
            title:"Andamento sbarchi"
        };

        Plotly.plot("graphMese",traces,layout,{displayModeBar: false});

    })

};