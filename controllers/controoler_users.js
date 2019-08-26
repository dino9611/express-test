const model=require('./../models/modeluser')

module.exports={
    getdata:(req,res)=>{
        model.findAll()
        .then(result=>{
            res.status(200).send(result)
        }).catch(err=>{
            res.status(500).send(err)
        })
    },
    postdata:(req,res)=>{
        
        model.create(req.body).then(data=>{
            res.status(200).send({message:'sukses',data})
        }).catch(err=>{
            res.status(500).send(err)
        })
    },
    updatedata:(req,res)=>{
        model.update(req.body,{where:{id:req.params.id}}).then(data=>{
            res.status(200).send({message:'edit suksess'})
        }).catch(err=>{
            res.status(500).send(err)
        })
    },
    updatepassword:(req,res)=>{
        model.update(req.body,{where:{id:req.params.id}}).then(data=>{
            res.status(200).send({message:'edit pass suksess'})
        }).catch(err=>{
            res.status(500).send(err)
        })
    },
    deletedata:(req,res)=>{
        model.destroy({
            where:{id:req.params.id}
        }).then(data=>{
            res.status(200).send({message:"delete sukses"})
        }).catch(err=>{
            res.status(500).send(err)
        })
    }
}