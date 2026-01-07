'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, GraduationCap, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();
    const { signInWithMetu } = useAuth(); // Using the context method which calls /api/auth/metu
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!acceptedTerms) {
            setError('Devam etmek için aydınlatma metnini onaylamalısınız.');
            return;
        }

        setIsLoading(true);

        try {
            // Using the new context method which handles the API call
            const result = await signInWithMetu(username, password);

            if (result.success) {
                toast.success(`Hoş geldin, ${result.studentInfo?.fullName || 'Öğrenci'}!`);
                
                // The API now returns a redirectUrl (magic link). 
                // Context handles the router.push if needed, but usually we follow the link or just reload session.
                // If standard magic link flow:
                if (result.redirectUrl) {
                    window.location.href = result.redirectUrl;
                } else {
                    router.push('/');
                }
            } else {
                throw new Error(result.error || 'Giriş başarısız.');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-900 w-full max-w-lg border-2 border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Visual Side (Hidden on mobile) */}
                <div className="hidden md:flex flex-col items-center justify-center bg-[var(--primary-color)] text-white w-2/5 p-8 text-center relative overflow-hidden">
                     <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <GraduationCap size={32} className="text-white" />
                        </div>
                        <h3 className="font-bold font-serif text-xl mb-2">Univo</h3>
                        <p className="text-sm text-white/80">ODTÜ'nün dijital kalbine hoş geldiniz.</p>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                </div>

                {/* Form Side */}
                <div className="flex-1 p-8 md:p-10">
                    <div className="text-center md:text-left mb-8">
                        <h2 className="text-2xl font-bold font-serif text-neutral-900 dark:text-white">Giriş Yap</h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                            ODTÜ (Moodle) hesabınızla güvenli giriş.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 text-sm font-bold flex items-center gap-2 border border-red-200 dark:border-red-800 rounded-lg animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={16} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-500 mb-1.5 ml-1">Kullanıcı Adı (NetID)</label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        required
                                        placeholder="e123456"
                                        className="w-full p-3 pl-4 pr-32 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] focus:outline-none dark:text-white transition-all rounded-lg"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold pointer-events-none text-sm select-none">@metu.edu.tr</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-500 mb-1.5 ml-1">ODTÜ Class Şifresi</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        className="w-full p-3 pl-4 pr-12 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] focus:outline-none dark:text-white transition-all rounded-lg"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 p-3 border border-neutral-100 dark:border-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors select-none group mt-2">
                            <div 
                                className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${acceptedTerms ? 'border-transparent bg-[var(--primary-color)]' : 'border-neutral-300 dark:border-neutral-600 group-hover:border-neutral-400'}`}
                            >
                                {acceptedTerms && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <input 
                                type="checkbox" 
                                className="sr-only" 
                                checked={acceptedTerms} 
                                onChange={e => setAcceptedTerms(e.target.checked)} 
                            />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Şifremin <strong>Univo'da asla kaydedilmediğini</strong>, sadece ODTÜ sistemlerinde anlık doğrulama için kullanıldığını anlıyorum.
                            </span>
                        </label>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-[var(--primary-color)] text-white font-bold text-sm uppercase tracking-wide rounded-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-sm flex items-center justify-center gap-2 mt-4"
                            style={{ backgroundColor: 'var(--primary-color, #C8102E)' }}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Bağlanılıyor...
                                </>
                            ) : (
                                <>
                                    <span>Giriş Yap</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            
            <p className="fixed bottom-4 text-xs text-neutral-400 dark:text-neutral-600 text-center w-full">
                &copy; 2026 Univo. Öğrenciler tarafından geliştirilmiştir.
            </p>
        </div>
    );
}
