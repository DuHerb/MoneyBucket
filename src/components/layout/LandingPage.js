import React, { useEffect }from 'react'
import { testBuckets, mainBucketFilter } from '../../functions/filterFuncs'

const LandingPage = () => {
  

  useEffect(() => {
    console.log('landing Page ', mainBucketFilter(testBuckets, 1000));
  })

  
  return (
    <div>
      this is the landing page.  intro and signup, login options go here.
    </div>
  )
}

export default LandingPage
