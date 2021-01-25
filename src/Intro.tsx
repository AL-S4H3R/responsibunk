import React from 'react'

const Intro: React.FC = () => {
    return (
        <div className="bg-gray-800 h-screen w-screen">
            <section>
                <header>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap');
                </style>
                <nav className="bg-gray-900">
                    <h1 className="text-gray-200 font-bold text-center text-3xl p-3 tracking-wider" style={{fontFamily:"'Yusei Magic',sans-serif"}}>ResponsiBunk</h1>
                </nav>
                    <h2 className="text-center text-gray-300 text-3xl font-semibold mt-20 px-6 font-mono tracking-tight">
                        Online Classes are meant to be bunked.
                    </h2>
                    <h3 className="text-center text-gray-200 text-lg mt-4 px-6 font-mono">
                        Do it <strong className="uppercase">responsibly</strong>
                    </h3>
                </header>
            </section>
            <div className="mt-8">
                <div className="flex items-center justify-center m-4">
                    <a href="/dashboard" className="border-2 rounded-full text-2xl px-5 py-3 bg-gray-200 font-semibold">Try It</a>
                </div>
            </div>
            <footer className="flex justify-center items-end">
                <p className="text-md font-mono text-gray-50 font-bold">Created by - 4L_SAH3R</p>
            </footer>
        </div>
    )
}

export default Intro
