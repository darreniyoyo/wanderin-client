// src/pages/HomePage.js

function HomePage() {
    return (
      <div className="d-flex h-100 text-center text-white bg-dark">
      <link href="HomePage.css" rel="stylesheet"></link>

<div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">


  <main className="px-3">
    <h1>Welcome to Wanderin</h1>
    <p className="lead">Wanderin is your go to tool to organise all your Trips!</p>
    <p className="lead">Just add all the places you've been meaning to visit,</p>
    <p className="lead">then schedule trips to these places to finally make it happen!</p>
  </main>

  <footer className="mt-auto text-white-50">
    <p>Website by Darren Iyoyo - 2022</p>
  </footer>
</div>
      </div>
    );
  }
  
  export default HomePage;
  