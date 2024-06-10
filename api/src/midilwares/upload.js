// const multer = require('multer');
// const path = require('path');


// module.exports = multer({
    
//     storage: multer.diskStorage({
    
//         destination: './upload/',
//         filename: function (req, file, retuncallback) {
//             console.log("file",file)
           
//             const userId = req.user ? req.user.id : 'anonymous';
//             const originalName = file.originalname 
//             let newFileName =`${userId}-${originalName}` 
            
//             // req.filePath = path.join('upload', newFileName);
//             retuncallback(null, newFileName);
//         }
//     })
// });



const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadDir = path.join(__dirname, '../upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        console.log("file", file);
        const userId = req.user ? req.user.id : 'anonymous';
        const originalName = file.originalname;
        let newFileName = `${userId}-${originalName}`;
        cb(null, newFileName);
    }
});

const upload = multer({ storage });

module.exports = upload;
