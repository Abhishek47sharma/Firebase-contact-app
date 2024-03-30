import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import '../components/Modal.css'
import { createPortal } from 'react-dom';
import { Field, Formik,Form, ErrorMessage } from 'formik';
import { db } from "../config/firebase";
import {addDoc, collection, doc, updateDoc} from 'firebase/firestore'
import * as yup from "yup";

const contactSchemaValidation  = yup.object().shape({
  name: yup.string().required("name required"),
  email: yup.string().email("invalid email").required("email is required")
});

const Modal = ({onClose,isOpen,children,isUpdate,contact})=> {

  const addContact = async (contact)=>{
    try {
      const contactRef = collection(db,"contacts")
      await addDoc(contactRef,contact)
      onclose();
    } catch (error) {
      console.log(error);
    }
  }

  const updateContact = async (contact,id)=>{
    try {
      const contactRef = doc(db,"contacts",id)
      await updateDoc(contactRef,contact)
      onClose();
    } catch (error) {
      console.log(error);
    }
  }


  return createPortal(
    <>
        {isOpen && (
            <>
            <div className='box'>
                <IoCloseOutline onClick={onClose} className='cross-icon'/>    

                <Formik 
                validationSchema={contactSchemaValidation}
                initialValues = {isUpdate ?{
                    name:contact.name,
                    email: contact.email,
                  } :{
                    name:"",
                    email:""
                  }}     
                  onSubmit = {(values)=>{
                    console.log(values);
                    isUpdate ? updateContact(values , contact.id) : addContact(values);
                  }}
                >
                    <Form>
                        <div className="details">
                        <label htmlFor='name'>Name</label>
                        <Field  name="name"/>
                        <div className="err">
                          <ErrorMessage name="name"/>
                        </div>
                        <label htmlFor='name'>Email</label>
                        <Field  name="email"/>
                        <div className="err">
                          <ErrorMessage name="email"/>
                        </div>
                        <button className='btn'>{isUpdate ? "update":"add"} contacts</button>
                        </div>
                    </Form>
                </Formik>
            </div>
            
            <div className='blur' onClick={onClose} />
            </>
        )}
    </>,
   document.getElementById("modal-root")
   ) 
}

export default Modal