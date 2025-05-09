const asyncHandler = require('express-async-handler')
const Contact=require("../models/contactModel")

//@desc GET all contact
//@route GET /api/contacts
//@access private
const getContacts=asyncHandler(async(req,res)=>{
  const contacts= await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts)
});

//@desc GET  contact
//@route GET /api/contacts/:id
//@access private
const getContact=asyncHandler(async(req,res)=>{
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not found");
  }
  res.status(200).json(contact);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact=asyncHandler(async(req,res)=>{
  const {name,email,phone}=req.body;
  if(!name || !email || !phone){
    res.status(400)
    throw new Error("All fields required");
  }
  const contact= await Contact.create({
    name,email,phone,user_id:req.user.id
  })
  res.status(201).json(contact);
});

//@desc Update  contact
//@route PUT /api/contacts/:id
//@access private
const updateContact=asyncHandler(async(req,res)=>{
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user dont have permission")
  }
  const updatedContact=await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updatedContact);
});

//@desc DELETE  contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req,res)=>{
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not found");
  };
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user dont have permission")
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({message:`Delete contact for ${req.params.id}`})
});

module.exports={getContact,getContacts,createContact,updateContact,deleteContact};