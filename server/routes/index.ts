import { Application } from "express";
import express from "express";
import authControllers from "../controller/authControllers";
import controller from "../controller/controllers";
import { upload } from "../middleware/multer";
import userMiddleware from "../middleware/tokenVerify";




const router = express.Router()
router.post('/api/register',authControllers.signup)
router.post('/api/login',authControllers.UserLogin)
router.post('/api/uploadpdf', upload.single('pdf'),controller.uploadpdf)
router.get('/api/getAllPdf/:email',userMiddleware,controller.getAllpdfDocument)
router.get('/api/viewpdf/:uploads', userMiddleware,controller.viewPdf)


export default router
