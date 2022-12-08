import { useState } from 'react'
import Select from 'react-select';
import { useMutation } from '@apollo/client'

import { EDIT_BORN_YEAR, ALL_PERSONS} from '../queries'


const EditAuthor = ({allAuthors}) => {

    const [option, setName] = useState('')
    const [setBornTo, setsetBorn] = useState('')

    const [editAuthor] = useMutation(EDIT_BORN_YEAR, {
        refetchQueries: [ 
          { query: ALL_PERSONS } 
        ]
      })

      const options = []
      allAuthors.forEach(author => options.push(
      {
        value: author.name,
        label: author.name
    }))

    const submit = async (event) => {
        event.preventDefault()
    
        
        const name = option.value
        editAuthor({ variables: { name, setBornTo } })
    
        setName('')
        setsetBorn('')
        
      }

    return (
        <div>
        <h2>authors</h2>


          <form onSubmit={submit}>
            <div>
              name
            <Select value={option} onChange={setName} options = {options} />
            </div>
            <div>
              born
              <input
                value={setBornTo}
                onChange={({ target }) => setsetBorn(parseInt(target.value))}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )

}

export default EditAuthor