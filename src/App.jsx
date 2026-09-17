import { useState, useEffect, useRef } from 'react'

function Y2KWindow({ title, children, icon = "🌸" }) {
  return (
    <div className="bg-[#c0c0c0] text-black border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black shadow-[4px_4px_10px_rgba(0,0,0,0.5)] w-full mb-6 flex flex-col">
      <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div className="flex gap-1">
          <button className="bg-[#c0c0c0] text-black border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black w-5 h-5 flex items-center justify-center text-xs font-bold active:border-t-black active:border-l-black active:border-b-white active:border-r-white">_</button>
          <button className="bg-[#c0c0c0] text-black border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black w-5 h-5 flex items-center justify-center text-xs font-bold active:border-t-black active:border-l-black active:border-b-white active:border-r-white">X</button>
        </div>
      </div>
      <div className="p-4 flex-1">
        {children}
      </div>
    </div>
  )
}

export default function App() {
  const [isEntered, setIsEntered] = useState(false)
  const [nama, setNama] = useState('')
  const [pesan, setPesan] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [hitCount, setHitCount] = useState(0)

  const [isBsod, setIsBsod] = useState(false)
  const [isCyberTheme, setIsCyberTheme] = useState(false) 

  // --- FITUR AUDIO WINAMP ---
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Fungsi khusus untuk tombol Enter Site agar otomatis play musik
  const handleEnterSite = () => {
    setIsEntered(true)
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(err => {
        console.log("Autoplay diblokir oleh browser:", err)
      })
    }
  }

  useEffect(() => {
    setHitCount(Math.floor(Math.random() * 500) + 12000)
  }, [])

 const handleKirimPesan = async (e) => {
    e.preventDefault()
    if (!nama.trim() || !pesan.trim()) return

    // Tulis URL Endpoint Formspree milik Melisa di dalam tanda kutip ini:
    const formspreeUrl = 'https://formspree.io/f/xyezgqdk' 

    try {
      // Mengirim data ke Formspree
      await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          nama_pengirim: nama, 
          ucapan: pesan 
        })
      })
      // Jika berhasil, ubah tampilan form menjadi "Pesan terkirim!"
      setIsSent(true)
    } catch (error) {
      alert('Waduh, koneksi error. Pesan gagal dikirim!')
    }
  }

  const bgStyle = isCyberTheme 
    ? { background: 'radial-gradient(circle at top right, #111111, #000000, #003300)' }
    : { background: 'radial-gradient(circle at top right, #ff66c4, #ffffff, #00ffff)' };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/graduation.mp3" type="audio/mpeg" />
      </audio>

      {isBsod ? (
        // --- LAYAR BLUE SCREEN OF DEATH (BSOD) ---
        <div className="min-h-screen bg-[#0000aa] text-white font-display p-8 flex flex-col items-center justify-center text-center cursor-default z-50">
          <div className="bg-gray-300 text-[#0000aa] px-4 py-1 font-bold mb-8">Windows</div>
          <p className="mb-4 text-xl">A fatal exception 0E has occurred at 0028:C0011E36.</p>
          <p className="mb-8 text-xl">System overload: MELISA IS TOO AWESOME FOR THIS BROWSER.</p>
          <p className="mb-4">* Press any key to terminate the current application.</p>
          <button 
            onClick={() => setIsBsod(false)} 
            className="text-white hover:text-yellow-400 animate-pulse mt-10 text-lg border border-dashed border-white p-4"
          >
            [ CLICK HERE TO RETURN TO PARTY ]
          </button>
        </div>
      ) : !isEntered ? (
        // --- LAYAR WELCOME ---
        <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500" style={bgStyle}>
          <div className="text-center animate-float">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 drop-shadow-[4px_4px_0_white] mb-4 font-display">
              welcome.exe
            </h1>
            <p className="text-xl text-pink-600 font-bold mb-8 bg-white/70 inline-block px-4 py-1 rounded-full border-2 border-cyan-400">
              ☆⋆｡𖦹°‧★ Melisa's Graduation ★‧°𖦹｡⋆☆
            </p>
            <br/>
            <button 
              onClick={handleEnterSite}
              className="bg-gradient-to-r from-pink-400 to-cyan-400 text-white font-bold text-xl px-8 py-4 border-4 border-white shadow-[6px_6px_0_#ff007f] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#ff007f] transition-all rounded-full"
            >
              ENTER SITE 💿
            </button>
          </div>
        </div>
      ) : (
        // --- HALAMAN UTAMA ---
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center pb-32 transition-colors duration-500" style={bgStyle}>
          
          <div className="w-full max-w-5xl bg-black text-pink-400 font-bold border-2 border-cyan-400 p-2 mb-2 shadow-[0_0_10px_#00ffff]">
            <marquee scrollamount="8">
              ✨💕 CONGRATULATIONS ON YOUR GRADUATION, MELISA AFRILIA, S.Ak! WELCOME TO THE REAL WORLD! 💕✨
            </marquee>
          </div>

          <div className="mb-8 text-center mt-4">
            <h1 className="text-6xl md:text-8xl wordart-text">
              GRADUATION
            </h1>
            <p className="text-xl font-bold bg-white/70 px-4 py-1 inline-block border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] mt-4">
              ★ Melisa Afrilia, S.Ak ★
            </p>
          </div>

          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* KOLOM KIRI */}
            <div className="col-span-1 md:col-span-5 flex flex-col">
              <Y2KWindow title="profile.exe" icon="🦋">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-pink-300 to-cyan-300 border-4 border-white shadow-lg p-1 mb-4 transform -rotate-3 hover:rotate-0 transition-transform">
                    <img src="/melisa.jpeg" alt="Melisa" className="w-full h-full object-cover border-2 border-gray-400" />
                  </div>
                  <h2 className="text-2xl font-black text-pink-600 drop-shadow-[1px_1px_0_white] text-center mb-4">
                    Melisa Afrilia
                  </h2>
                  <div className="w-full text-sm space-y-2 bg-white p-3 border-t-2 border-l-2 border-gray-500 border-b-2 border-r-2 border-gray-100">
                    <p><strong>Title:</strong> Sarjana Akuntansi (S.Ak)</p>
                    <p><strong>Status:</strong> Officially Graduated!</p>
                  </div>
                </div>
              </Y2KWindow>

              {/* Winamp Player */}
              <Y2KWindow title="winamp_player.exe" icon="🎵">
                <div className="bg-[#111] text-cyan-400 p-3 font-mono text-xs border-2 border-gray-600">
                  <div className="flex justify-between mb-2">
                    <p>{isPlaying ? '▶ Playing:' : '⏸ Paused:'} graduation.mp3</p>
                    <p>03:24</p>
                  </div>
                  <div className="w-full bg-gray-800 h-3 mb-4 border border-gray-600">
                    <div className={`bg-gradient-to-r from-pink-500 to-cyan-500 h-full ${isPlaying ? 'w-full animate-pulse' : 'w-1/2'}`}></div>
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    <button className="bg-[#c0c0c0] text-black px-3 py-1 font-bold border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                      ⏮
                    </button>
                    <button 
                      onClick={toggleAudio}
                      className="bg-[#c0c0c0] text-black px-6 py-1 font-bold border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                    >
                      {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                    </button>
                    <button className="bg-[#c0c0c0] text-black px-3 py-1 font-bold border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                      ⏭
                    </button>
                  </div>
                </div>
              </Y2KWindow>

              {/* Galeri Polaroid (Sudah pakai img asli) */}
              <Y2KWindow title="photo_gallery.zip" icon="📸">
                <div className="grid grid-cols-2 gap-4 p-2 bg-pink-50">
                  
                  {/* Polaroid 1 */}
                  <div className="bg-white p-2 border border-gray-300 shadow-md transform rotate-2 hover:scale-110 transition-transform">
                    <div className="aspect-square mb-2 overflow-hidden border border-gray-200">
                      <img src="/duduk.jpeg" alt="Polaroid 1" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center font-display text-[10px] font-bold text-gray-600">Proud by MySelf</p>
                  </div>

                  {/* Polaroid 2 */}
                  <div className="bg-white p-2 border border-gray-300 shadow-md transform -rotate-3 hover:scale-110 transition-transform">
                    <div className="aspect-square mb-2 overflow-hidden border border-gray-200">
                      <img src="/kecil.jpeg" alt="Polaroid 2" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center font-display text-[10px] font-bold text-gray-600">Chilhood</p>
                  </div>

                </div>
              </Y2KWindow>
            </div>

            {/* KOLOM KANAN */}
            <div className="col-span-1 md:col-span-7 flex flex-col">
              <Y2KWindow title="invitation.txt" icon="💌">
                <div className="bg-white p-4 border-2 border-dashed border-pink-400 text-center">
                  <h3 className="text-xl font-bold text-cyan-600 mb-4 font-display">You're Invited!</h3>
                  <p className="mb-4 text-gray-700 text-sm">
                    Halo semua! Aku seneng banget akhirnya bisa lulus. Dateng ya ke acara wisudaku!
                  </p>
                  <div className="bg-pink-100 p-4 border border-pink-300 text-pink-800 font-bold text-left mx-auto max-w-sm shadow-sm mb-6 text-sm">
                    <p className="mb-1">📅 Date: 20 September 2026</p>
                    <p className="mb-1">⏰ Time: 13:00 WIB - Selesai</p>
                    <p>📍 Location: Rektorat/FEB Unand</p>
                  </div>
                </div>
              </Y2KWindow>

              <Y2KWindow title="guestbook.html" icon="📝">
                {!isSent ? (
                  <form onSubmit={handleKirimPesan} className="flex flex-col gap-3">
                    <input type="text" placeholder="Nama..." required value={nama} onChange={(e) => setNama(e.target.value)} className="p-2 text-sm border-t-2 border-l-2 border-gray-600 border-b-2 border-r-2 border-white outline-none" />
                    <textarea rows="3" placeholder="Pesan..." required value={pesan} onChange={(e) => setPesan(e.target.value)} className="p-2 text-sm border-t-2 border-l-2 border-gray-600 border-b-2 border-r-2 border-white outline-none resize-none"></textarea>
                    <button type="submit" className="bg-[#c0c0c0] text-black px-6 py-2 font-bold text-xs border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black ml-auto">
                      SIGN GUESTBOOK
                    </button>
                  </form>
                ) : (
                  <div className="text-center p-6 bg-cyan-100 font-bold text-cyan-800">💖 Pesan terkirim!</div>
                )}
                
                {/* 88x31 Badges */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center pt-4 border-t-2 border-dotted border-gray-400">
                  <div className="badge-88x31 text-pink-600 bg-pink-100">100%<br/>ANGEL</div>
                  <div className="badge-88x31 text-green-600 bg-black border-green-500">BEST VIEWED<br/>IN NETSCAPE</div>
                  <div className="badge-88x31 text-blue-800 bg-yellow-300">GUESTBOOK<br/>SIGNER</div>
                  <div className="badge-88x31 text-black bg-white">POWERED BY<br/>HTML</div>
                </div>
              </Y2KWindow>

              {/* Control Panel */}
              <Y2KWindow title="control_panel.exe" icon="⚙️">
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setIsCyberTheme(!isCyberTheme)}
                    className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-2 font-bold text-sm w-full"
                  >
                    {isCyberTheme ? '🎨 Revert to Pink Theme' : '🕶️ Apply Cyber/Hacker Skin'}
                  </button>
                  <button 
                    onClick={() => setIsBsod(true)}
                    className="bg-red-600 text-white border-t-2 border-l-2 border-red-300 border-b-2 border-r-2 border-red-900 p-2 font-bold text-sm w-full shadow-[2px_2px_0_0_#000]"
                  >
                    ☠️ DO NOT CLICK.exe
                  </button>
                </div>
              </Y2KWindow>

            </div>
          </div>

          {/* WATERMARK DEVELOPER */}
          <div className="mt-8 mb-4 text-center z-10">
            <p className="text-white font-mono text-xs tracking-widest drop-shadow-[2px_2px_0_#000] bg-black/50 px-4 py-2 inline-block border border-gray-500">
              &lt;/&gt; developed by <span className="text-cyan-400 font-bold">RAGL_DEV</span>
            </p>
          </div>

          {/* Hit Counter */}
          <div className="fixed bottom-4 left-4 flex flex-col items-start z-40">
            <p className="text-[10px] font-bold text-white bg-black px-1">VISITORS:</p>
            <div className="bg-black text-green-400 font-display font-bold text-xl px-2 py-1 border-2 border-gray-500">
              {hitCount}
            </div>
          </div>

          {/* Virtual Pet Tamagotchi */}
          <div className="fixed bottom-4 right-8 text-5xl animate-bounce cursor-pointer z-40 hover:scale-125 transition-transform" title="Feed me!">
            🐰
          </div>

        </div>
      )}
    </>
  )
}
