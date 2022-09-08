import React from 'react'
import { useContext, useState, useEffect } from 'react'
import qs from 'qs'

import { axiosPrivateInstance } from '../config/axios'
import { AuthContext } from '../context/Auth.Context'
import { formateContact } from '../utils/formatContact'
import Loader from '../components/Loader'

function Search({ searchInput }) {
  const { token } = useContext(AuthContext)
  //send API Request
  const [searchResults, setSearchResults] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (searchInput) {
      ;(async () => {
        await getResult()
      })()
    } else {
      setLoaded(true)
    }
  }, [searchInput])
  async function getResult() {
    const query = qs.stringify({
      filters: {
        $or: [
          {
            firstName: {
              $contains: searchInput,
            },
          },
          {
            lastName: {
              $contains: searchInput,
            },
          },
          {
            bio: {
              $contains: searchInput,
            },
          },
        ],
      },
    })
    try {
      const response = await axiosPrivateInstance(token).get(
        `/contacts?${query}`
      )
      const data = response.data.data.map((contact) => formateContact(contact))
      setLoaded(true)
      console.log(data)
      setSearchResults(data)
    } catch (err) {
      console.log(err)
      setLoaded(true)
    }
  }

  return (
    <>
      <h2>Searching for {searchInput}...</h2>
      {loaded ? (
        searchResults.length > 0 ? (
          searchResults.map((contact, idx) => (
            <h2 key={idx}>
              {contact.firstName}
              {contact.lastName}
            </h2>
          ))
        ) : (
          <p>No Result Found</p>
        )
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Search
