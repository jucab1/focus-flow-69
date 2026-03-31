import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ArrowUp, X } from 'lucide-react';

interface MessageBarProps {
  onSubmit: (text: string) => void;
}

const MessageBar = ({ onSubmit }: MessageBarProps) => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('');

  const handleFocus = () => setExpanded(true);
  const handleClose = () => { setExpanded(false); setText(''); };
  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
      setExpanded(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 mesh-gradient-bg"
            style={{ backdropFilter: 'blur(20px)' }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        layoutId="message-bar"
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
        className={`relative z-50 ${expanded ? 'fixed inset-0 flex items-center justify-center p-8' : ''}`}
      >
        <motion.div layout className={`w-full ${expanded ? 'max-w-xl' : 'max-w-2xl mx-auto'}`}>
          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.15 }}
                className="text-center text-muted-foreground font-heading font-medium text-base mb-5"
              >
                Where should we start?
              </motion.p>
            )}
          </AnimatePresence>

          <div className="p-[1.5px] rounded-[36px] gradient-outline">
            <div className="glass-card rounded-[34px] overflow-hidden" style={{ borderRadius: '34px' }}>
              <div className="flex items-center gap-3 px-5 py-4">
                <motion.div layout className="flex-1">
                  {expanded ? (
                    <textarea
                      autoFocus
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Dump everything here — I'll sort it out."
                      className="w-full bg-transparent resize-none outline-none text-[15px] text-foreground placeholder:text-muted-foreground min-h-[90px] leading-relaxed"
                    />
                  ) : (
                    <input
                      onFocus={handleFocus}
                      readOnly
                      placeholder="What's on your mind?"
                      className="w-full bg-transparent outline-none text-[15px] text-foreground placeholder:text-muted-foreground cursor-pointer"
                    />
                  )}
                </motion.div>
                {!expanded && (
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground">
                    <Mic className="w-4 h-4" />
                  </motion.button>
                )}
                {expanded && (
                  <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground self-start">
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-5 pb-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      className="bubbly-btn shimmer-btn w-full py-3.5 gradient-lavender text-primary-foreground flex items-center justify-center gap-2 text-[14px]"
                    >
                      <ArrowUp className="w-4 h-4" />
                      <span>Process</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MessageBar;
