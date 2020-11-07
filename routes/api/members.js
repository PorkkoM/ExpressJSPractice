const express= require('express');
const router = express.Router();
const members = require('../../members')
const uuid = require('uuid')

router.get('/:id',(req,res)=>{
    const found = members.some(members => members.id === req.params.id);
    if(found){
        res.json(members.filter(members => members.id === req.params.id));
    }else{
        res.status(400).json({msg : `No Memeber found with id ${req.params.id}`});
    }
});

router.get('/sayhello',(req,res) =>{
     res.sendFile(path.join(__dirname,'public','index.html'))
})

//router.get('/',(req,res)=>{res.json(members);})

//Craete Member
router.post('/',(req,res)=>{
    const newMember ={
        id : uuid.v4(),
        name : req.body.name,
        email: req.body.email,
        status:'Active'
    }
    if(!newMember.name||!newMember.email){
        return res.status(400).json({msg:`Improper Message`});
    }
    members.push(newMember);
    return res.json(members)
});

//Upate Members
router.put('/:id',(req,res)=>{
    const found = members.some(members => members.id === req.params.id);
    if(found){
      const updateMember = req.body;
      members.forEach(mem=>{
          if(mem.id===req.params.id){
              mem.name = updateMember.name? updateMember.name: mem.name;
              mem.dept = updateMember.dept? updateMember.dept: mem.dept;
            res.json({msg:`The Value has updated`,mem})
          }
      });
      
    }else{
        res.status(400).json({msg : `No Memeber found with id ${req.params.id}`});
    }
});


//Delete Members

router.delete('/:id',(req,res)=>{
    const found = members.some(members => members.id === req.params.id);
    if(found){
        res.json( {
            msg:`Member deleted`,
            member : members.filter(members => members.id!== req.params.id)});
    }else{
        res.status(400).json({msg : `No Memeber found with id ${req.params.id}`});
    }
});

module.exports=router;