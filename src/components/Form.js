import Quiz from "./Quiz"

export default function Form(props) {
   const quiz = props.data.map(item => {
      return (
         <Quiz
            key={item.id}
            id={item.id}
            handleChange={props.handleChange}
            question={item.question}
            answer={item.answer}
            choices={item.choices}
            correctAnswer={item.correct_answer}
            showAnswer={props.showAnswer}
         />
      )
   });

   return (
      <form onSubmit={props.handleSubmit}>
         {quiz}
         {
            props.showAnswer
            && <p>You scored {props.score}/{props.data.length} correct answers</p>
         }
         {
            (props.formError[0] < 0)
            && <p>Please answer all of the questions before submitting</p>
         }
         <button>{props.capitalize(props.btnState)}</button>
      </form >
   )
}
