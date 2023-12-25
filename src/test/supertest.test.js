import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:9090');

describe("Testing ecommerce App", ()=>{

    //tests para producto
    describe("Testing Products Api", ()=>{

        //testear la creación de producto
        it("traer Productos: El API POST /api/products/save debe agregar un nuevo producto", async ()=>{

            const productMock ={
                title: "productTest",
                description: "producto para testear",
                price: 10000,
                code: "aaa",
                stock: 1
            }

            const {statusCode, ok, _body} = await requester.post('/api/products/save').send(productMock);

            expect(statusCode).is.eqls(201)
            expect(_body).is.ok.and.to.have.property("_id")
        })

        //testear error
        it("crear un producto sin titulo: El API POST /api/products/save debe largar un codigo de error 500", async ()=>{

            const productMock ={
                description: "producto para testear error",
                price: 10000,
                code: "aaa",
                stock: 1
            }

            const { statusCode } = await requester.post('/api/products/save').send(productMock);

            expect(statusCode).is.eqls(500)

        })

        it("crear un producto sin titulo: El API POST /api/products/save debe largar un codigo de error 500", async ()=>{

            const productMock ={
                description: "producto para testear error",
                price: 10000,
                code: "aaa",
                stock: 1
            }

            const { statusCode } = await requester.post('/api/products/save').send(productMock);

            expect(statusCode).is.eqls(500)

        })

        it("traer productos: el API GET /api/products debe traer todos los productos", async ()=>{
             
            const array= [];

            const result = await requester.get('/api/products').send(array);
            console.log(result);

            expect(result.body).to.be.an('array');
            expect(result.body.length).to.be.greaterThan(0); //verifica si el array tiene por lo menos un elemento
        })

    })

    //testings para los carts
    describe("Testing Carts Api", ()=>{

        //testear la creación de producto
        it("crear carrito: El API POST api/carts/save debe agregar un nuevo carrito", async ()=>{

            const cartsMock ={
                products:[
                    "64ee873fb9d6500ca683c805"
                ]
            }

            const {statusCode, ok, _body} = await requester.post('/api/carts/save').send(cartsMock);

            expect(statusCode).is.eqls(201)
            expect(_body).is.ok.and.to.have.property("_id")
        })

        //Test actualizar
        it("actualizar un carrito: El API PUT api/carts/update/:_id debe actualizar el carrito", async ()=>{

            const updatedCart = {
                products: [
                    "64ee873fb9d6500ca683c805",
                    "64ee877db9d6500ca683c806"
                ]
            };

            const result = await requester.put('/api/carts/update/6567b8189058c0de171c61d9').send(updatedCart);

            expect(result.status).to.equal(202);

            // este verifica que el carrito fue actualizado correctamente
            expect(result.body).to.deep.equal(updatedCart);

        })


        it("traer carritos: el API GET /api/carts debe traer todos los productos", async ()=>{
             
            const array= [];

            const result = await requester.get('/api/carts').send(array);
            console.log(result);

            expect(result.body).to.be.an('array');
            expect(result.body.length).to.be.greaterThan(0);
        })

    })

    //tests para login
    describe("Testing login y sesiones", () =>{

        //funcion before para crear un usuario y la cookie
        before(function () {
            this.cookie;
            this.mockUser = {
                first_name: "nameTest",
                last_name: "apellidoTest",
                email: "mailTest@gmail.com",
                age: 25,
                password: "12345",
                loggedBy: "yes",
                role:"user"
            }
        })

        //test registro usuario
        it("Registro Usuario: debe poder agregar correctamente un usuario", async function () {

            //console.log(this.mockUser);

            const {statusCode, _body} = await requester.post('/api/users/save').send(this.mockUser);

            expect(statusCode).is.eqls(201);
        })

        //test para el login del usuario
        it("login usuario: debe poder hacer el login con el usuario creado previamente", async function(){
            
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password
            }

            const result = await requester.post('/api/jwt').send(mockLogin);
            //console.log(result)
            const cookieResult = result.headers['set-cookie'][0];
            //console.log(cookieResult);

            expect(result.statusCode).is.equal(200);

            const cookieData = cookieResult.split("=");
            this.cookie= {
                name: cookieData[0],
                value: cookieData[1]
            }

            expect(this.cookie.name).to.be.ok.and.eql('jwtCookieToken')
            expect(this.cookie).to.be.ok
        })
    })
})