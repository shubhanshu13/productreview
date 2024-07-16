const express = require('express')
const router = express.Router()
const product = require("../model/productmodels")
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const { stringify } = require('querystring')

const datafilepath = path.join(__dirname,'data','products.json',)

const readdata = ()=>{
    const data = fs.readFileSync(datafilepath)
    const newdata = JSON.stringify(data)
    return JSON.parse(newdata);
}

const writedata = (data) =>{
    fs.writeFileSync(datafilepath,JSON.stringify(data))
}


const appenddata = (data) =>{
    fs.appendFileSync(datafilepath,JSON.stringify(data))
}

 

router.get('/',async(req,res)=>{
    try{
        const data = await product.find()
        const products = readdata()
        console.log("data fetched")
        res.status(200).json(data)

    }catch(err){

        console.log(err)
        res.status(500).json({error: 'internal server error'})
    }
})

router.post('/',async(req,res)=>{
    try{
        const data = req.body
        const newproduct = new product(data)
        const response = await newproduct.save()

        const products = appenddata(response)
        console.log("data saved")
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error'})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const productid = req.params.id;
        const updatedproductdata = req.body

        const response = await  product.findByIdAndUpdate(productid,updatedproductdata,{
        new : true,
        runValidators : true
        })
        console.log("data updated")
        res.status(200).json(response)


    }catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error'})


    }
})
router.delete('/:id', async(req,res)=>{
    try{
        const productid = req.params.id
        const response = await product.findByIdAndDelete(productid)
        console.log("data deleted")
        console.log(response)
        res.status(200).json({message:"id deleted successfullly"})

    }catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error'})

    }

})

module.exports = router
