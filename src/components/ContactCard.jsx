import "../components/contactCard.css"
import { IoIosContact } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import React from 'react'
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";

const ContactCard = ({contact}) => {

  const {isOpen,onClose,onOpen} = useDisclouse();

  const deleteContact = async(id)=>{
    try {
      await deleteDoc(doc(db,"contacts",id));
      console.log(contact.name)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <> 
    <div key={contact.id} className="content">
      <div className="icon-1">
          <IoIosContact />
      </div>
            <div className="sub-content">
              <h2>{contact.name}</h2>
              <p>{contact.email}</p>
            </div>
            <div className='icons'> 
              <RiEditCircleLine onClick = {onOpen}/>
                <FaTrash onClick={() => deleteContact(contact.id)}/></div>           
          </div>
          <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
          
    </>
  )
}

export default ContactCard;