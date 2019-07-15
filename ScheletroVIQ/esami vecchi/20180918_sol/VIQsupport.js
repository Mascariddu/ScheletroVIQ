XMLHttpRequest.prototype.open = (function (open) {
    let trackedUrls = [];
    let trackingStopped = false;

    function okStatus(s) {
        return [200, 304].indexOf(s) >= 0;
    }

    return function (method, url, async) {
        let id = trackedUrls.indexOf(url);
        let datafile = null;
        if (id < 0) {
            trackedUrls.push(url);
            id = trackedUrls.length - 1;
            let redesign = document.getElementById("redesign").parentElement;
            datafile = document.createElement("p");
            datafile.id = "datafile" + id;
            datafile.innerHTML = "Il diagramma ha caricato il file: " + url;
            datafile.style.position = "relative";
            datafile.style.textAlign = "left";
            datafile.classList.add("hint");
            redesign.appendChild(datafile);
        }else{
            datafile = document.getElementById( "datafile" + id);
            datafile.innerHTML = "Il diagramma ha caricato il file: " + url;
        }

        let pop = document.createElement("span");
        datafile.appendChild(pop);
        pop.style.setProperty("visibility", "hidden");
        pop.style.position = "absolute";
        pop.style.display = "block";
        pop.style.maxHeight = "300px";
        pop.style.width = "50%";
        pop.style.overflow = "auto";
        pop.classList.add("popup");


        datafile.onmouseenter = function () {
            pop.style.setProperty("visibility", "visible");
            pop.onmouseleave = function () {
                if (pop)        {
                    pop.style.setProperty("visibility", "hidden");
                }
            };
        };

        open.apply(this, arguments);

        this.addEventListener("readystatechange",function(){ // steal data from the original request
            if (this.readyState === 4)
                if (okStatus(this.status)) {
                    if (pop) {
                        pop.innerHTML += "<pre>" + this.responseText + "</pre>";
                    }
                }else{
                    if (pop) {
                        pop.style.backgroundColor = "crimson";
                        pop.style.color = "azure";
                        pop.innerHTML = "<p><strong>Attenzione: il file <em>" + url + "</em> non &egrave; esiste!</strong></p>";
                    }
                }
        });
    };
})(XMLHttpRequest.prototype.open);


document.addEventListener("DOMContentLoaded", function () {

    let options = document.querySelectorAll(".options li");
    let hint = function () {
        let pop = document.createElement("div");
        pop.style.position = "absolute";
        pop.innerHTML = "Per selezionare la risposta '<em>" +
            this.innerText.replace("<", "&lt;").replace(">", "&gt;") +
            "</em>' è necessario " +
            "modificare il documento aggiungendo la classe " +
            "'<code>selected</code>' all'elemento" +
            "<code>&lt;li&gt;</code> corrispondente:<br>" +
            "<code>&lt;li&gt;</code> diventa " +
            "<code>&lt;li class=\"selected\"&gt;</code>"
        ;
        pop.classList.add("popup");
        this.appendChild(pop);
        this.style.position = "relative";
        pop.onmouseout = function () {
            if (pop) {
                pop.style.setProperty("visibility", "hidden");
                pop.parentElement.removeChild(pop);
                pop = null;
            }
        };
        setTimeout(pop.onmouseout, 7000);
    };
    for (let i = 0; i < options.length; ++i) {
        options[i].onclick = hint;
    }
});
