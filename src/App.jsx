import './App.css';
import { FaSearch } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import {collection, onSnapshot} from 'firebase/firestore'
import { db } from './config/firebase';
import ContactCard from './components/ContactCard';

import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import NotFoundContact from './components/NotFoundContact';


function App ()  {

const [contacts,setContacts] = useState([]);


const {isOpen,onClose,onOpen} = useDisclouse()
useEffect(()=>{
  const getContacts = async()=>{

    try {
      const contactRef = collection(db,"contacts");


      onSnapshot(contactRef,(Snapshot)=>{
        const contactLists = Snapshot.docs.map((doc)=> {
          return{
            id: doc.id,
            ...doc.data(),
          }
        });
        setContacts(contactLists);        
        return contactLists;
      });
      } catch (error) {
      console.log(error)
    }
  };

  getContacts();
},[])

const filterContacts = (e)=>{
  const value = e.target.value;
  const contactRef = collection(db,"contacts");


      onSnapshot(contactRef,(Snapshot)=>{
        const contactLists = Snapshot.docs.map((doc)=> {
          return{
            id: doc.id,
            ...doc.data(),
          }
        });

        const filterContacts = contactLists.filter(contact => 
          contact.name.toLowerCase().includes(value.toLowerCase()))

        setContacts(filterContacts);        
        return filterContacts;
      });
} 
  return (
    <div>
    <Navbar />
      <div className="search_bar">
        <FaSearch className='icon'/>
        <input onChange={filterContacts} type="text" className='input' placeholder='search name'/>
        <IoAdd className='add' onClick = {onOpen} />
      </div>
      <div> 
        {contacts.length <= 0 ? <NotFoundContact /> : contacts.map((contact) =>(
          <ContactCard key= {contact.id} contact={contact}/>
        ))}
      </div>
          <AddAndUpdateContact 
           isOpen={isOpen}
           onClose={onClose}
          />
          
    </div>
    
  );
}

export default App;
