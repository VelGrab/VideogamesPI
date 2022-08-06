import React from 'react'
import { Link } from 'react-router-dom'
import style from './NotFound.module.css'

export default function NotFound() {

  return (
    <div>
      <div className={style.container}>
        <Link to='/home'>
            <button className={style.button}>Ir Al Home</button>
        </Link>
      </div>
    </div>
  )
}
