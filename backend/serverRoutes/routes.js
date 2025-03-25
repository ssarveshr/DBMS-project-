import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()


router.get('/getApi' , (req,res) => {
    console.log(`Hi From The Server Side`)
    return res.status(200).send({
        message : 'This is server speaking to you'
    })
})


router.get('/' , (req,res) => {
    console.log(`This is Main page`)
    return res.status(200).json({
        message : 'This is Main page'
    })
})

export default router