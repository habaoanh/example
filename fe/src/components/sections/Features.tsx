import React from 'react';
import { Brain, BookOpen, BarChart3 } from 'lucide-react';
import FeatureCard from '@/components/ui/FeatureCard'; // Import the new UI component

const Features: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 4xl:py-56 bg-white px-4 sm:px-6">
      <div className="max-w-[1440px] 3xl:max-w-[1800px] 4xl:max-w-[2400px] mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl 4xl:text-8xl font-extrabold text-slate-900 mb-4 sm:mb-6 tracking-tight">Phương pháp học tập hiệu quả</h2>
          <p className="text-base sm:text-xl 4xl:text-3xl text-slate-500 max-w-2xl 4xl:max-w-4xl mx-auto font-medium">
            Tối ưu hóa thời gian học tập với bộ công cụ hỗ trợ thông minh được thiết kế riêng cho học sinh trung học.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 4xl:gap-16">
          <FeatureCard 
            Icon={Brain}
            title="Quiz thông minh"
            description="Hệ thống câu hỏi trắc nghiệm tự động điều chỉnh độ khó dựa trên năng lực của bạn, giúp lấp đầy lỗ hổng kiến thức nhanh chóng."
            bgColor="bg-blue-50"
          />
          <FeatureCard 
            Icon={BookOpen}
            title="Lời giải chi tiết"
            description="Không chỉ có đáp án, mọi bài tập đều có hướng dẫn giải từng bước giúp bạn hiểu bản chất vấn đề và ghi nhớ lâu hơn."
            bgColor="bg-blue-50"
          />
          <FeatureCard 
            Icon={BarChart3}
            title="Thống kê tiến độ"
            description="Theo dõi sự tiến bộ hàng ngày qua các biểu đồ trực quan. Biết rõ điểm mạnh và phần kiến thức cần tập trung cải thiện."
            bgColor="bg-blue-50"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
