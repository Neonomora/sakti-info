'use server'

import { connectDB } from '@/lib/mongoose'
import AnnouncementUKM from '@/models/ukm/AnnouncementUKM'

// Ambil semua berita
export async function getNewsList() {
  await connectDB()
  const data = await AnnouncementUKM.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(data))
}

// Tambah berita
export async function createNews(formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  await connectDB()
  await AnnouncementUKM.create({ title, content })
}

// Update berita
export async function updateNews(id, formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  await connectDB()
  await AnnouncementUKM.findByIdAndUpdate(id, { title, content })
}

// Hapus berita
export async function deleteNews(id) {
  await connectDB()
  await AnnouncementUKM.findByIdAndDelete(id)
}
