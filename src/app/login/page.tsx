'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff, GraduationCap, ArrowRight } from 'lucide-react';
import MetuLoginModal from '@/components/auth/MetuLoginModal';

export default function LoginPage() {
  const router = useRouter();
  const [showMetuModal, setShowMetuModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.endsWith('@metu.edu.tr') && !email.endsWith('@student.metu.edu.tr')) {
      setError('Sadece @metu.edu.tr veya @student.metu.edu.tr uzantılı e-posta adresleri ile giriş yapılabilir.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Check if it's an email not confirmed error
        if (error.message.includes('Email not confirmed')) {
          setError('E-posta adresiniz doğrulanmamış. Lütfen gelen kutunuzdaki doğrulama linkine tıklayın.');
          // Optionally redirect to verify page
          setTimeout(() => router.push('/verify'), 3000);
          return;
        }
        throw error;
      }

      router.push('/');
      router.refresh();
    } catch (error: any) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] flex items-center justify-center px-4 py-12 transition-colors">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 p-8 transition-colors">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-serif mb-2 dark:text-white">Univo'ya Giriş</h1>
            <p className="text-neutral-600 dark:text-neutral-400">Etkinliklere katılmak için giriş yapın</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                E-posta <span className="text-xs font-normal text-neutral-500">(Sadece @metu.edu.tr)</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-neutral-800 dark:text-white transition-colors"
                placeholder="ornek@metu.edu.tr"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Şifre
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-neutral-800 dark:text-white transition-colors pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Recover Password Link */}
            <div className="text-right">
                <Link href="/forgot-password" className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300">
                    Şifremi Unuttum
                </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: 'var(--primary-color, #C8102E)' }}
              className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
            
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-neutral-900 text-neutral-500">veya</span>
                </div>
            </div>

            <button
               type="button" 
               onClick={() => setShowMetuModal(true)}
               className="w-full relative group overflow-hidden bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl shadow-md border-2 border-transparent hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <GraduationCap size={24} />
                </div>
                <span className="font-black uppercase tracking-wide">ODTÜ İle Hızlı Giriş</span>
            </button>

          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Hesabınız yok mu?{' '}
              <Link href="/register" style={{ color: 'var(--primary-color, #C8102E)' }} className="font-semibold hover:underline">
                Kayıt Olun
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link href="/" className="text-neutral-500 text-sm hover:text-neutral-700 dark:text-neutral-400">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
      
      <MetuLoginModal 
        isOpen={showMetuModal}
        onClose={() => setShowMetuModal(false)}
        onSuccess={(data) => {
            // Since we can't log them in directly without Service Role or stored password,
            // we redirect them to Register to "Refresh" or "Link" their account.
            // Or ideally, we should check if they exist.
            sessionStorage.setItem('odtu_temp_auth', JSON.stringify(data));
            router.push('/register');
        }}
      />
    </div>
  );
}
