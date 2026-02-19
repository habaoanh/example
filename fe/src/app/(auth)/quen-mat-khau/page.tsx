'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      }

      setSuccess(data.message);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-md 2k:max-w-xl 4k:max-w-4xl">
        <Logo className="mb-12 4k:mb-24 mx-auto" />

        <div className="bg-white p-8 rounded-xl shadow-lg 2k:p-12 4k:p-16">
          <div className="mb-8 4k:mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-800 2k:text-5xl 4k:text-7xl">Quên mật khẩu?</h2>
            <p className="text-slate-500 mt-3 2k:text-xl 4k:text-3xl">Đừng lo, chúng tôi sẽ giúp bạn lấy lại tài khoản.</p>
          </div>

          <form className="space-y-6 2k:space-y-10 4k:space-y-16" onSubmit={handleSubmit}>
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <CheckCircle size={20} />
                <span>{success}</span>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 2k:text-lg 4k:text-2xl" htmlFor="email">Email</label>
              <Input 
                id="email"
                placeholder="Nhập email của bạn"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!!success} // Disable input after successful submission
                startIcon={<Mail size={20} className="2k:scale-150 4k:scale-200" />}
              />
            </div>
            
            <Button type="submit" disabled={loading || !!success}>
              {loading ? 'Đang gửi yêu cầu...' : 'Gửi liên kết đặt lại'}
            </Button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-500 2k:text-xl 4k:text-3xl">
          <Link href="/dang-nhap" className="text-[#2463eb] font-bold hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={18} />
            Quay lại trang Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
