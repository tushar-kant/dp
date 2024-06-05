import React from 'react'
import ViewAllStudents from './table/ViewAllStudents'
import Navbar from './Header/Navbar'
import ImageGallery from './galary/ImageGallery'
import ContactForm from './ContactForm'

function Home() {
    return (
        <>
            <Navbar />
            <ViewAllStudents />
            <ImageGallery />
            <ContactForm />
        </>
    )
}

export default Home