import React from "react"


const NoteForm = (props) => {
return(
    <div><h2>Create new</h2><form onSubmit={props.handleNewBlog}>
      <div>
        title:
        <input
          type="text"
          value={props.blogtitle}
          name="title"
          onChange={({ target }) => props.setBlogTitle(target.value)} />
      </div>
      <div>
        author:
        <input
          type="text"
          value={props.blogauthor}
          name="author"
          onChange={({ target }) => props.setBlogAuthor(target.value)} />
      </div>
      <div>
        url:
        <input
          type="text"
          value={props.blogurl}
          name="url"
          onChange={({ target }) => props.setBlogUrl(target.value)} />
      </div>

      <button type="submit">create</button>
    </form>  
    </div>
    )
}
export default NoteForm