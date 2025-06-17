const extractSettingsValues = (value, prefix = '!') => {
  return (value.split(prefix)[1] || '').split('&').map(a => {
    const [k, v] = a.split('=')
// Temp comment
    return {
      key: k,
      value: v
    }
  })
