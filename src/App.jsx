import { useState, useEffect, useRef } from 'react'

export default function App() {
  const [step, setStep] = useState(0)
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

  return (
    <div className="min-h-screen bg-retro-bg p-4 md:p-8 flex items-center justify-center selection:bg-yellow-400 selection:text-black relative overflow-hidden">
      <div className="scanlines"></div>
      
      <audio ref={audioRef} loop>
        <source src="/bgm.mp3" type="audio/mpeg" />
      </audio>

      <button 
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 bg-black/50 border-2 border-gray-500 text-white font-pixel text-[10px] p-2 hover:bg-black/80 transition-all"
      >
        {isPlaying ? '🔊 BGM: ON' : '🔈 BGM: OFF'}
      </button>

      <div className="relative z-10 w-full max-w-7xl flex justify-center">
        {step === 0 && <StartScreen onStart={() => setStep(1)} />}
        {step === 1 && <DialogueScene onAccept={() => {
            setStep(2);
            if(!isPlaying) toggleAudio();
        }} />}
        {step === 2 && <DashboardScreen />}
      </div>
    </div>
  )
}

function StartScreen({ onStart }) {
  return (
    <div className="text-center cursor-pointer group mt-20" onClick={onStart}>
      <div className="text-6xl mb-6 animate-bounce">🎓</div>
      <h1 className="font-pixel text-4xl md:text-6xl text-white mb-10 drop-shadow-[6px_6px_0_rgba(0,0,0,1)] group-hover:scale-105 transition-transform leading-tight">
        GRADUATION<br/><span className="text-yellow-400">QUEST</span>
      </h1>
      <p className="font-pixel text-gray-400 animate-pulse text-xs md:text-sm">
        {"> PRESS START <"}
      </p>
    </div>
  )
}

function DialogueScene({ onAccept }) {
  const [text, setText] = useState('')
  const fullText = "Main Quest Unlocked! Misi pendampingan kelulusan Leo Agha Khusayra di Universitas Andalas telah tersedia. Apakah kamu siap menerima quest ini?"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) clearInterval(timer)
    }, 40)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full max-w-2xl bg-retro-panel border-4 border-gray-400 p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] mt-20">
      <h2 className="font-pixel text-yellow-400 text-xs md:text-sm mb-6 border-b-2 border-gray-500 pb-2 inline-block">
        Leo Agha Khusayra - Lvl. 99 Computer Engineer
      </h2>
      <p className="font-dialogue text-white text-2xl md:text-3xl leading-relaxed min-h-[140px]">
        {text}<span className="animate-pulse">_</span>
      </p>
      {text.length >= fullText.length && (
        <div className="mt-8 flex gap-4 font-pixel text-xs md:text-sm animate-fade-in">
          <button 
            onClick={onAccept}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-3 border-2 border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
          >
            ACCEPT QUEST
          </button>
        </div>
      )}
    </div>
  )
}

