var categoriesProducts = [];
var minPrecio = undefined;
var maxPrecio = undefined;
function sortCategories(criteria, array){
    let result = [];
    if (criteria === 1)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === 2){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === 3){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let productos = array[i];

        if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(productos.cost) >= minPrecio)) &&
            ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(productos.cost) <= maxPrecio))) {


            htmlContentToAppend += `
            <a href="product-info.html">
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                     <div>
                          <h4 class="mb-1">`+ productos.name + `</h4>
                          <p>`+ productos.description + `</p>
                          <p>`+ productos.currency + `` + productos.cost + ` </p>
                          
                     </div>
                        
                        <small class="text-muted">` + productos.soldCount + ` articulos vendidos</small>
                    </div>

                </div>
            </div>
        </div>
        </a>
       `
    }
            document.getElementById("producto").innerHTML = htmlContentToAppend;
        }
    }

    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes. esa (e) significa "evento", es lo mismo que poner esto: ()
    document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(PRODUCTS_URL).then(function (respuesta) {
            if (respuesta.status === "ok") {
                categoriesProducts = respuesta.data;
                categoriesProducts = sortCategories(1, categoriesProducts);

                showProductsList(categoriesProducts);
            }
        });
        document.getElementById("sortAsc").addEventListener("click", function(){
            categoriesProducts = sortCategories(1, categoriesProducts);
            showProductsList(categoriesProducts);
            
        });
    
        document.getElementById("sortDesc").addEventListener("click", function(){
            categoriesProducts = sortCategories(2, categoriesProducts);
            showProductsList(categoriesProducts);
        });
    
        document.getElementById("sortByCount").addEventListener("click", function(){
            categoriesProducts = sortCategories(3, categoriesProducts);
            showProductsList(categoriesProducts);
        });
    
        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
    
            minPrecio = undefined;
            maxPrecio = undefined;
    
            showProductsList(categoriesProducts);
        });
        document.getElementById("rangeFilterCount").addEventListener("click", function(){
            minPrecio = document.getElementById("rangeFilterCountMin").value;
            maxPrecio = document.getElementById("rangeFilterCountMax").value;
    
            if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0){
                minPrecio = parseInt(minPrecio);
            }
            else{
                minPrecio = undefined;
            }
    
            if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio)) >= 0){
                maxPrecio = parseInt(maxPrecio);
            }
            else{
                maxPrecio = undefined;
            }
    
            showProductsList(categoriesProducts);
        });
    });