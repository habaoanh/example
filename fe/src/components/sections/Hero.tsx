import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, PlayCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button'; // Import the upgraded Button component

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-24 lg:pb-32 4xl:pt-40 4xl:pb-56 bg-white">
      {/* Background blobs - responsive sizes */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] 4xl:w-[1200px] 4xl:h-[1200px] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] 4xl:w-[800px] 4xl:h-[800px] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-[1440px] 3xl:max-w-[1800px] 4xl:max-w-[2400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 4xl:gap-32 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 rounded-full text-[#2463eb] font-bold text-xs sm:text-sm 4xl:text-2xl mb-4 sm:mb-6 border border-blue-100">
              <Sparkles className="text-[#2463eb]" size={14} />
              <span className="4xl:ml-2">Giải pháp học Toán cho lớp 6-12</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 4xl:text-9xl font-extrabold text-slate-900 leading-tight mb-6 sm:mb-8 tracking-tight">
              Làm chủ môn Toán <br/>
              <span className="text-[#2463eb]">Tự tin bứt phá</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl 4xl:text-3xl text-slate-600 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Hệ thống học tập thông minh dựa trên AI giúp học sinh nắm vững kiến thức, luyện đề hiệu quả và cải thiện điểm số vượt trội chỉ sau 30 ngày.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button variant="default" size="lg" className="w-full sm:w-auto hover:-translate-y-1">
                  Học thử miễn phí
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <PlayCircle className="text-[#2463eb]" size={24} />
                  Xem giới thiệu
                </Button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 animate-float">
              <div className="relative aspect-[4/3] lg:aspect-auto rounded-[32px] sm:rounded-[40px] 4xl:rounded-[60px] overflow-hidden shadow-2xl shadow-blue-200/50 border-[8px] sm:border-[12px] 4xl:border-[20px] border-white">
                <Image 
                  src="/images/student-studying.jpg"
                  alt="Student Studying" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Decorative Floating Elements - Responsive positioning */}
            <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 bg-white p-3 sm:p-5 4xl:p-10 rounded-2xl sm:rounded-3xl shadow-xl animate-bounce" style={{animationDuration: '4s'}}>
              <span className="text-xl sm:text-3xl 4xl:text-6xl font-black text-[#2463eb] italic">π</span>
            </div>
            
            <div className="absolute top-1/2 -right-4 sm:-right-12 bg-white p-3 sm:p-5 4xl:p-10 rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-center">
              <span className="text-lg sm:text-2xl 4xl:text-5xl font-bold text-[#2463eb]">√x</span>
            </div>
            
            <div className="hidden sm:flex absolute -bottom-8 left-1/4 bg-white px-4 py-2 sm:px-6 sm:py-4 4xl:px-12 4xl:py-8 rounded-2xl sm:rounded-3xl shadow-xl items-center gap-3 border border-blue-50">
              <TrendingUp className="text-[#2463eb]" size={24} />
              <span className="font-bold text-slate-700 4xl:text-3xl">+15% điểm số</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
