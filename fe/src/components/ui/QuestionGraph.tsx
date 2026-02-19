"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GraphData {
    x: number;
    y: number;
}

interface QuestionGraphProps {
    data: GraphData[];
}

const QuestionGraph: React.FC<QuestionGraphProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-slate-400 text-sm">Không có dữ liệu để vẽ đồ thị.</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="x" hide />
                <YAxis hide domain={['dataMin', 'dataMax']} />
                <Tooltip
                    contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="y" stroke="#2563EB" strokeWidth={3} dot={false} animationDuration={800} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default QuestionGraph;
