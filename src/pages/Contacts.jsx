import { useEffect, useContext } from 'react'
import { Pagination } from 'react-bootstrap'

import Contact from '../components/contacts/Contact'
import Loader from '../components/Loader'
import { ContactContext } from '../context/Contact.context'

const generateArr = (num) => {
  const arr = []
  for (let i = 1; i <= num; i++) {
    arr.push(i)
  }
  return arr
}

function Contacts() {
  const { contacts, loaded, pageNumber, pageCount, setPageNumber } =
    useContext(ContactContext)

  const pageCountArr = generateArr(pageCount)
  const isPageErrorOfBound = pageCount ? pageNumber > pageCount : false

  useEffect(() => {
    if (isPageErrorOfBound) {
      setPageNumber(pageNumber - 1)
    }
  }, [isPageErrorOfBound])

  const handlePageClick = (evt) => {
    setPageNumber(+evt.target.dataset.count)
    console.log(evt.target.dataset.count)
  }
  console.log(pageCountArr)
  return (
    <>
      <h2 className='text-center'>All Contacts</h2>
      {loaded ? (
        <>
          {contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
          <Pagination style={{ justifyContent: 'center' }}>
            {pageCountArr.map((count, index) => {
              return (
                <Pagination.Item
                  key={index}
                  active={count === pageNumber}
                  data-count={count}
                  onClick={handlePageClick}
                >
                  {count}
                </Pagination.Item>
              )
            })}
          </Pagination>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Contacts
