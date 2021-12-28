import React from "react";

const Header = ({course}) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part = {part} />
      )}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce( (s, p) => s + p.exercises, 0 )
  return (
    <b>
      Total of {total} exercises
    </b>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course = {course} />
      <Content parts = {course.parts}/>
      <Total parts={course.parts} />
    </>
  )
}

const GetCourselist = ({courses}) => {
  const courselist = courses.map((course) => <Course key={course.id} course={course} /> )
  return courselist
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <GetCourselist courses={courses} />
    </div>
  )
}

export default App
