import React from 'react';
import Navbar from './components/nav/navbar'
import Hero from './components/hero/hero';
import Skills from './components/skill/skill';
import Projects from './components/project/project';
import Profiles from './components/proflie/onlineProfile';
import Contact from './components/contact/contact';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Profiles />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
