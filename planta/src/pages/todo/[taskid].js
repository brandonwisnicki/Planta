import { useState, useEffect } from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { v4 as uuid } from 'uuid';

import { useRouter } from 'next/router'

import Add from './add'

export default function EditTodo() {
    const router = useRouter();


    
    
    
    return <>
    
    
    
    <Add id={router.query.taskid}/>
    
    </>



}