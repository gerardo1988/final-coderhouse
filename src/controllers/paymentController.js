import { ProductsModel } from "../services/dao/db/models/productsModel.js";
import PaymentServices from "../services/dao/db/PaymentService.js";

export async function payment(req, res) {
    try {

        const productId = req.body._id;

        const productRequested = await ProductsModel.findById(productId);

        if (!productRequested) {
            return res.status(404).send({ status: "error", error: "Product not found" });
        }

        const service = new PaymentServices();

        const paymentMethod = await service.createPaymentMethod();

        const paymentIntentInfo = {

            payment_method: paymentMethod.id,
            amount: productRequested.price,
            currency: 'usd',
            confirmation_method: 'manual'
        };

        
        let result = await service.createPaymentIntent(paymentIntentInfo);

        res.send({ status: "success", payload: result });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error con el proveedor externo." });
    }
}
