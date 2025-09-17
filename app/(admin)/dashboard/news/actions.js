'use server'

import { connectDB } from '@/lib/mongoose'
import News from '@/models/news/News'
import { revalidatePath } from 'next/cache'

// Ambil semua berita
export async function getNewsList() {
  await connectDB()
  const data = await News.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(data))
}

// Tambah berita
export async function createNews(formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  await connectDB()
  await News.create({ title, content })
  revalidatePath('/news') // agar halaman reload ulang
}

// Update berita
export async function updateNews(id, formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  await connectDB()
  await News.findByIdAndUpdate(id, { title, content })
  revalidatePath('/news')
}

// Hapus berita
export async function deleteNews(id) {
  await connectDB()
  await News.findByIdAndDelete(id)
  revalidatePath('/news')
}
