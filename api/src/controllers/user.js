const user = require("../models/user");
const token = require("../models/token");
const passwordCrypto = require("../helper/passwordCrypto");
const sendMail=require('../helper/sendMail')

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

    customFilter = req.body.isAdmin = true ? {} : { _id: user._id };

    const data = await res.getModelList(user, customFilter);

    res.status(200).send({
      error: false,
      data,
      detail: await res.getModelListDetails(user, customFilter),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

    req.body.isStaff = false;
    req.body.isAdmin = false;

    const data = await user.create(req.body);

    if(data){
      sendMail(req.body.email,"new registery",` dear ${req.body.userName} welcome `)

    }

    

    //Auto Login Start

    const tokenData = await token.create({
      userId: data._id,
      token: passwordCrypto(data._id + Date.now()),
    });

    //Auto Login Finsh

    res.status(200).send({
      error: false,
      user:data,
      token: tokenData.token,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
    customFilter = req.user.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user._id };
     

    const data = await user.findOne(customFilter);
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234Kure",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */
    
    if (!req.user.isAdmin) {
      delete req.body.isAdmin; //durumunu değiştiremez
      delete req.body.isStaff;
      req.params.id = req.user._id;
    }

    const data =await  user.updateOne({_id:req.params.id},req.body,{runValidators:true});

    res.status(200).send({
      error: false,
      data,
      new: await user.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

    if(!req.user.isAdmin)
    {
      const data = await user.deleteOne({ _id: req.params.id });
    }

    if (data.deletedCount > 0) {
      res.status(204).send({
        error: false,
        message: "user deleted",
      });
    } else {
      res.status(205).send({
        error: true,
        message: "user dont deleted",
      });
    }
  },
};
