'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PencilRuler, Eye, EyeOff, Phone, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login, loading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registered = searchParams.get('registered');

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(identity, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (user) {
    return null; // or a loading component
  }

  return (
    <div className="flex w-full min-h-screen flex-col lg:flex-row">
       <div className="hidden lg:flex lg:w-1/2 bg-[#2463eb] relative flex-col items-center justify-center overflow-hidden 4k:w-3/5">
         <div className="absolute top-[-5%] left-[-5%] w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[50rem] h-[50rem] bg-white/5 rounded-full blur-[120px]"></div>
        <div className="relative z-10 text-center px-12 2k:px-24 4k:px-48">
          <div className="mb-12 4k:mb-24">
            <div className="relative inline-block">
              <Image 
                alt="Math Education Illustration" 
                className="w-80 h-auto mx-auto rounded-3xl shadow-2xl transition-transform hover:scale-105 duration-500 2k:w-[32rem] 4k:w-[48rem]" 
                src="/images/hero-background.png"
                width={500}
                height={500}
              />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#2463eb] animate-bounce 2k:w-20 2k:h-20 4k:w-32 4k:h-32">
                <PencilRuler size={24} className="2k:scale-150 4k:scale-[2.5]" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6 2k:text-6xl 4k:text-8xl">Chào mừng bạn trở lại!</h1>
          <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed 2k:text-2xl 2k:max-w-2xl 4k:text-4xl 4k:max-w-4xl">
            Cùng chinh phục môn Toán mỗi ngày với các phương pháp học hiện đại và thú vị.
          </p>
        </div>
        <div className="absolute top-20 left-20 text-white/10 text-6xl font-bold 4k:text-[12rem]">∑</div>
        <div className="absolute bottom-20 left-1/4 text-white/10 text-6xl font-bold 4k:text-[10rem]">π</div>
        <div className="absolute top-1/2 right-12 text-white/10 text-5xl font-bold rotate-12 4k:text-[9rem]">√</div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 2k:p-24 4k:w-2/5 4k:p-48 bg-[#ffffff] overflow-y-auto">
        <div className="w-full max-w-md 2k:max-w-xl 4k:max-w-4xl">
          <div className="flex justify-center">
            <Logo className="mb-12 4k:mb-24" />
          </div>

          <div className="mb-10 4k:mb-20">
            <h2 className="text-3xl font-bold text-slate-800 2k:text-5xl 4k:text-7xl">Đăng nhập</h2>
            <p className="text-slate-500 mt-3 2k:text-xl 4k:text-3xl">Vui lòng nhập thông tin để truy cập bài học của bạn.</p>
          </div>

          <form className="space-y-6 2k:space-y-10 4k:space-y-16" onSubmit={handleSubmit}>
            {registered && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative flex items-center gap-2">
                <CheckCircle size={20} />
                <span>Đăng ký thành công! Vui lòng đăng nhập.</span>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 2k:text-lg 4k:text-2xl" htmlFor="identity">Email hoặc Số điện thoại</label>
              <Input 
                id="identity"
                placeholder="Nhập email hoặc số điện thoại"
                type="text"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                required
                startIcon={<Phone size={20} className="2k:scale-150 4k:scale-200" />}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700 2k:text-lg 4k:text-2xl" htmlFor="password">Mật khẩu</label>
                <Link href="/quen-mat-khau" className="text-sm font-medium text-[#2463eb] hover:underline 2k:text-lg 4k:text-2xl">Quên mật khẩu?</Link>
              </div>
              <Input 
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                startIcon={<KeyRound size={20} className="2k:scale-150 4k:scale-200" />}
                endElement={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600">
                    {showPassword ? <Eye size={20} className="2k:scale-150 4k:scale-200" /> : <EyeOff size={20} className="2k:scale-150 4k:scale-200" />}
                  </button>
                }
              />
            </div>
            
            <div className="flex justify-center">
              <Button type="submit" disabled={loading}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </div>
          </form>

          <div className="relative my-10 4k:my-20">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 2k:text-lg 4k:text-3xl">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div>
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 2k:w-8 2k:h-8 4k:w-12 4k:h-12" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-sm font-semibold text-slate-700 2k:text-xl 4k:text-3xl">Google</span>
            </Button>
          </div>

          <p className="text-center mt-12 text-slate-500 2k:text-xl 4k:text-3xl">
            Bạn chưa có tài khoản? 
            <Link href="/dang-ky" className="text-[#2463eb] font-bold hover:underline ml-1">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
