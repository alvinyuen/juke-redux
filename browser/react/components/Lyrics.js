import React from 'react'

export default function(props) {
    const {text, setArtist, artistQuery, setSong, songQuery, submit} = props;

    const artistChange = e => {
        setArtist(e.target.value)
    }
    const songChange = e => {
        setSong(e.target.value)
    }
    return (<form className="form-horizontal" onSubmit={submit}>
                <h3>ARTIST</h3>
                <input onChange = {artistChange} value = {artistQuery}className="form-control" type="text"/>
                <h3>SONG</h3>
                <input onChange = {songChange} value = {songQuery} className="form-control" type="text"/>
                <hr/>
                <pre>{text}</pre>
                <button type="submit" className="btn btn-success"> Find Lyrics</button></form>
            )
}