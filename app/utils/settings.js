const extractSettingsValues = (value, prefix = '!') => {
  return (value.split(prefix)[1] || '').split('&').map(a => {
    return {
      key: k,
      value: v
    }
  })
