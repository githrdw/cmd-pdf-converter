export const state = () => ({
  image: null,
  source: null,
  content: null
})
export const mutations = {
  setImage(state, value) { state.image = value },
  setSource(state, value) { state.source = value },
  setContent(state, value) { state.content = value }
}
