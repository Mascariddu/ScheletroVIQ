
window.onload = function(){

    Plotly.d3.csv("analfabeti.csv",function(error,data){
        if(error){
            console.log("Error while loading data file.")
        }
        console.log("Loaded " + data.length + " rows");

        let x = [];
        let y = [];
        let l = [];
        let cols = [];
        let it_x = 0;

        let median = function(ary){
            let n = ary.length;
            if(n <= 0) return NaN;
            if( n % 2 == 0){
                return (ary[n/2-1] + ary[n/2])/2;
            }else{
                return ary[(n-1)/2];
            }
        }

        let rep = function(x,n){
            let res = [];
            for(let i=0; i<n; ++i) res.push(x);
            return res;
        }

        data.sort(function(a,b){
            return a.Valore - b.Valore;
        });

        for(let i=0; i<data.length; ++i){
            let it = data[i]["Paese"]==="Italia";
            x.push(data[i]["Valore"]/100);
            if(it) it_x = data[i]["Valore"]/100;
            y.push(it?'<span style="color: firebrick; font-weight: bold; font-size: 120%;">'+data[i]["Paese"]+'</span>':data[i]["Paese"]);
            l.push(data[i]["Paese"] + " : " + data[i]["Valore"] + "%");
            cols.push(it?"firebrick":"dodgerblue");
        }

        let med = median(x);
        let xref = rep(med,x.length);

        // Dot plot

        let traces = [{x:xref,y:y,line:{color:"darkorange",dash:"dash"},type:"scatter",mode:"lines",hoverinfo:"none"},{
            x : x,
            y : y,
            text : l,
            type : "scatter", mode:"markers",
            hoverinfo: "text",
            marker: {size:15, color:cols}
        }];

        let layout = {
            width: 800, height: 800,
            margin: {l:100,t:60,b:50,r:1},
            title:"Percentuale di analfabeti funzionali",
            xaxis: {tickformat:'%',side:"top"},
            hovermode: "closest",showlegend:false,
            annotations:[{
                text:"Median",font:{color:"darkorange"},
                arrowcolor:"darkorange",
                x:med,y:y[0],
                ax:40,ay:0
            }]
        }

        Plotly.plot("graphDot",traces,layout,{displayModeBar: false});


        // barplot

        traces = [{
            x : x,
            y : y,
            type : "bar", orientation: "h",
            marker: { color:cols}
        }];

        layout = {
            width: 800, height: 700,
            margin: {l:130,t:1,b:50,r:1},
            xaxis: {title:"Percentuale di analfabeti funzionali",tickformat:'%'},
            yaxis: {title: "Paese<br>&nbsp;<br>&nbsp;"}
        }

        Plotly.plot("graphBar",traces,layout,{displayModeBar: false});


        let da = [];
        for(let i=0; i<x.length; ++i){
            da.push({
                x: x[i],
                y: y[i],
                text:data[i]["Paese"],
                xanchor:'right',
                showarrow:false,
                font: {color:'white'}
            });
        }

        traces = [{
            x : x,
            y : y,
            type : "bar", orientation: "h",
            marker: { color:cols},
            hoverinfo: 'x'
        }];

        layout = {
            width: 800, height: 700,
            margin: {l:50,t:1,b:50,r:1},
            xaxis: {title:"Percentuale di analfabeti funzionali",tickformat:'%'},
            yaxis: {title: "Paese<br>&nbsp;<br>&nbsp;",showticklabels:false},
            annotations: da
        }
        Plotly.plot("graphBarDirect",traces,layout,{displayModeBar: false});


        // boxplot

        traces = [{
            title:"",
            y : x,
            x : rep("Analfabetismo funzionale",x.length),
            type : "box"
        },{
            x : ["Analfabetismo funzionale"],
            y : [it_x],type:"scatter",mode:"markers",
            marker:{color:"firebrick",size:15,symbol:"diamond"}
        }];

        layout = {
            width: 400, height: 600,
            margin: {l:50,t:1,b:50,r:1},
            annotations:[{
                text:"Italia: " + Math.trunc(it_x*100) + "%",font:{color:"firebrick"},
                arrowcolor:"gray",
                y:it_x, x:"Analfabetismo funzionale",
                ax:50, ay:-50,
                xshift:5, yshift:5
            }],
            showlegend: false
        }

        Plotly.plot("graphBox",traces,layout,{displayModeBar: false});

        // violin plot

        traces = [{
            title:"",
            y : x,
            x : rep("Analfabetismo funzionale",x.length),
            type : "violin"
        },{
            x : ["Analfabetismo funzionale"],
            y : [it_x],type:"scatter",mode:"markers",
            marker:{color:"firebrick",size:15,symbol:"diamond"}
        }];

        layout = {
            width: 400, height: 600,
            margin: {l:50,t:1,b:50,r:1},
            annotations:[{
                text:"Italia: " + Math.trunc(it_x*100) + "%",font:{color:"firebrick"},
                arrowcolor:"gray",
                y:it_x, x:"Analfabetismo funzionale",
                ax:50, ay:-50,
                xshift:5, yshift:5
            }],
            showlegend: false
        }

        Plotly.plot("graphViolin",traces,layout,{displayModeBar: false});


        // distribution polygon
        console.log("len x: " + x.length);

        let min = Math.min.apply(null,x)-.05;
        let max = Math.max.apply(null,x)+.05;

        let bin=[];
        let freq=[];
        for(let b=min; b<=max; b+=0.01){
            bin.push(Math.trunc(b*100)/100);
            freq.push(0);
        }

        for(let i=0; i<x.length; ++i){
            let ix = bin.indexOf(Math.trunc(x[i]*100)/100);

            freq[ix] ++;
        }


        traces = [{name:"Distribuzione",
            x : bin,
            y : freq,
            type : "scatter", mode:"lines", line: {shape:'spline'}
        }, {name:"Mediana",x:[med,med],y:[0,freq[bin.indexOf(med)]],line:{color:"darkorange",dash:"dash"},type:"scatter",mode:"lines",hoverinfo:"none"}
            ];

        it_x = Math.trunc(it_x*100)/100;
        layout = {
            width: 800, height: 300,
            margin: {l:100,t:60,b:50,r:1},
            title:"Percentuale di analfabeti funzionali",
            xaxis: {title:"Percentuale di analfabeti funzionali",tickformat:'%',side:"down"},
            yaxis: {title: "Numero di paesi"},
            annotations:[
                {text:"Italia",x:it_x,y:freq[bin.indexOf(it_x)],font:{color:"firebrick"}}
            ]
        }

        Plotly.plot("graphPoly",traces,layout,{displayModeBar: false});


    })


}