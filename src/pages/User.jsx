import { useState } from "react";
import Header from '../components/Header'
import Hero from '../components/Hero'
import Tutorial from '../components/Tutorial'
import Program from '../components/Program'
import Gallery from '../components/Gallery'
import Kontak from '../components/Kontak'
import Login from '../components/Login'
import Daftar from "../components/Daftar"
import Donasi from "../components/Donasi"

const User = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showDaftar, setShowDaftar] = useState(false);
  const [showDonasi, setShowDonasi] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div className='pt-[72px]'>
      <Header 
        onLogin={() => setShowLogin(true)}
        onDaftar={() => setShowDaftar(true)}
      />

      <Hero />
      <Tutorial />
      <Program
        onDonasi={(program) => {
          setSelectedProgram(program);
          setShowDonasi(true);
        }}
      />
      <Gallery />
      <Kontak />

      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <Daftar isOpen={showDaftar} onClose={() => setShowDaftar(false)} />
      <Donasi
        isOpen={showDonasi}
        program={selectedProgram}
        onClose={() => setShowDonasi(false)}
      />
    </div>
  )
}

export default User;
