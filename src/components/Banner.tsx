import React from 'react';

export default function Banner() {
  return (
    <div className="d-flex banner">
      <img src={require('../img/banner.jpg')} className="img-fluid img-header" alt="К весне готовы!"></img>
      <div className="banner-header">К весне готовы!</div>
    </div>
  );
}