function DashboardScreen() {
  const [chatName, setChatName] = useState('')
  const [chatText, setChatText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isRSVP, setIsRSVP] = useState(false) // State baru untuk efek sukses ngirim pesan

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!chatName.trim() || !chatText.trim()) return

    setIsSending(true)

    // TODO: GANTI INI DENGAN ID FORMSPREE KAMU
    const formspreeUrl = 'https://formspree.io/f/xyeggbyn' 

    try {
      await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          nama_pengirim: chatName, 
          pesan_wisuda: chatText 
        })
      })

      // Pesan berhasil terkirim ke email, ubah form jadi UI sukses
      setIsRSVP(true)

    } catch (error) {
      alert('Koneksi terputus. Gagal mengirim pesan ke server.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="w-full animate-fade-in grid grid-cols-1 md:grid-cols-12 gap-6 pb-20">
      
      {/* ================= KOLOM KIRI (Karakter) ================= */}
      <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
        <div className="bg-retro-panel border-4 border-gray-400 p-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <h2 className="font-pixel text-yellow-400 text-[10px] mb-4">CHARACTER STATUS</h2>
          <div className="w-32 h-32 border-4 border-white mb-4 overflow-hidden bg-black mx-auto">
            <img src="/foto-agha.jpeg" alt="Agha" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-pixel text-white text-xs mb-2 text-center leading-relaxed">Leo Agha Khusayra, S.T.</h3>
          <p className="font-dialogue text-gray-300 text-lg text-center mb-4">Class: Fullstack / IoT Eng.</p>
          
          <div className="space-y-3 font-dialogue text-base text-white">
            <div>
              <div className="flex justify-between mb-1"><p>HP (Kewarasan)</p><p>100/100</p></div>
              <div className="w-full bg-black/50 border border-gray-500 h-3"><div className="bg-green-500 h-full w-full"></div></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><p>MP (Isi Dompet)</p><p>15/100</p></div>
              <div className="w-full bg-black/50 border border-gray-500 h-3"><div className="bg-yellow-400 h-full w-[15%] animate-pulse"></div></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><p>EXP (Skripsi)</p><p>MAX</p></div>
              <div className="w-full bg-black/50 border border-gray-500 h-3"><div className="bg-blue-400 h-full w-full"></div></div>
            </div>
          </div>
        </div>

        <div className="bg-retro-panel border-4 border-gray-400 p-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <h2 className="font-pixel text-yellow-400 text-[10px] mb-4">EQUIPPED SKILLS</h2>
          <div className="flex flex-wrap gap-2 font-dialogue text-base">
            {['Laravel', 'React', 'Vue', 'Node.js', 'Go', 'Raspberry Pi', 'ESP32', 'MySQL', 'Firebase', 'OpenCV', 'Tailwind'].map(skill => (
              <span key={skill} className="bg-black/40 border border-gray-500 px-2 py-1 text-white hover:border-yellow-400 hover:text-yellow-300 cursor-default transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================= KOLOM TENGAH (Quest & Projects) ================= */}
      <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
        <div className="bg-retro-panel border-4 border-gray-400 p-5 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <h2 className="font-pixel text-yellow-400 text-xs mb-4 border-b-2 border-gray-500 pb-2">CURRENT QUEST</h2>
          <div className="font-dialogue text-xl space-y-3">
            <p className="text-2xl mb-4 text-white">"Akhirnya lepas dari jeratan revisi! Dateng ya ke acara wisudaku buat ngerayain bareng."</p>
            <p className="text-gray-300">{">"} <span className="text-yellow-300">DATE:</span> 18 September 2026</p>
            <p className="text-gray-300">{">"} <span className="text-yellow-300">TIME:</span> 13:30 WIB</p>
            <p className="text-gray-300">{">"} <span className="text-yellow-300">LOC:</span> Fakultas Teknologi Informasi Univ. Andalas, Padang</p>
          </div>
        </div>

        <div className="bg-retro-panel border-4 border-gray-400 p-5 shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex-1 flex flex-col max-h-[450px]">
          <h2 className="font-pixel text-yellow-400 text-xs mb-4">CLEARED DUNGEONS (PROJECTS)</h2>
          <ul className="font-dialogue text-lg space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
            <li><span className="text-purple-300 font-bold">[S-Rank]</span> <span className="text-white">Indoor Air Quality Monitoring (Raspberry Pi, YOLO, Ads1115 & Decision Tree)</span> - <i className="text-gray-400">Skripsi Final Boss</i></li>
            <li><span className="text-blue-300 font-bold">[A-Rank]</span> <span className="text-white">Intern Admin Web App & Environmental Monitoring</span> - <i className="text-gray-400">PT Len Industri (Persero)</i></li>
            <li><span className="text-green-300 font-bold">[B-Rank]</span> <span className="text-white">Direction Chat</span> - <i className="text-gray-400">Realtime Socket.io, Node.js & React</i></li>
            <li><span className="text-green-300 font-bold">[B-Rank]</span> <span className="text-white">Cats & Coffee Memories</span> - <i className="text-gray-400">Interactive Polaroid Gallery (Laravel)</i></li>
            <li><span className="text-yellow-300 font-bold">[C-Rank]</span> <span className="text-white">SangSako</span> - <i className="text-gray-400">Minangkabau Historical Platform</i></li>
            <li><span className="text-yellow-300 font-bold">[C-Rank]</span> <span className="text-white">MedStock Pro</span> - <i className="text-gray-400">Clinic Inventory System</i></li>
            <li><span className="text-yellow-300 font-bold">[C-Rank]</span> <span className="text-white">Weather Monitoring Dashboard</span> - <i className="text-gray-400">Leaflet.js Interactive Maps</i></li>
            <li><span className="text-yellow-300 font-bold">[C-Rank]</span> <span className="text-white">Nagari Village Profile</span> - <i className="text-gray-400">Demographic & Public Services Portal</i></li>
            <li><span className="text-yellow-300 font-bold">[C-Rank]</span> <span className="text-white">Minangkabau Literature Dictionary</span> - <i className="text-gray-400">Laravel & MySQL</i></li>
            <li><span className="text-yellow-300 font-bold">[C-Rank]</span> <span className="text-white">Smartwatch IoT</span> - <i className="text-gray-400">Pulse, GPS & Sistem Notifikasi ke Seseorang</i></li>
            <li><span className="text-yellow-300 font-bold">[C-Rank]</span> <span className="text-white">DIY CNC Writing Plotter Machine</span> - <i className="text-gray-400">Hardware Blueprint</i></li>
            <li><span className="text-gray-400 font-bold">[D-Rank]</span> <span className="text-white">Indie Game Prototypes</span> - <i className="text-gray-400">Godot Engine & RPG Maker</i></li>
          </ul>
        </div>
      </div>

      {/* ================= KOLOM KANAN (Party & Guestbook) ================= */}
      <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
        
        {/* Panel 5: Party Members */}
        <div className="bg-retro-panel border-4 border-gray-400 p-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <h2 className="font-pixel text-yellow-400 text-[10px] mb-4">PARTY MEMBERS</h2>
          <div className="font-dialogue text-white text-lg space-y-3">
            <div className="bg-black/30 p-2 border border-gray-600">
              <p className="text-yellow-300 font-pixel text-[8px] mb-1">👑 Guild Masters:</p>
              <p>Kedua Orang Tua Tercinta</p>
            </div>
            <div className="bg-black/30 p-2 border border-gray-600">
              <p className="text-yellow-300 font-pixel text-[8px] mb-1">🛡️ AADR:</p>
              <p>Rekan-rekan AADR</p>
            </div>
            <div className="bg-black/30 p-2 border border-gray-600">
              <p className="text-yellow-300 font-pixel text-[8px] mb-1">🐾 Familiar / Support:</p>
              <p>Kucing peliharaan (Tukang zoomies pas nugas)</p>
            </div>
          </div>
        </div>

        {/* Panel 6: Leave Message */}
        <div className="bg-retro-panel border-4 border-gray-400 p-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex-1">
          <h2 className="font-pixel text-yellow-400 text-[10px] mb-4">LEAVE A MESSAGE</h2>
          
          {!isRSVP ? (
            <form onSubmit={handleSendMessage} className="flex flex-col gap-3 font-dialogue text-xl">
              <input 
                type="text" 
                placeholder="Nama kamu..." 
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                required 
                disabled={isSending}
                className="bg-black/50 border-2 border-gray-500 p-2 text-white outline-none focus:border-yellow-400 disabled:opacity-50" 
              />
              <textarea 
                rows="3"
                placeholder="Tulis ucapan / buff..." 
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                required 
                disabled={isSending}
                className="bg-black/50 border-2 border-gray-500 p-2 text-white outline-none focus:border-yellow-400 disabled:opacity-50 resize-none"
              ></textarea>
              <button 
                type="submit" 
                disabled={isSending}
                className="font-pixel text-[10px] mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 border-2 border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-50"
              >
                {isSending ? 'SENDING..' : 'SEND MESSAGE'}
              </button>
            </form>
          ) : (
            <div className="font-dialogue text-white text-xl text-center py-10 animate-pulse h-full flex flex-col justify-center">
              🎉 Buff diterima! 🎉<br/><br/>
              Pesan sudah masuk ke satelit (email). Sampai jumpa di lokasi!
            </div>
          )}
        </div>

      </div>

    </div>
  )
}