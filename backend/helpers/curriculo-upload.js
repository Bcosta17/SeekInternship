import multer from 'multer';
import path from 'path';

const fileStorage = multer.diskStorage({
   
    destination: function (req, file, cb){
     cb(null, 'public/files/alunos')
    },

    filename: function(req,file,cb){
        cb(null, Date.now()+'-'+file.originalname)
    }

    

})

const fileUpload = multer({
    storage: fileStorage,
})

export default fileUpload