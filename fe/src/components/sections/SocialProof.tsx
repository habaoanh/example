import React from 'react';

const SocialProof: React.FC = () => {
  const partners = ["STUDY-CO", "VIET-EDU", "MATH-PRO", "EDUTECH"];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <p className="text-slate-500 font-semibold mb-1 uppercase tracking-wider text-sm">Cộng đồng học tập lớn nhất</p>
            <h3 className="text-3xl font-extrabold text-slate-800 italic tracking-tight">
              Hơn <span className="text-[#2463eb]">100,000</span> học sinh tin dùng
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:opacity-100 transition-opacity duration-500">
            {partners.map((partner) => (
              <div key={partner} className="flex items-center gap-2 font-black text-2xl italic tracking-tighter text-slate-900 cursor-default">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
