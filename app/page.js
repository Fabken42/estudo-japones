'use client';

import { useState } from 'react';
import lyricsData from '../data/lyrics.json';

export default function Home() {
  const [selectedSong, setSelectedSong] = useState(lyricsData[0]);

  const parseLine = (line) => {
    const [japanese, portuguese] = line.split(' - ');
    return { japanese, portuguese };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-3">
            Estudo de Japonês através de Músicas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Aprenda japonês linha por linha com suas músicas favoritas
          </p>
        </header>

        {/* Seletor de Música */}
        <div className="mb-10">
          <label htmlFor="song-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selecione uma música:
          </label>
          <select
            id="song-select"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     transition-colors duration-200"
            value={selectedSong.id}
            onChange={(e) => {
              const songId = parseInt(e.target.value);
              const song = lyricsData.find(song => song.id === songId);
              setSelectedSong(song);
            }}
          >
            {lyricsData.map((song) => (
              <option key={song.id} value={song.id}>
                {song.title} - {song.artist}
              </option>
            ))}
          </select>
        </div>

        {/* Letra da Música */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-200">
          {/* Cabeçalho da música */}
          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedSong.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {selectedSong.artist}
            </p>
          </div>

          {/* Linhas da letra */}
          <div className="space-y-6">
            {selectedSong.lines.map((line, index) => {
              const { japanese, portuguese } = parseLine(line);
              return (
                <div 
                  key={index} 
                  className="pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <p className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                    {japanese}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-snug">
                    {portuguese}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Clique para alternar entre músicas e estudar japonês</p>
        </footer>
      </div>
    </div>
  );
}