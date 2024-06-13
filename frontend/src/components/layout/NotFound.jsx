import React from 'react'

const NotFound = () => {
  return (
    <>
    <div class="row">
      <div class="d-flex justify-content-center page-not-found-wrapper">
        <img
          src="/images/404.svg"
          height="550"
          width="550"
          alt="404_not_found"
        />
      </div>
      <h5 class="text-center">
        Page Not Found. Go to <a href="/">Homepage</a>
      </h5>
    </div>
    </>
  )
}

export default NotFound