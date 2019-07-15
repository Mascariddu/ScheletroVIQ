//ESEMPIO BARPLOT

let categorie = [];
let retribuzione = [];

for(let i = 0; i < csv.length; i++){

    categorie.push(csv[i].Categoria);
    retribuzione.push(csv[i].Retribuzione);

}

let colori = [];
let label = [];

for(let i = 0; i<csv.length; i++){

    if(csv[i].Tipo == "Livello")
        colori.push("green");
    else if(csv[i].Tipo == "Media")
        colori.push("red");
    else if(csv[i].Tipo == "Disciplina")
        colori.push("gold");

    label.push(csv[i].Categoria+ " "+csv[i].Retribuzione+"$");
}

let tracce = [{

    x: retribuzione,
    y: categorie,
    type: "bar",
    orientation: "h",
    //hoverinfo : "text",
    marker : {
        color : colori
    }

}]

let layout = {

    title : "Reddito medio prima occupazione dei laureati",
    height : 500,
    width : 600,
    margin: {t: 60, b: 50, l: 180, r: 10},
    xaxis : {
        ticksuffix : "$"
    }

}

Plotly.plot("Soluzione1",tracce,layout);

//ESEMPIO DOTPLOT CON BARRE ORIZZONTALI
let retribuzione2 = [];
let discipline = [];
let lauree = [];
let nomiLauree = [];
let media;


for(let i=0; i<csv.length;i++){

    if(csv[i].Tipo =="Disciplina") {
        retribuzione2.push(csv[i].Retribuzione);
        discipline.push(csv[i].Categoria);
    }

    else if(csv[i].Tipo =="Livello") {
        lauree.push(csv[i].Retribuzione);
        nomiLauree.push(csv[i].Categoria);
    }

    else if(csv[i].Tipo == "Media")
        media = +csv[i].Retribuzione;
}

let traces = [{

    name: "Discipline",
    x: retribuzione2,
    y: discipline,
    type: "scatter",
    mode: "markers",
    marker: {

        color: "olive",
        size: 8
    }
}
]

let color = ["gold","orange","blue"];

function aggiunta(nome,valore,colore){

    let valori = [];

    for(let i= 0; i< discipline.length; i++)
        valori.push(valore);

    return {
        name : nome,
        x: valori,
        y: discipline,
        type : "scatter",
        orientation : "h",
        mode: "lines",
        lines : {
            color : colore
        }
    }
}

traces.push(aggiunta("Media",media,color[2]));
for(let i = 0; i< lauree.length; i++){
    traces.push(aggiunta(nomiLauree[i],lauree[i],color[i]));
}

Plotly.plot("soluzione2",traces,layout);

//ESEMPIO SCATTER CON RICALCOLO DI PERCENTUALE
let traces = [];
let ro = csv[0];

let partiti = ["Liberi e Uguali",
    "PD","Più Europa",
    "Altre liste CSX",
    "Lega",
    "Forza Italia",
    "Fratelli d'Italia",
    "Noi con l'Italia",
    "M5S",
    "Altre liste",
    "Indecisi"];

let colori = ["red","red","red","red","green","blue","blue","blue","gold","grey","black"];

for(let i = 0; i< csv.length; i++){

    let row = csv[i];
    let j = 0;

    for(let h = 0; h<partiti.length; h++){
        if(partiti[i] != "Data" && i==0) {
            traces.push({
                name: partiti[h],
                x: [],
                y: [],
                type: "scatter",
                text : partiti[h]+ " "+row[partiti[h]] + "%",
                hoverinfo : "text",
                line: {
                    color: colori[h]
                }
            })
        }

        traces[j].x.push(row.Data);
        let valore = row[partiti[h]]*(1-row.Indecisi/100);
        if(partiti[h] == "Indecisi")
            traces[j].y.push(row[partiti[h]]);
        else
            traces[j].y.push(valore);
        j++;
    }
}

let layout = {

    title : "Evoluzione popolarità partiti polititci (2018)",
    width: 800, height: 600,
    margin: {l:50,t:60,b:50,r:60},
    xaxis : {
        title : "Data"
    },
    yaxis : {
        title : "Percentuale votanti"
    }
}

Plotly.plot("sol1",traces,layout);

//SCATTER CON X CONDIVISA E DUE GRAFICI DIVERSI
let tracce = [];

for(let i = 0; i< csv.length; i++){

    let j = 0;
    let row = csv[i];

    for(let h = 0; h<partiti.length; h++){
        if(partiti[i] != "Data") {
            if(i == 0) {
                if(partiti[h] == "Indecisi"){
                    tracce.push({
                        name: partiti[h],
                        x: [],
                        y: [],
                        type: "scatter",
                        yaxis : "y2",
                        text : partiti[h]+ " "+row[partiti[h]] + "%",
                        hoverinfo : "text",
                        line: {
                            color: colori[h]
                        }
                    })
                }else {
                    tracce.push({
                        name: partiti[h],
                        x: [],
                        y: [],
                        type: "scatter",
                        text : partiti[h]+ " "+row[partiti[h]] + "%",
                        hoverinfo : "text",
                        line: {
                            color: colori[h]
                        }
                    })
                }
            }

            tracce[j].x.push(csv[i].Data);
            tracce[j].y.push(csv[i][partiti[h]]);
            j++;
        }
    }
}

layout = {
    title: "Evoluzione popolarità partiti polititci (2018)",
    width: 800, height: 600,
    margin: {l: 50, t: 60, b: 50, r: 60},
    xaxis: {
        title: "Data"
    },
    yaxis: {
        title: "Percentuale votanti",
        domain: [0,.45]
    },
    yaxis2 : {
        title : "Percentuale della popolazione",
        domain : [.55, 1],
        range : [0,40]
    }
}

Plotly.plot("sol2",tracce,layout);

//BARPLOT CON DIRECT LABELLING
for(let i = 0; i<valori.length; i++){

    da.push({
        x : valori[i],
        y : paesi[i],
        text : paesi[i],
        showarrow : false,
        xanchor : 'right',
        font : {
            color : "white",
            size : 10
        }
    })
}

traces = [];

traces = [{

    x: valori,
    y: paesi,
    type: "bar",
    orientation: "h",
    //hoverinfo : "text",
    marker : {
        color: colori
    },
}]

layout = {

    title : "Analfabeti funzionali",
    height : 800,
    width : 800,
    margin: {l:50,t:50,b:50,r:1},
    xaxis : {
        ticksuffix:'%'
    },
    yaxis : {
        showticklabels : false
    },
    annotations : da

}

//BOX PLOT
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

//VIOLIN PLOT
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

//POLIGONO DI FREQUENZA
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
    yaxis: {title: "NumEro di paesi"},
    annotations:[
        {text:"Italia",x:it_x,y:freq[bin.indexOf(it_x)],font:{color:"firebrick"}}
    ]
}

//SCATTER CON DIRECT LABELLING
let da = [];

colori = ["rgb(31, 119, 180)","rgb(255, 127, 14)","rgb(44, 160, 44)","rgb(214, 39, 40)",
    "rgb(148, 103, 189)","rgb(140, 86, 75)","rgb(227, 119, 194)","rgb(127, 127, 127)"];

for(names in json){

    let y = 0;

    if(names == "Snapchat")
        y = -10;

    da.push({
        x : json[names].date[5],
        y : json[names].measure[5],
        text : names,
        xanchor : 'left',
        showarrow : false,
        xshift : 5,
        yshift : y,
        font : {
            color : colori.pop()
        }
    })
}

layout = {
    title: "Evoluzione audience dei social",
    width: 800, height: 600,
    margin: {l: 50, t: 60, b: 50, r: 60},
    showlegend : false,
    yaxis: {
        title: "Valori",
        ticksuffix : "M",
    },
    xaxis: {
        title: "Date",
        type : "date"
    },
    annotations : da
}