import { BASE_URL } from '../../../BASE_URLS.js'

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    }

    const response = await fetch(
      // `https://vue-http-demo-24260-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`
      BASE_URL + `requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    )
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.')
      throw error
    }

    newRequest.id = responseData.name //pobranie id z firebase który tworzy automatycznie i zapisuje pod nazwą name
    newRequest.coachId = payload.coachId
    context.commit('addRequest', newRequest)
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token
    const response = await fetch(
      // `https://vue-http-demo-24260-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
      BASE_URL + `requests/${coachId}.json?auth=${token}`
    )

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests.')
      throw error
    }

    const requests = []

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request)
    }
    context.commit('setRequests', requests)
  }
}
