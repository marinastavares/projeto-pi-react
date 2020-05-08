import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import png from 'assets/png.png'
import { getMusic } from 'modules/user/actions'

import styles from './styles.module.css'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMusic())
	}, [dispatch])

	return (
		<section className={styles.body}>
			<div className={styles.header}>
				<img src={png} alt='Lá da rua logo' className={styles.img} />
			</div>
			<h1 className={styles.title}>Projeto LÁ DA RUA</h1>
			<h2 className={styles.subtitle}>Em breve uma nova versão para você</h2>
		</section>
	)
}

export default App
