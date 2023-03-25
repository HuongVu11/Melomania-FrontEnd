import {useState} from 'react'

const Form = (props) => {
  const [search, setSearch] = useState('')

  const onChangeText = (e) => {
   setSearch(e.target.value)
  }

  const getSearch = async (title) => {
    // make fetch request and store response
    const response = await fetch(
        `https://melomania-adh.herokuapp.com/search?title=${title}`
    );
    //console.log(response)
    // Parse JSON response into a javascript object
    const data = await response.json();
    //console.log(data)
    //set the Song state to the Song
     props.setSongs(data);
    //console.log(data)
  };


  const handleSearch = (e) => {
    e.preventDefault()
    getSearch(search)
  }
  
  const clearAll = () => {
    props.getSong()
  }

  return (
    <div className='searchFormCtn'>
      <form className="searchForm" onSubmit={handleSearch}>
        <input 
          onChange={onChangeText} 
          title='searchTitle'
          type='text'
          placeholder='Search by title'
          value={search} 
        />
        <input className="searchInput" type='submit' value='Search' />
      </form>
      <button className="clearBtn" onClick={clearAll}>Clear All</button>
    </div>
  )
}

export default Form