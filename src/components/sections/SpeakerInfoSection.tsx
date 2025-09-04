import React from 'react';
import Image from 'next/image';
import MarkdownContent from '@/components/elements/MarkdownContent';
import { Lang } from '@/types/lang';

interface Speaker {
  name: string;
  avatar_url?: string;
  biography?: string;
}

interface SpeakerInfoCardProps {
  speaker: Speaker;
  lang: Lang;
  className?: string;
}

const SpeakerInfoSection: React.FC<SpeakerInfoCardProps> = ({ speaker, lang, className = '' }) => {
  const isJapanese = lang === 'ja';

  return (
    <div className={`bg-white rounded-lg border border-gray-300 px-6 py-6 md:px-12 md:py-8 ${className}`}>
      <div className="flex flex-col gap-6">
        {/* 上部：アバターと名前 */}
        <div className="flex items-center gap-6">
          {/* アバター */}
          <div className="flex-shrink-0">
            {speaker.avatar_url ? (
              <Image
                src={speaker.avatar_url}
                alt={speaker.name}
                width={120}
                height={120}
                className="object-cover w-[120px] h-[120px] rounded-lg"
              />
            ) : (
              <div className="w-[120px] h-[120px] bg-gray-200 flex items-center justify-center rounded-lg">
                <svg className="w-[60px] h-[60px] text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          {/* 名前 */}
          <h3 className="text-xl font-bold">{speaker.name}</h3>
        </div>

        {/* 下部：プロフィール */}
        <div>
          <p className="font-bold mb-4">
            {isJapanese ? 'プロフィール' : 'Profile'}
          </p>
          {speaker.biography && (
            <MarkdownContent 
              content={speaker.biography}
              className="text-gray-700 text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerInfoSection;