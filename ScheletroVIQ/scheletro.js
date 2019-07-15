<p  class="hint">Soluzione 1: </p>
<div id = "sol1"></div>
    <p  class="hint">Soluzione 2: </p>
<div id = "sol2"></div>
    <p  class="hint">Soluzione 3: </p>
<div id = "sol3"></div>

<script>

window.onload = function () {

    Plotly.d3.json/csv("audience.json",function (error,json/csv) {

        if (error) {
            console.error("Impossibile caricare i dati: " + error);
            return;
        }
        grafici(json/csv);

    })

}

function grafici(json/csv) {


    Plotly.plot("sol1",traces,layout);



    Plotly.plot("sol2",traces,layout);



    Plotly.plot("sol3",traces,layout);

}

</script>