import React from "react"

export default function Cover(props) {
   const btnLabel = props.capitalize(props.btnState)

   return (
      <div className="cover">
         <h1>Quizzical</h1>
         <p>Your Trivia Quiz for the day.</p>
         <button onClick={props.toggleStart}>{btnLabel}</button>
      </div>
   )
}
