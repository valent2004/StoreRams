const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const RAM = mongoose.model("RAM");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
require("dotenv/config");

router.post("/", (req, res) => {
        
    //Конфігуруємо formidable  у відповідності до 
    const form = formidable({
        multiples: true,                    //Вказуємо, що буде прилітати форма з кількома полями
        // uploadDir: publicDir,               //Вказуємо каталок, куди будемо поміщати завантажені файли
        keepExtensions: true,               //Вказуємо, що потрібно зберігати розширення
        // filename: function (name, ext, part, form) {return pigart.orinalFilename} //Залишаємо старе ім'я файла
    });
    
    form.parse(req, async (err, fields, files) => {
        
        if (err) {
          console.log("Error parsing the files");
          return res.status(400).json({
            status: "Fail",
            message: "There was an error parsing the files",
            error: err,
          });
        }

        
        const { RAMCall, RAMPurpose, RAMType, RAMVolume, RAMBar, oldCloudinaryPublicId, oldImagePath} = fields;
        const { RAMImage } = files;
        
        // console.log(productId, productName, productVolume, productMaterial, cloudinaryPublicId, oldImagePath);
        // console.log(productImage);

        // Починаємо формувати об'єкт для запису в БД
            const productInfo = {
                RAMCall,               // Аналогічно до синтаксису productName: productName,
                RAMPurpose, 
                RAMType,
                RAMVolume,
                RAMBar 
            };
            
            // Перевіряємо чи проводилася зміна картинки на фронті
            if (!productImage.originalFilename) {
                // Якщо картинка не мінялася - додаємо в об'єкт старі поля
                productInfo.RAMImage = oldImagePath;
                productInfo.cloudinaryPublicId = oldCloudinaryPublicId;
                saveDataToDB(RAMCall, productInfo, res);
            }
            else {
                // Якщо картинка мінялася - додаємо в об'єкт нові поля
                const getImagePath = productImage.filepath;
                cloudinary.uploader.upload(getImagePath, (err, image) => {
                    if (err) { console.warn(err); }
                                
                    productInfo.productImage = image.url;
                    productInfo.cloudinaryPublicId = image.public_id;
                    saveDataToDB(productId, productInfo, res); // console.log(productInfo);  
                    //Видаляємо стару картинку в cloudinary
                    cloudinary.uploader.destroy(oldCloudinaryPublicId);
                })}
    });
});

router.get("/list", (req, res) => {
     RAM.find((err, docs) => {
          if (!err) {
              res.send(docs);
          }
          else {
              console.warn('Error in retrieving product list: ', err);
          }
     })
    
})

const jsonParser = express.json()
router.delete("/", jsonParser, (req, res) => {
    cloudinary.uploader.destroy(req.body.cloudinaryPublicId);
    RAM.findByIdAndDelete(req.body._id, (err, docs) => {
        if (err){
            console.log(err)
        }
        else{
            res.sendStatus(200);
        }
    });
})


function saveDataToDB(RAMCall, data, res){
    // Перевіряємо чи строрювати новий рекорд в БД, чи оновити наявний
    if (RAMCall == "") {                  //Створюємо новий рекорд БД
        RAM(data).save(err => {
            if (err) console.log(err);
            res.sendStatus(200);
        })
    }
    else {                                  //Оновлюємо наявний рекорд БД
        RAM.findByIdAndUpdate(RAMCall, data, (err, data) => {
            if (err) console.log(err);
            res.sendStatus(200);
        })
    }
}

module.exports = router;