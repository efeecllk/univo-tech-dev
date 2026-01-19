'use client';

import { useState } from 'react';
import { createPost } from '@/app/actions/community-chat';
import { Loader2, Send, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface PostComposerProps {
    communityId: string;
    onPostCreated?: () => void;
    isAnnouncement?: boolean;
}

export default function PostComposer({ communityId, onPostCreated, isAnnouncement = false }: PostComposerProps) {
    const [content, setContent] = useState('');
    const [mediaUrl, setMediaUrl] = useState(''); // Placeholder for future media implementation
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            await createPost(communityId, content, mediaUrl || undefined, isAnnouncement);
            setContent('');
            setMediaUrl('');
            toast.success(isAnnouncement ? 'Duyuru paylaşıldı' : 'Gönderi paylaşıldı');
            if (onPostCreated) onPostCreated();
        } catch (error) {
            console.error(error);
            toast.error('Paylaşım yapılırken bir hata oluştu');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 mb-6 shadow-sm">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={isAnnouncement ? "Bir duyuru paylaş..." : "Toplulukla bir şeyler paylaş..."}
                        className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[80px] text-neutral-800 dark:text-neutral-200 placeholder-neutral-400"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800 pt-3">
                    <button
                        type="button"
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        title="Resim ekle (Yakında)"
                        disabled
                    >
                        <ImageIcon size={20} />
                    </button>

                    <button
                        type="submit"
                        disabled={!content.trim() || isSubmitting}
                        className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Paylaşılıyor...
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                Paylaş
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
