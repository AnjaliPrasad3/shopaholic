import React, { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from '../../helpers/helpers';
import { PRODUCT_CATEGORIES } from '../../constants/constants';

const Filters = () => {

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    //Handle Category & and Ratings filter
    const handleClick = (checkbox) => {
      const checkBoxes = document.getElementsByName(checkbox.name);

      checkBoxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
      });

      if(checkbox.checked === false) {
        // Delete filter from query
        if (searchParams.has(checkbox.name)) {
          searchParams.delete(checkbox.name);
          const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
        }
      }else {
        //Set new filter valuse if already there
        if (searchParams.has(checkbox.name)){
          searchParams.set(checkbox.name, checkbox.value);
        } else {
          // Append new filter
          searchParams.append(checkbox.name, checkbox.value);
        }

        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    };

    //Handle price filter
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    const handleButtonClick = (e) => {
        e.preventDefault()

        searchParams = getPriceQueryParams(searchParams, "min", min);
        searchParams = getPriceQueryParams(searchParams, "max", max);

        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);

    };

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        className="px-2"
        onSubmit={handleButtonClick}
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>
      {PRODUCT_CATEGORIES?.map((category) =>(
        <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="category"
          id="check4"
          value={category}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" for="check4">
        {" "}
        {category}
        </label>
      </div>
      ))}
      
      

      <hr />
      <h5 className="mb-3">Ratings</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value="5"
        />
        <label className="form-check-label" for="check7">
          <span className="star-rating">★ ★ ★ ★ ★</span>
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check8"
          value="4"
        />
        <label className="form-check-label" for="check8">
          <span className="star-rating">★ ★ ★ ★ ☆</span>
        </label>
      </div>
    </div>
  )
}

export default Filters
