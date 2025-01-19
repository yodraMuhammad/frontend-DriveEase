import axios from 'axios'
import { createApp, h } from 'vue'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const showErrorModal = (message) => {
  const modalRoot = document.createElement('div')
  modalRoot.id = 'error-modal'
  document.body.appendChild(modalRoot)

  const ModalComponent = {
    render() {
      return h(
        'div',
        {
          class: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
        },
        [
          h(
            'div',
            {
              class: 'bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative',
            },
            [
              h(
                'h2',
                {
                  class: 'text-xl font-semibold mb-4',
                },
                'Error',
              ),
              h(
                'p',
                {
                  class: 'text-gray-700 mb-4',
                },
                message,
              ),
              h(
                'div',
                {
                  class: 'flex justify-end mt-4',
                },
                [
                  h(
                    'button',
                    {
                      class:
                        'bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300',
                      onClick: () => {
                        document.body.removeChild(modalRoot)
                      },
                    },
                    'Close',
                  ),
                ],
              ),
            ],
          ),
        ],
      )
    },
  }

  createApp(ModalComponent).mount(modalRoot)
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && window.location.pathname !== '/login') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      } else {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          'An error occurred. Please try again.'
        showErrorModal(errorMessage)
      }
    } else {
      showErrorModal('Unable to connect to the server.')
    }
    return Promise.reject(error)
  },
)

export default apiClient
