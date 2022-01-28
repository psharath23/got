import "./house.scss"
import { Link, useParams } from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import { useState } from "react"
const url = "https://hp-assessment-api.herokuapp.com/got"
const House = () => {
    const [house, setHouse] = useState(null)
    const [loading, setLoading] = useState(true)
    const routeParams = useParams()
    const { id } = routeParams
    useEffect(() => {
        if (id) {
            fetch(`${url}/${"houses"}/${id}`)
                .then(res => res.json())
                .then(res => {
                    setHouse(res)
                    setLoading(false)
                })
        }
    }, [id])


    return <div>
        {loading && <div>Loading house, please wait ... </div>}
        {!loading && !house && <div>No house found</div>}
        {!loading && house && <div className="house">
            <img src={house.imageUrl} alt={`image of house ${house.name}`} />
            <h2>House {house.name}</h2>
            <p><i>{house.words}</i></p>
            <table>
                <tbody>
                    {
                        ["founder", "head", "region", "seat"].map((key) => {
                            return <tr key={key}>
                                <th>{key}</th>
                                <td>{house[key]}</td>
                            </tr>
                        })
                    }
                    <tr>
                        <th></th>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div className="house-characters">
                <label for="gotCharacters"><strong>Characters: </strong></label>
                <ul id="gotCharacters">
                    {
                        house.gotCharacters.map((c, i) => {
                            return <li key={i}>
                                <Link to={`/characters/${c.id}`}>{c.name}</Link>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>}
    </div>
}

export default House