const asyncHandler = require('express-async-handler')
const Contact=require("../models/contactModel")

//@desc GET all contact
//@route GET /api/contacts
//@access public
const getContacts=asyncHandler(async(req,res)=>{
  const contacts= await Contact.find();
  res.status(200).json(contacts)
});

//@desc GET  contact
//@route GET /api/contacts/:id
//@access public
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
//@access public
const createContact=asyncHandler(async(req,res)=>{
  const {name,email,phone}=req.body;
  if(!name || !email || !phone){
    res.status(400)
    throw new Error("All fields required");
  }
  const contact= await Contact.create({
    name,email,phone
  })
  res.status(201).json(contact);
});

//@desc Update  contact
//@route PUT /api/contacts/:id
//@access public
const updateContact=asyncHandler(async(req,res)=>{
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not found");
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
//@access public
const deleteContact=asyncHandler(async(req,res)=>{
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not found");
  };
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({message:`Delete contact for ${req.params.id}`})
});

module.exports={getContact,getContacts,createContact,updateContact,deleteContact};