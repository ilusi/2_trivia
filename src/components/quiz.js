import './Form.css'

export default function Quiz(props) {
   const choices = props.choices.map((choice, idx) => {
      let bgColor = ''

      // Styling - Highlight in/correct answer on the Quiz/Check Answer page.
      if (props.showAnswer) {
         if (choice === props.answer) {
            bgColor = '#94D7A2' // green
         } else if (choice === props.correctAnswer) {
            bgColor = '#F8BCBC' // pink
         } else {
            bgColor = '#fff'
         }
      } else if (choice === props.answer) {
         bgColor = '#D6DBF5' // purple
      }

      const styles = { backgroundColor: bgColor }

      return (
         <li
            key={`${props.id}-${idx}`}
            style={styles}
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
         </li>
      )
   });

   return (
      <fieldset className="form__fieldset">
         <p className="form__paragraph">{props.question}</p>
         <ul className="form__list">{choices}</ul>
      </fieldset>
   )
}
