import React from 'react';
import { NewsItem } from '../types';
import { X, Calendar, BookOpen } from 'lucide-react';

interface NewsModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up border-t-4 border-vallenato-blue">
        
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-gray-100 flex justify-between items-start">
            <div className="pr-8">
                <div className="flex items-center text-vallenato-red font-bold uppercase tracking-wider text-xs mb-2">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {item.source}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">
                    {item.title}
                </h2>
            </div>
            <button 
                onClick={onClose}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-500 flex-shrink-0"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
            <div className="flex items-center text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <Calendar className="w-4 h-4 mr-2 text-vallenato-mustard" />
                <span className="text-sm font-medium">{item.date}</span>
            </div>

            <div className="prose prose-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {item.content}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button 
                    onClick={onClose}
                    className="text-vallenato-blue font-bold hover:underline"
                >
                    Cerrar noticia
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;