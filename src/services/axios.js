import axiosInstance from '@/api/axios'

// export const get = async (url) => {
//   return axiosInstance.get(url)
// }

export const post = async (url, data) => {
  const response = await axiosInstance.post(url, data)
  return response
}

// export const patch = async (url, data) => {
//   return axiosInstance.patch(url, data)
// }
