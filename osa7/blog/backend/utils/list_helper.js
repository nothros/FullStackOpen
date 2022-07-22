// eslint-disable-next-line no-unused-vars

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce( ( sum , cur ) => sum + cur.likes , 0)

}


const favoriteBlog = (blogs) => {
  return blogs
    .reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const authorBlogs = authors
    .map(author => ({
      author: author,
      blogs: (blogs
        .filter(x => x.author === author).length)
    }))
  const counts = (authorBlogs.map(author => author.blogs))
  const maxBlogs = counts.reduce((res, current) => res < current ? current : res)
  const maxAuthor = authorBlogs.find(author => author.blogs === maxBlogs)
  return maxAuthor
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const authorMostLikes = authors
    .map(author => ({
      author: author,
      likes: blogs
        .reduce((res, current) => current.author === author ? res + current.likes : res, 0)
    }))
  return authorMostLikes.reduce((res, cur) => cur.likes > res.likes ? cur : res, { likes: 0 })
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}