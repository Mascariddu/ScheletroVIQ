window.onload = function(){

    Plotly.d3.csv("sondaggi.csv",function(error,data){
        if(error){
            console.log("Error while loading data file.");
            return;
        }

        let colors = {
            "Liberi e Uguali" : "crimson",
            "PD": "crimson",
            "Più Europa": "crimson",
            "Altre liste CSX": "crimson",
            "Lega" : "green",
            "Forza Italia" : "dodgerblue",
            "Fratelli d'Italia" : "dodgerblue",
            "Noi con l'Italia" : "dodgerblue",
            "M5S" : "gold",
            "Altre liste" : "gray",
            "Indecisi" : "black"
        };

        // Line plot - Popolazione

        let traces = [];
        for(let i=0; i<data.length; ++i){
            let j = 0;
            let risposta = 1-data[i].Indecisi/100;
            for(let p in data[i]){
                if( p != "Data") {
                    if(i==0){ // create traces
                        traces.push({
                            name: p,
                            x: [],
                            y: [],
                            type: "scatter",
                            line : {
                                color: colors[p]
                            }
                        });
                    }

                    traces[j].x.push(data[i].Data);
                    traces[j].y.push(data[i][p]*(p=="Indecisi"?1:risposta));
                    if(data[i][p] < 5){
                        traces[j].opacity = 0.5;
                    }else{
                        traces[j].opacity = 1.0;
                    }
                    j = j + 1;
                }
            }
        }

        traces.sort( (a,b) => b.y.slice(-1)-a.y.slice(-1));


        let layout = {
            width: 800, height: 600,
            margin: {l:50,t:60,b:50,r:60},
            title:"Intenzioni di voto 2018",
            xaxis : {title:"Data rilevazione"},
            yaxis : {title:"Percentuale della Popolazione"},
        };

        Plotly.plot("graph",traces,layout,{displayModeBar: false});


        traces = [];
        for(let i=0; i<data.length; ++i){
            let j = 0;
            for(let p in data[i]){
                let risposta = 1-data[i].Indecisi/100;
                if( p != "Data" ) {
                    if(i==0){ // create traces
                        let t = {
                            name: p,
                            x: [],
                            y: [],
                            type: "scatter",
                            line : {
                                color: colors[p]
                            }
                        };
                        if( p === "Indecisi") {
                            t.yaxis = "y2";
                        }
                        traces.push(t);
                    }

                    traces[j].x.push(data[i].Data);
                    traces[j].y.push(data[i][p]);
                    j = j + 1;
                }
            }
        }

        // sort in descenting order
        traces.sort( (a,b) => b.y.slice(-1)-a.y.slice(-1));


        layout = {
            width: 800, height: 600,
            margin: {l:50,t:60,b:50,r:60},
            title:"Intenzioni di voto 2018",
            xaxis : {title:"Data rilevazione"},
            yaxis : {title:"Percentuale di preferenze",
                     domain: [0,0.45]},
            yaxis2 : {title:"Percentuale della popolazione",
                domain: [0.55,1.00],range:[0,40]}
        };

        Plotly.plot("graph1",traces,layout,{displayModeBar: false});

    })

};