import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const DeleteBook = () => {
  const[loading, setLoading] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
   setLoading(true);
   axios.delete(`http://localhost:8080/books/${id}`).then(()=>{
    setLoading(false);
    navigate('/');
   }).catch((err)=>{
    setLoading(false);
    alert('An error happened. Please Check console');
    console.log(err);
   })
  }

  return (
    <div className='p-4'>
    <BackButton/>
    <h1 className='text-3xl my-4 w-96'></h1>
    {loading ? <Spinner /> : ''}
    <div className='flex flex-col w-1/3 items-center border-2 border-sky-400 rounded-xl'>
      <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>
      <button className='p-4 bg-red-600 text-white m-8 w-32' onClick={handleDeleteBook}>
      Yes, Delete it
      </button>
    </div>
    </div>
  )
}

export default DeleteBook