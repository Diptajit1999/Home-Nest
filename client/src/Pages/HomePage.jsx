import React from 'react'
import Navbar from '../Components/Navbar'
import Slide from "../Components/Slide"
import Categories from '../Components/Categories'
import Listings from '../Components/Listings'
const HomePage = () => {
  return (
    <>
    <Navbar/>
    <Slide/>
    <Categories/>
    <Listings/>
    </>
  )
}

export default HomePage