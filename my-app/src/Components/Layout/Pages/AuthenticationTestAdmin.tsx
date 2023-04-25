import React from 'react'
import { withAdminAuth } from '../../../HOC';

const AuthenticationTestAdmin = () => {
  return (
    <div>This page can only be accessed if the role of logged in user is ADMIN</div>
  )
}

export default withAdminAuth(AuthenticationTestAdmin);