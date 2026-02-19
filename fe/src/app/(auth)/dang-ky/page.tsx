'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PencilRuler, Eye, EyeOff, User, KeyRound, Phone, AlertCircle } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const { register, loading, user } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    try {
      await register(fullName, identity, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (user) {
    return null; // or a loading component while redirecting
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
          <h1 className="text-4xl font-bold text-white mb-6 2k:text-6xl 4k:text-8xl">Bắt đầu hành trình của bạn</h1>
          <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed 2k:text-2xl 2k:max-w-2xl 4k:text-4xl 4k:max-w-4xl">
            Tạo tài khoản và mở khóa toàn bộ tiềm năng học tập, theo dõi tiến độ và đạt được mục tiêu.
          </p>
        </div>
        <div className="absolute top-20 left-20 text-white/10 text-6xl font-bold 4k:text-[12rem]">∫</div>
        <div className="absolute bottom-20 left-1/4 text-white/10 text-6xl font-bold 4k:text-[10rem]">∞</div>
        <div className="absolute top-1/2 right-12 text-white/10 text-5xl font-bold rotate-12 4k:text-[9rem]">α</div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 2k:p-24 4k:w-2/5 4k:p-48 bg-[#ffffff] overflow-y-auto">
        <div className="w-full max-w-md 2k:max-w-xl 4k:max-w-4xl">
          <div className="flex justify-center">
            <Logo className="mb-12 4k:mb-24" />
          </div>

          <div className="mb-10 4k:mb-20">
            <h2 className="text-3xl font-bold text-slate-800 2k:text-5xl 4k:text-7xl">Tạo tài khoản</h2>
            <p className="text-slate-500 mt-3 2k:text-xl 4k:text-3xl">Chỉ một vài bước để bắt đầu học ngay hôm nay.</p>
          </div>

          <form className="space-y-6 2k:space-y-10 4k:space-y-16" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 2k:text-lg 4k:text-2xl" htmlFor="fullName">Họ và tên</label>
              <Input
                id="fullName"
                placeholder="Nhập họ và tên của bạn"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                startIcon={<User size={20} className="2k:scale-150 4k:scale-200" />}
              />
            </div>
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
              <label className="block text-sm font-semibold text-slate-700 mb-2 2k:text-lg 4k:text-2xl" htmlFor="password">Mật khẩu</label>
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
               <p className="text-xs text-red-500 mt-2 2k:text-sm 4k:text-base">Tối thiểu 6 kí tự, bao gồm chữ hoa, chữ thường và kí tự đặc biệt.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 2k:text-lg 4k:text-2xl" htmlFor="confirm-password">Nhập lại mật khẩu</label>
              <Input
                id="confirm-password"
                placeholder="••••••••"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                startIcon={<KeyRound size={20} className="2k:scale-150 4k:scale-200" />}
                endElement={
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-slate-400 hover:text-slate-600">
                    {showConfirmPassword ? <Eye size={20} className="2k:scale-150 4k:scale-200" /> : <EyeOff size={20} className="2k:scale-150 4k:scale-200" />}
                  </button>
                }
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Tạo tài khoản'}
              </Button>
            </div>
          </form>

          <p className="text-center mt-12 text-slate-500 2k:text-xl 4k:text-3xl">
            Bạn đã có tài khoản? 
            <Link href="/dang-nhap" className="text-[#2463eb] font-bold hover:underline ml-1">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
