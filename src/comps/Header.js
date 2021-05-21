import React from 'react';

const Header = () => {
  return (
    <div className="Header">
      <div className="Header-left">
        <a href="/">
        <img src="https://firebasestorage.googleapis.com/v0/b/magnus-gallery.appspot.com/o/Logo-must-valgel-taustal.png?alt=media&token=8cb6c0a6-98b0-4ddb-92c9-5586da3a7f5b" alt="logo"></img>
        </a>
        <h1>Gallery</h1>
        <h1>About me</h1>
      </div>
      <div className="Header-middle">
        <h2>Magnus Lutter</h2>
        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum ac lorem in tempus. In vitae eros auctor, mollis ligula vestibulum, mattis mauris. Pellentesque pretium est dolor, non ultrices leo sodales at. Curabitur a ante sit amet tortor interdum gravida. Proin ut convallis augue, ut laoreet libero. Donec eu diam luctus, placerat justo nec, porttitor velit. Aenean lacus dui, aliquam sit amet interdum nec, congue a elit.</p> */}
      </div>
    </div>
  )
}

export default Header;