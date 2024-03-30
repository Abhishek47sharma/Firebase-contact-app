  import React from 'react'
import Modal from './Modal';

import "../components/AddAndUpdateContact.css"

const AddAndUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {


    return (
      <div>
              <Modal  contact={contact} isOpen={isOpen} onClose={onClose} isUpdate={isUpdate}>
            
      </Modal>
      </div>
    )
  }
  
  export default AddAndUpdateContact;