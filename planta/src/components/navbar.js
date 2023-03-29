import Link from "next/link";
import styles from '@/styles/NavBar.module.css'
import Image from "next/image"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
export default function NavBar() {

    const [activePage, setActivePage] = useState("garden");
    const [hideNav, setHideNav] = useState(false)
    const router = useRouter()

    useEffect(() => {

        if(router.pathname.includes("todo")){
            setActivePage("todo")
        } else  if(router.pathname.includes("garden")){
            setActivePage("garden")

        } else  if(router.pathname.includes("learn")){
            setActivePage("learn")
        }

        setHideNav(router.pathname.includes("tutorial"))
    }, [router.pathname])
  return (
    <>
    <div className={styles.nav}>
        <div className={styles.logo}>

        <>
        {(activePage === "garden" && !hideNav) ?
        <Link href="/garden/tutorial"><FontAwesomeIcon className={styles.info} icon={faCircleInfo} />
        </Link>
        : <> </>}
        </>
        <Image
                src="/logo.png"
                alt="Planta Logo"
                
                width={127.18}
                height={31}
                priority
              />
              </div>
      {!hideNav && <div className={styles.navLinks}>
          <Link href="/todo" className={activePage === "todo" ? styles.active : null}>To Do</Link>
          <Link href="/garden" className={activePage === "garden" ? styles.active : null}>My Garden</Link>

          <Link href="/learn" className={activePage === "learn" ? styles.active : null}>Learn</Link>
      </div>}
  </div> 
    </>
  )
}