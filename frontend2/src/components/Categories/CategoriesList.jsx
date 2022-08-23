import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosInstance } from '../../api/AxiosInstance';
import { getError } from '../../utils';
import './Categories.css';

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await AxiosInstance.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
      <div className="categoriesAPI">
        <div>{/* <strong>Categories</strong> */}</div>
        {categories.map((category) => (
          <div key={category}>
            <Link
              to={`/search?category=${category}`}
              // onClick={() => setSidebarIsOpen(false)}
              className="categoryflex"
            >
              <div className="categoryflex">{category}</div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
