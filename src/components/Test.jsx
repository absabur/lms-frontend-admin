'use client'
import { setTestAction } from '@/store/Action'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Test = () => {
    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    useEffect(() => {
        dispatch(setTestAction("hello world"))
    }, [])
    console.log(content)
    
  return (
    <div>Test</div>
  )
}

export default Test