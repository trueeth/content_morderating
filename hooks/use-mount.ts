import React from 'react'
const useMount = (callback: () => void) => {
  React.useEffect(callback, [callback])
}

export default useMount
