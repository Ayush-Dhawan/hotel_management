import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from './Select'
import { useSearchParams } from 'react-router-dom';

export default function Sortby({options}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortby") || "";

    function handleChange(e){
        searchParams.set("sortby", e.target.value);
        setSearchParams(searchParams);
    }
  return (
    <div>
      <Select value={sortBy} options={options} onChange={handleChange} />
    </div>
  )
}


Sortby.propTypes = {
    options : PropTypes.object.isRequired
}
