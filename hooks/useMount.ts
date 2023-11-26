import React from 'react'
const useMount = (callback:()=>void) => {
  React.useEffect(callback,[])
}

export default useMount
