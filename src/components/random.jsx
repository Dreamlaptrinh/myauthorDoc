import React, { useState } from "react";
import {FaRedoAlt} from "react-icons/fa"
import {AiOutlineArrowDown} from "react-icons/ai"
import "../App.css"

function Random(){
    const[data, setData] = useState('')
    const[number,setNumber]= useState('')
    const[isLoading,setIsLoading] = useState(true)
    const[loadContent,setLoadContent] = useState(false)
    const url = `https://api.quotable.io/quotes`
    const searchQuote = () =>{ 
        fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        setData('')
        setNumber(Math.floor(Math.random()*20))
        setIsLoading(false)
        setLoadContent(false)
    }
    console.log(data)
    console.log(number)
    const showContent = () =>{
        setLoadContent(true)
    }
    return(
        <div className="book">
            <div className="random">
            <button onClick={searchQuote}>Random <FaRedoAlt className="icon"/></button>
            </div>
            <div className="infor">
                <div className="inforCon">
                    {data ? <p>"{data.results[number].content}"</p>:null}
                </div>

                {
                    data && 
                    <div className="inforCon2" onClick={showContent}>
                    <div className="inforEle">
                        {data? <p className="author">{data.results[number].author}</p> :null}  
                        <div className="category">
                            {data? <p>{data.results[number].tags[0]}</p> :null}
                            {data? <p>{data.results[number].tags[1]}</p> :null}
                        </div>
                    </div>
                        <AiOutlineArrowDown/>   
                    </div>
                }
            </div>
            {loadContent && data.results? (
                data.results
                .filter(name => name.author.includes(data.results[number].author))
                .map(function(e,i){
                    return <div className="content" key={i}>
                        <p>{e.content}</p>
                        </div>
                })
            ):(null)}
        </div>
    )
}
export default Random