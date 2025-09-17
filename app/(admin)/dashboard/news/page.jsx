import NewsPage from './NewsPage'
import { getNewsList, createNews, updateNews, deleteNews } from './actions'

export default async function Page() {
  const newsList = await getNewsList()

  return (
    <NewsPage
      newsList={newsList}
      createNews={createNews}
      updateNews={updateNews}
      deleteNews={deleteNews}
    />
  )
}
