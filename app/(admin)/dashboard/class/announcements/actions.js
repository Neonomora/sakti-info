'use server'

import { connectDB } from '@/lib/mongoose'
import AnnouncementClass from '@/models/class/AnnouncementClass'

// Ambil semua berita
export async function getNewsList() {
  await connectDB()
  const data = await AnnouncementClass.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(data))
}

// Tambah berita
export async function createNews(formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  await connectDB()
  await AnnouncementClass.create({ title, content })
}

// Update berita
export async function updateNews(id, formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  await connectDB()
  await AnnouncementClass.findByIdAndUpdate(id, { title, content })
}

// Hapus berita
export async function deleteNews(id) {
  await connectDB()
  await AnnouncementClass.findByIdAndDelete(id)
}
