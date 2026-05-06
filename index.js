const BASE_URL = "https://fakestoreapi.com";

console.log("Inicio del Programa...");


const args = process.argv.slice(2);

const[metodo, path, ...param] = args;


if(args.length > 0){

    const metodoMayuscula = metodo.toUpperCase();

    console.log(`El metodo ingresado es: ${metodoMayuscula}`);
    console.log(`La ruta es: ${path}`);
    let data;

    switch (metodoMayuscula) {

    case "GET":
        data = await obtenerProducto(metodoMayuscula,path);

        if(data !== undefined){
        console.log("Producto", data);
        }
        break;

    case "POST":
        data = await agregarProducto(metodoMayuscula, path, param);
        console.log("Se agrego el Producto: ", data);
        break;

    case "DELETE":
        
        data = await eliminarProducto(metodoMayuscula, path)
        console.log("Producto eliminado: ", data);
        break;

    default:
        console.log("Método no reconocido. Use GET, POST o DELETE.");
        break;
}
    

} else {

    console.log("No se ingreso datos");

}

async function obtenerProducto(metodo, parametro) {

    try{
        const response = await fetch(`${BASE_URL}/${parametro}`, {
            method: metodo //GET
        })
        
        if (response.ok){
            let data = await response.json();
            return data;

        } else{
            console.log("Error en la petición. Estado:", response.status);
        }

    }catch(error){
        console.log(error);
    }finally{
        console.log("Se finalizo la funcion Obtener Prodcutos");
    }
}

async function agregarProducto(metodo , ruta , producto) {

    try{
        const prod = {title: producto[0], price: producto[1], category: producto[2]};
        
        const response = await fetch(`${BASE_URL}/${ruta}`, {
        method: metodo, //POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod)
        })

        if (response.ok){
            console.log("Producto agregado con exito");
            let data = await response.json();
            return data;

        }else{
            console.log("Error en la petición. Estado:", response.status);
        }
    }catch(error){
        console.log(error);
    }finally{
        console.log("Se finalizo la funcion Agregar Producto");
    }
}

async function eliminarProducto(metodo, parametro) {

    try{
        
        const response = await fetch(`${BASE_URL}/${parametro}`, {
        method: metodo, //DELET
        })

        if (response.ok){
            let data = await response.json();
            console.log(`Producto con ID: ${data.id} se elimino con EXITO`);
            return data;

        }else{
            console.log("Error en la petición. Estado:", response.status);
        }
    }catch(error){
        console.log(error);
    }finally{
        console.log("Se finalizo la funcion Eliminar Producto");
    }
}