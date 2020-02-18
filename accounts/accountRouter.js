const express = require('express')
const db = require('../data/dbConfig')
const router = express.Router()

router.get('/', async (req, res, next)=> {
    try{
        return res.json(await db('accounts').select())
    }
        catch (err){
        next(err)
    }
})

router.get('/:id', async( req, res, next)=> {
    try{
        return res.json(await db('accounts').where('id',req.params.id).first())
    }
        catch(err){
            next(err)
        }
})

router.post('/', async (req, res, next) =>{
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }
        const [id] = await db('accounts').instert(payload)
        return res.json(await db('accounts').where('id',id).first())
    }
        catch(err) {
        next(err)
    }
})

router.put('/:id', async(req, res, next)=> {
    try{
        await db('accounts').where('id', req.params.id).update(req.body)
        return res.json(await db('accounts').where('id', req.params.id).first())
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) =>{
    try{
        await db ('accounts').wehre('id', req.params.id).del()
    }
    catch(err){
        next(err)
    }
})

module.exports = router