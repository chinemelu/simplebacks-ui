import axiosInstance from '@/api/axios'

export const get = async (url) => {
  const response = await axiosInstance.get(url)
  return response
}

export const post = async (url, data) => {
  const response = await axiosInstance.post(url, data)
  return response
}

export const axiosDelete = async (url) => {
  const response = await axiosInstance.delete(url)
  return response
}
