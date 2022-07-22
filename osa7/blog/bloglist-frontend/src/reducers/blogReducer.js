import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('actiondata', action)

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data

    case 'NEW_BLOG':
      return [...state, action.data]

    case 'REMOVE_BLOG':
      console.log('TÄMÄ MENOSSA')
      return state.filter((blog) => blog.id !== action.id)

    case 'ADD_LIKE':
      const thisBlog = action.data
      console.log(action.data)
      const likedBlog = state.find((blog) => blog.id === thisBlog.id)
      const updatedBlog = {
        ...likedBlog
      }
      return state.map((blog) => (blog.id !== thisBlog.id ? blog : updatedBlog))

    case 'COMMENT':
      const newBlog = action.data
      console.log(action.data)
      const commentedBlog = state.find((blog) => blog.id === newBlog.id)
      const u_blog = {
        ...commentedBlog
      }
      return state.map((blog) => (blog.id !== newBlog.id ? blog : u_blog))

    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createNew = (blog, user) => {
  return async (dispatch) => {
    let newBlog = await blogService.create(blog)
    newBlog = { ...newBlog, user: { name: user.name } }
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      id: id
    })
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog)
    dispatch({
      type: 'ADD_LIKE',
      data: blog
    })
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    var b = await blogService.addComment(id, comment)
    dispatch({
      type: 'COMMENT',
      data: b
    })
  }
}

export default blogReducer
