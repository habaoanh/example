'use client';

import React, { useState, useEffect } from 'react';
import { ExamQuestion } from './types';
import { TakeExamHeader } from './components/TakeExamHeader';
import { TakeExamFooter } from './components/TakeExamFooter';
import { AiHint } from './components/AiHint';

// Question Type Components
import { QuestionContent } from './components/QuestionContent';
import { AnswerOption } from './components/AnswerOption';
import { ProblemStatement } from './components/free-response/ProblemStatement';
import { SolutionEditor } from './components/free-response/SolutionEditor';

// --- Mock Data ---
const MOCK_EXAM: ExamQuestion[] = [
  {
    id: 1,
    type: 'multiple-choice',
    topic: "Phương trình bậc hai",
    text: "Giải phương trình sau:",
    equation: "x² - 5x + 6 = 0",
    options: [
      { id: 'A', label: 'A', value: 'x = 2; x = 3' },
      { id: 'B', label: 'B', value: 'x = -2; x = -3' },
      { id: 'C', label: 'C', value: 'x = 1; x = 6' },
      { id: 'D', label: 'D', value: 'x = 5; x = 6' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 2,
    type: 'free-response',
    topic: "Tính độ dài đường cao trong tam giác",
    text: "Cho tam giác ABC vuông tại A có đường cao AH. Biết rằng độ dài cạnh AB = 6cm và AC = 8cm.",
    requirements: [
      'Tính độ dài cạnh huyền BC.',
      'Tính độ dài đường cao AH.',
      'Tính diện tích tam giác ABC.'
    ],
    diagram: true,
  },
];

export default function TakeExamPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({1: 'A'});
  const [xp, setXp] = useState(1250);
  const [timeLeft, setTimeLeft] = useState(900);
  const [showHint, setShowHint] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentQuestion = MOCK_EXAM[currentQuestionIndex];
  const totalQuestions = MOCK_EXAM.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (answer: string) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleConfirmHint = () => {
    setShowConfirm(false);
    setShowHint(true);
    setXp(prev => prev - 10);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowHint(false); // Hide hint when changing question
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowHint(false); // Hide hint when changing question
    }
  };

  const handleSubmit = () => {
    console.log('Submitting exam with answers:', userAnswers);
  };

  const renderQuestionContent = () => {
    const commonHintProps = {
      showConfirm,
      setShowConfirm,
      onConfirmHint: handleConfirmHint
    };

    if (currentQuestion.type === 'free-response') {
      return (
        <div className="flex flex-row gap-0 w-full">
          <div className="w-1/2">
            <ProblemStatement question={currentQuestion} {...commonHintProps} />
          </div>
          <div className="w-1/2">
            <SolutionEditor 
              solution={userAnswers[currentQuestion.id] || ''}
              setSolution={handleAnswerChange}
            />
          </div>
        </div>
      );
    }

    // Default to multiple-choice
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <QuestionContent question={currentQuestion} {...commonHintProps} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {currentQuestion.options?.map((option) => (
              <AnswerOption 
                key={option.id}
                option={option}
                isSelected={userAnswers[currentQuestion.id] === option.id}
                onClick={() => handleAnswerChange(option.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <TakeExamHeader 
        title="Kiểm tra Đại số - Chương 2"
        course="Toán Lớp 9"
        progress={currentQuestionIndex + 1}
        xp={xp}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />

      <main className="flex-grow w-full mx-auto px-6 sm:px-12 flex justify-center">
        <div className="flex flex-row items-start gap-0 w-full max-w-7xl">
          {/* Main content area */}
          <div className="flex-grow">
            {renderQuestionContent()}
          </div>
          
          {/* AI Hint sidebar */}
          {showHint && (
              <div className="w-96 flex-shrink-0 hidden lg:block">
                <AiHint onClose={() => setShowHint(false)} />
              </div>
          )}
        </div>
      </main>

      <TakeExamFooter 
        answeredCount={Object.keys(userAnswers).length}
        totalQuestions={totalQuestions}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
