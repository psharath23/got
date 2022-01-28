import { createRef, useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import "./houselist.scss"
const url = "https://hp-assessment-api.herokuapp.com/got/"

const HouseList = () => {
    const [text, setText] = useState("")
    const [houses, setHouses] = useState([])
    useEffect(() => {
        fetch(url + "houses")
            .then(res => res.json())
            .then(res => setHouses(res.rows))
    }, [])

    const filterHouses = (h) => text.length ? h.name.toLowerCase().includes(text.toLowerCase()) : true

    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    return <div>
        <h2>HOUSES</h2>
        <input type="text" placeholder="start typing a house name" onChange={handleTextChange} />
        <ul className="house-list">
            {
                houses.filter(filterHouses).map((c) => {
                    return <li className="house">
                        <Link to={`/houses/${c.id}`}>
                            <img src={c.imageUrl} alt={`house ${c.name} image`}></img>
                            <h3>{c.name}</h3>
                        </Link>
                    </li>
                })
            }
        </ul>
    </div>
}

export default HouseList