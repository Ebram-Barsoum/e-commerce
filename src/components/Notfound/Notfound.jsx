import React from 'react'
import notFoundImage from '../../assets/error.svg'
export default function Notfound() {
  return (
    <div className="not-found py-5">
      <div className="row justify-content-center py-5">
        <img src={notFoundImage} alt="" className='col-10 col-md-6'/>
      </div>
    </div>
  )
}
