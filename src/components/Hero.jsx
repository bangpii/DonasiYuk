const Hero = () => {
  const scrollToProgram = () => {
    const el = document.getElementById("program");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

    return (
      <section id="beranda" className="relative w-full min-h-screen bg-[#2E7D32] overflow-hidden">
        
        {/* Background Image */}
        <img
          src="/hero.png"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
  
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2E7D32]/80"></div>
  
        {/* Content */}
        <div
          className="
            relative z-10 flex min-h-screen flex-col items-center justify-center
            text-center text-white mx-auto
            px-5 sm:px-8 md:px-10 lg:px-12
            max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl
          "
        >
  
  <h2
    className="
      font-black leading-tight
      text-3xl
      sm:text-4xl
      md:text-5xl
      lg:text-6xl
      xl:text-7xl
    "
  >
    Mulai Galang Kebaikan
  </h2>

  <p
    className="
      mt-4 sm:mt-5 md:mt-6
      text-sm
      sm:text-base
      md:text-lg
      lg:text-xl
      text-white/90
      max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl
    "
  >
    Wujudkan perubahan dengan menggalang dana untuk program sosial,
    bantuan bencana, pendidikan, kesehatan, dan berbagai kegiatan
    sosial lainnya.
  </p>

  <button
          onClick={scrollToProgram}
          className="
            mt-10 px-8 py-3
            bg-white text-[#2E7D32]
            font-semibold rounded-lg
            hover:bg-gray-100 transition
            active:scale-95 shadow-lg
          "
        >
          Donasi Sekarang
        </button>

</div>

      </section>
    )
  }
  
  export default Hero
  