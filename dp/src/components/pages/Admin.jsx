import React from 'react'
import StudentTable from './table/StudentTable'
import Navbar from './Header/Navbar'
import ImageUpload from './galary/ImageUpload'

function Admin() {
    return (
        <>
            <Navbar />
            <h1 className='text-center'>Admin panel</h1>
            <h5>firrst table</h5>
            <StudentTable />
            <ImageUpload />
        </>
    )
}

export default Admin