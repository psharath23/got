import { createRef, useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import "./characterlist.scss"
const url = "https://hp-assessment-api.herokuapp.com/got/"

const HouseList = () => {
    const [text, setText] = useState("")
    const [characters, setHouses] = useState([])
    useEffect(() => {
        fetch(url + "characters")
            .then(res => res.json())
            .then(res => setHouses(res.rows))
    }, [])

    const filterHouses = (h) => text.length ? h.name.toLowerCase().includes(text.toLowerCase()) : true

    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    return <div>
        <h2>CHARACTERS</h2>
        <input type="text" placeholder="start typing a character name" onChange={handleTextChange} />
        <ul className="character-list">
            {
                characters.filter(filterHouses).map((c) => {
                    return <li className="character">
                        <Link to={`/characters/${c.id}`}>
                            <img src={c.imageUrl} alt={`character ${c.name} image`}></img>
                            <h3>{c.name}</h3>
                        </Link>
                    </li>
                })
            }
        </ul>
    </div>
}

export default HouseList