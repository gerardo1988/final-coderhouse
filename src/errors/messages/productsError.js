export const getproductsErroInfo= (product)=>{
    return `no se pudo enviar la informacion requerida:
              .informacion requeria: ${product}  ` 
}

export const createproductsErroInfo= (product)=>{
    return `no se pudo traer la informacion requerida:
              .informacion requeria: ${product.tilte}, ${product.description}, 
                                        ${product.price}, ${product.code}, ${product.stock}  ` 
}

export const deleteproductErroInfo= (id)=>{
    return `no se encontro el producto para eliminar o el parametro pasado es erroneo:
              .dato: ${id}` 
}

export const getOneProductErroInfo= (id)=>{
    return `no se encontro el producto solicitado o el parametro pasado es erroneo:
              .dato: ${id}` 
}

