import './Form.css'

export default function Quiz(props) {
   const choices = props.choices.map((choice, idx) => {
      const styles = {
         // Highlight correct answer on the Check Answer page.
         background: props.showAnswer && (choice === props.correctAnswer)
            ? "#0f0" : "#fff"
      }

      return (
         <span
            key={`${props.id}-${idx}`}
            style={styles}
            className="form-quiz__span-choices"
         >
            <input
               type="radio"
               id={`${idx}-${props.id}`}
               name={`answer-${props.id}`}
               value={choice}
               checked={props.answer === choice}
               onChange={props.handleChange}
            />
            <label htmlFor={`${idx}-${props.id}`}>{choice}</label>
         </span>
      )
   });

   return (
      <fieldset className="form-quiz__fieldset">
         <p className="question">{props.question}</p>
         <div className="choices">{choices}</div>
      </fieldset>
   )
}
