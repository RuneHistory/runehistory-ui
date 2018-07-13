import _ from 'lodash'

export const doAsync = (store, { promise, mutationTypes }) => {
  store.commit(mutationTypes.PENDING)
  promise.then((response) => {
    store.commit(mutationTypes.SUCCESS, response)
  })
  .catch((err) => {
    store.commit(mutationTypes.FAILURE, err)
  })
}

export const createMutation = type => ({
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
  PENDING: `${type}_PENDING`,
  loadingKey: _.camelCase(`${type}_PENDING`),
  stateKey: _.camelCase(`${type}_DATA`),
  errorKey: _.camelCase(`${type}_ERROR`),
})
