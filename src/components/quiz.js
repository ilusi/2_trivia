import React from "react"

export default function Quiz(props) {
   // console.log("props: ", props)

   const choices = props.choices.map((choice, idx) => {
      const styles = {
         // Highlight correct answer on the Check Answer page.
         background: props.showAnswer && (choice === props.correctAnswer)
            ? "#0f0" : "#fff"
      }

      return (
         <div key={`${props.id}-${idx}`} style={styles}>
            <input
               type="radio"
               id={`${idx}-${props.id}`}
               name={`answer-${props.id}`}
               value={choice}
               checked={props.answer === choice}
               onChange={props.handleChange}
            />
            <label htmlFor={`${idx}-${props.id}`}>{choice}</label>
         </div>
      )
   });


   return (
      <fieldset>
         <p>{props.question}</p>
         {choices}
      </fieldset>
   )
}
