import "./character.scss"
import { Link, useParams } from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import { useState } from "react"
const url = "https://hp-assessment-api.herokuapp.com/got"
const Character = () => {
    const [character, setHouse] = useState(null)
    const [loading, setLoading] = useState(true)
    const routeParams = useParams()
    const { id } = routeParams
    useEffect(() => {
        if (id) {
            fetch(`${url}/${"characters"}/${id}`)
                .then(res => res.json())
                .then(res => {
                    setHouse(res)
                    setLoading(false)
                })
        }
    }, [id])


    return <div>
        {loading && <div>Loading character, please wait ... </div>}
        {!loading && !character && <div>No character found</div>}
        {!loading && character && <div className="character">
            <img src={character.imageUrl} alt={`image of character ${character.name}`} />
            <h2>{character.name}</h2>
            <p><i>{character.words}</i></p>
            <p>House: <Link to={`/houses/${character.gotHouseId}`}>{character.gotHouse.name}</Link></p>
            <table>
                <tbody>
                    {
                        ["birthPlace", "spouse", "children"].map((key) => {
                            return <tr key={key}>
                                <th>{key}</th>
                                {Array.isArray(character[key]) && <td>{character[key].join(",\n")}</td>}
                                {!Array.isArray(character[key]) && <td>{character[key]}</td>}
                            </tr>
                        })
                    }
                    <tr>
                        <th></th>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>}
    </div>
}

export default Character