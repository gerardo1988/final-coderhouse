import { Router } from 'express';

const router = Router();

//aqui renderizo las vistas
router.get("/registeruser", (req, res)=>{
    res.render("register");
});

router.get("/loginuser", (req, res)=>{
    res.render("login");
});

router.get("/users", (req, res)=>{
    res.render("profile",{
        user: req.user
    });
});

router.get("/paymentOk", (req, res)=>{
    res.render("paymentsuccess");
});

export default router;