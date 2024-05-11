const QrRoute =require('express').Router();

const QR =require('../Models/QR');

// Getting the all QR code 
QrRoute.get('/getQR',async(req,res)=>{
          try {
            const specificQr =await QR.find({})
            res.status(200).json(specificQr)
          } catch (error) {
            console.log(error);        
        }
})
//  Getting the QR by id
QrRoute.get('/getQR/:id',async(req,res)=>{
          
          try {
            const specificQr =await QR.find({id:req.params.id})
            res.status(200).json(specificQr)
          } catch (error) {
             console.log(error);
                    
          }
})
//  Potong the QR code 
QrRoute.post('/postQR', async(req,res)=>{
          
          try {
                    const newQr =  new QR({
                        id: req.body.id,
                        Name: req.body.Name,
                        SitNo: req.body.Sit,
                        Audi : req.body.Audi,
                        Hall: req.body.Hall, 
                        Mall : req.body.Mall,
                        //   Img : res.body.I
                    })
                    res.json(newQr);
                    const save = await newQr.save()
          } catch (error) {console.log(error);}
})
// Delete QR by id
QrRoute.delete('/deleteQR/:id', async (req,res)=>{
          
          console.log(req.params.id);          
          try {
              const deleteItem = await QR.findOneAndRemove(req.params.id);
              res.status(200).json('Item deleted');
          } catch (error) {
              res.json(error)
          }
})
      
// Delte all
QrRoute.delete('/empty',async (req, res)=>{
          
try {
          const deleteAll = await QR.deleteMany(); 
          res.status(200).json('Items deleted');       
} catch (error) {
          console.log(error);
}
})
module.exports = QrRoute;