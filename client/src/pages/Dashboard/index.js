import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  return (
    <div className="wrapper">
    <ul className="spot-list">
    {spots.map(spot => (
      <li className="tile" key={spot._id} style={{ backgroundImage: `url(${spot.thumbnail})` }}>
        <div className="tile__info">
          <h3 className="tile__title"><strong>{spot.company}</strong></h3>
          <p className="tile__description">{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</p>
        </div>
        <a href="/new" className="tile__button">Read More +</a>
      </li>
    ))}
    </ul>

    <Link to="/new">
      <button className="btn">Cadastrar novo spot</button>
    </Link>
    </div>
  )
}
