var categoriesProducts = [];

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let productos = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                     <div>
                          <h4 class="mb-1">`+ productos.name +`</h4>
                          <p>`+ productos.description +`</p>
                          <p>`+ productos.currency +``+ productos.cost +` </p>
                          
                     </div>
                        
                        <small class="text-muted">` + productos.soldCount + ` articulos vendidos</small>
                    </div>

                </div>
            </div>
        </div>
       `

        document.getElementById("producto").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes. esa (e) significa "evento", es lo mismo que poner esto: ()
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(respuesta){
        if (respuesta.status === "ok")
        {
            categoriesProducts = respuesta.data;
            
            showProductsList(categoriesProducts);
        }
    });
});