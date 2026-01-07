'use client';

import { useTheme, ColorTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Monitor, Check } from 'lucide-react';

const colorThemes: { id: ColorTheme; label: string; color: string }[] = [
    { id: 'default', label: 'Varsayılan (Kırmızı)', color: '#C8102E' },
    { id: 'blue', label: 'Okyanus Mavisi', color: '#3b82f6' },
    { id: 'green', label: 'Orman Yeşili', color: '#22c55e' },
    { id: 'purple', label: 'Kraliyet Moru', color: '#a855f7' },
    { id: 'orange', label: 'Gün Batımı Turuncusu', color: '#f97316' },
];

export default function SettingsPage() {
    const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 font-serif text-neutral-900 dark:text-white">Ayarlar</h1>

            <div className="space-y-6">
                {/* Theme Preference */}
                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Görünüm</h2>

                    <div className="space-y-6">
                        {/* Mode Selection */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                                Tema Modu
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${theme === 'light'
                                            ? 'bg-neutral-50 border-black dark:border-white text-black dark:text-white ring-1 ring-black dark:ring-white'
                                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                        }`}
                                >
                                    <Sun size={20} />
                                    <span className="font-medium">Aydınlık</span>
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${theme === 'dark'
                                            ? 'bg-neutral-50 dark:bg-neutral-800 border-black dark:border-white text-black dark:text-white ring-1 ring-black dark:ring-white'
                                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                        }`}
                                >
                                    <Moon size={20} />
                                    <span className="font-medium">Karanlık</span>
                                </button>
                                <button
                                    onClick={() => setTheme('system')}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${theme === 'system'
                                            ? 'bg-neutral-50 dark:bg-neutral-800 border-black dark:border-white text-black dark:text-white ring-1 ring-black dark:ring-white'
                                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                        }`}
                                >
                                    <Monitor size={20} />
                                    <span className="font-medium">Sistem</span>
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

                        {/* Color Theme Selection */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                                Renk Teması
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {colorThemes.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setColorTheme(item.id)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${colorTheme === item.id
                                                ? 'border-black dark:border-white bg-neutral-50 dark:bg-neutral-800 ring-1 ring-black dark:ring-white'
                                                : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                            }`}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform"
                                            style={{ backgroundColor: item.color }}
                                        >
                                            {colorTheme === item.id && <Check size={16} className="text-white" />}
                                        </div>
                                        <span className="font-medium text-neutral-900 dark:text-white">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
