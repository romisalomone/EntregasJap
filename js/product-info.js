var productos = {};
var coments = {};
var autito1 = {};
var autito2 = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function mostrarComentarios(parametro) {

    let resenias = "";

    for (let i = 0; i < parametro.length; i++) {
        let reseniasSrc = parametro[i];
        resenias += `
        <div>
        <small class="text-muted">`+ reseniasSrc.dateTime + `</small>
        <p>`+ reseniasSrc.user + `
        </p>
        <p>`+ reseniasSrc.description + `
        </p>
        <p style="text-align: right;">`+ reseniasSrc.score + ` /5 </p>
        </div>      
        `;
    }
    document.getElementById("comentarios").innerHTML = resenias;
}
function showOpcionproducto(producto1, producto2) {
    let opcion = "";
    for (let i = 0; i < producto2.length; i++) {
        let optionsSrc = producto1[producto2[i]];
        opcion += `<div class="card" style="width: 18rem;">
        <img src="` + optionsSrc.imgSrc + `" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">`+ optionsSrc.name + `</h5>
          <p class="card-text">`+ optionsSrc.description + `</p>
          <a href="#" class="btn btn-primary">Ingrese Aquí</a>
        </div>
      </div>
      `
    }
    document.getElementById("autito").innerHTML = opcion;
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productos = resultObj.data;

            let categoryNameHTML = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");

            categoryNameHTML.innerHTML = productos.name;
            categoryDescriptionHTML.innerHTML = productos.description;
            productCountHTML.innerHTML = productos.cost;
            productCriteriaHTML.innerHTML = productos.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(productos.images);
        }
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
            if (result.status === "ok") {
                coments = result.data;
                mostrarComentarios(coments);
            }

        });
        getJSONData(PRODUCTS_URL).then(function (result) {
            if (result.status === "ok") {
                autito1 = result.data;
                autito2 = productos.relatedProducts;
                showOpcionproducto(autito1, autito2);
            }
        });
    });
});